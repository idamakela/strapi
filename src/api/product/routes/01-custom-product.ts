export default {
  routes: [
    {
      method: "GET",
      path: "/products/custom/:category/:subcategory",
      handler: "product.doubleFilter",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/products/custom/:category",
      handler: "product.singleFilter",
      config: {
        auth: false,
      },
    },
  ],
};
