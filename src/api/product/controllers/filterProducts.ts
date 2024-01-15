'use strict'

export default {
  async filterFind(ctx) {

    //get path info: /categories/:category/:subcategory/products
    const category = ctx.request.params.category;
    const subcategory = ctx.request.params.subcategory;

    //get products from filtering
    const products = await strapi.entityService.findMany(
      "api::product.product",
      {
        populate: "*",
        filters: {
          $and: [{ categories: category }, { subcategories: subcategory }],
        },
      }
    );

    // if (!products) {
    //   return ctx.response.status(404).message('no products found')
    // }

    //return products
    return products


    //SANATIZE
  },

} 