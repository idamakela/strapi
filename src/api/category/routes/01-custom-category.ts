export default {
  routes: [
    {
      method: "GET",
      path: "/categories/subcategories",
      handler: "category.subFind",
      config: {
        auth: false,
      },
    },
  ],
};
