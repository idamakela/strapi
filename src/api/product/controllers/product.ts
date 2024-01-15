/**
 * product controller
 */

import { factories } from "@strapi/strapi";
import { sanitize } from "@strapi/utils";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async filterFind(ctx) {
      const contentType = strapi.contentType("api::product.product");
      const category = ctx.request.params.category;
      const subcategory = ctx.request.params.subcategory;

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

      if (!products) {
        return ctx.response.status(404).message("No products found");
      }

      const sanatizedProducts = sanitize.contentAPI.output(
        products,
        contentType
      );

      return sanatizedProducts;
    },
  })
);
