/**
 * category controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async subFind(ctx) {
      const entries = await strapi.entityService.findMany(
        "api::category.category",
        {
          populate: {
            products: {
              populate: "subcategories",
            },
          },
        }
      );

      if (!entries) {
        const status = (ctx.response.status = 404);
        const message = (ctx.response.message = "No entries found");
        return { status, message };
      }

      const data = entries.map((category) => {
        const uniqueSubcategoryTitles = new Set();

        return {
          title: category.title,
          subcategories: category.products
            .flatMap((product) => product.subcategories)
            .map(({ title }) => {
              if (!uniqueSubcategoryTitles.has(title)) {
                uniqueSubcategoryTitles.add(title);
                return { title };
              }
              return null
            })
            .filter(Boolean),
        };
      });

      if (!data || data.length === 0) {
        const status = (ctx.response.status = 500);
        const message = (ctx.response.message =
          "Failed to retrieve data from the server.");
        return { status, message };
      }

      return data;
    },
  })
);
