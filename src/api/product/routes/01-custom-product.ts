export default {
  routes: [
    {
      method: "GET",
      path: "/categories/:category/:subcategory/products",
      handler: "product.filterFind",
      config: {
        auth: false,
      },
    },
  ],
};
