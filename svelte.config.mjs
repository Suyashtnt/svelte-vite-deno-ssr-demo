import preprocess from "svelte-preprocess";

export default {
  preprocess: preprocess({
    defaults: {
      script: "typescript",
      style: "postcss",
    },
    postcss: true
  }),
};
