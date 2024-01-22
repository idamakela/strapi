export default {
  routes: [
    {
      method: "GET",
      path: "/products/:category/:subcategory",
      handler: "product.doubleFilter",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/products/:category",
      handler: "product.singleFilter",
      config: {
        auth: false,
      },
    },
  ],
};
