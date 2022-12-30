import { PageContext } from "./types.ts";
export { render }

export const clientRouting = true
export const hydrationCanBeAborted = true

function render(pageContext: PageContext) {
  const app_el = document.getElementById('app');
  new pageContext.Page({
    target: app_el,
    hydrate: true,
    props: {
      pageProps: pageContext.pageProps
    }
  })
}