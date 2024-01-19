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
        return {
          category: category.title,
          subcategories: [
            ...new Set(
              category.products
                .flatMap((product) => product.subcategories)
                .map((subcategory) => subcategory.title)
            ),
          ],
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
