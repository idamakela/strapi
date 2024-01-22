/**
 * product controller
 */

import { factories } from "@strapi/strapi";
import { sanitize } from "@strapi/utils";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async singleFilter(ctx) {
      // context
      const contentType = strapi.contentType("api::product.product");
      const category = ctx.request.params.category;
      const page = ctx.request.query.page || 1;
      const pageSize = ctx.request.query.pageSize || 25;

      // find filtered products
      const products = await strapi.entityService.findMany(
        "api::product.product",
        {
          populate: "*",
          filters: {
            categories: {
              slug: { $eq: category },
            },
          },
        }
      );

      if (!products || products.length === 0) {
        return ctx.badRequest("Invalid params", {
          category: category,
        });
      }

      // transform data
      const transformedData = products.map((item) => {
        const { id, ...newImg } = item.img;

        return {
          id: item.id,
          attributes: {
            title: item.title,
            slug: item.slug,
            price: item.price,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            publishedAt: item.publishedAt,
            img: {
              data: {
                id: item.img.id,
                attributes: newImg,
              },
            },
          },
        };
      });

      // metadata
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;

      const paginatedProducts = transformedData.slice(startIndex, endIndex);

      const pageCount = Math.ceil(products.length / pageSize);

      const meta = {
        pagination: {
          page: page,
          pageSize: pageSize,
          pageCount: pageCount,
          total: products.length,
        },
      };

      // sanatize data
      const sanatizedProducts = await sanitize.contentAPI.output(
        paginatedProducts,
        contentType
      );

      return {
        data: sanatizedProducts,
        meta: meta,
      };
    },

    async doubleFilter(ctx) {
      // context
      const contentType = strapi.contentType("api::product.product");
      const category = ctx.request.params.category;
      const subcategory = ctx.request.params.subcategory;
      const page = ctx.request.query.page || 1;
      const pageSize = ctx.request.query.pageSize || 25;

      // find filtered products
      const products = await strapi.entityService.findMany(
        "api::product.product",
        {
          populate: "*",
          filters: {
            categories: {
              slug: { $eq: category },
            },
            subcategories: {
              slug: { $eq: subcategory },
            },
          },
        }
      );

      if (!products || products.length === 0) {
        return ctx.badRequest("Invalid params", {
          category: category,
          subcategory: subcategory,
        });
      }

      // transform data
      const transformedData = products.map((item) => {
        const { id, ...imgData } = item.img;

        return {
          id: item.id,
          attributes: {
            title: item.title,
            slug: item.slug,
            price: item.price,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            publishedAt: item.publishedAt,
            img: {
              data: {
                id: item.img.id,
                attributes: imgData,
              },
            },
          },
        };
      });

      // metadata
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;

      const paginatedProducts = transformedData.slice(startIndex, endIndex);

      const pageCount = Math.ceil(products.length / pageSize);

      const meta = {
        pagination: {
          page: page,
          pageSize: pageSize,
          pageCount: pageCount,
          total: products.length,
        },
      };

      // sanatize data
      const sanatizedProducts = await sanitize.contentAPI.output(
        paginatedProducts,
        contentType
      );

      return {
        data: sanatizedProducts,
        meta: meta,
      };
    },
  })
);
