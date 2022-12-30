import { PageContext } from "./types.ts"
const base = import.meta.env.BASE_URL

interface EscapedString {
  _escaped: string
}

type TemplateVariable = string | EscapedString;

type TemplateWrapped = {
    _template: TemplateContent;
};
type TemplateContent = {
    templateStrings: TemplateStrings;
    templateVariables: TemplateVariable[];
};

function dangerouslySkipEscape(arg: unknown): EscapedString {
  return { _escaped: arg as string }
}

type TemplateStrings = TemplateStringsArray;

function escapeInject(
  templateStrings: TemplateStrings,
  ...templateVariables: (TemplateVariable)[]
): TemplateWrapped {
  return {
    _template: {
      templateStrings,
      templateVariables: templateVariables as TemplateVariable[]
    }
  }
}

export { render }
export { passToClient }

// See https://vite-plugin-ssr.com/data-fetching
const passToClient = ['pageProps', 'routeParams']

function render(pageContext: PageContext) {
  const app = pageContext.Page.render(pageContext)
  const appHtml = app.html
  const appCss = app.css.code
  const appHead = app.head

  // We are using Svelte's app.head variable rather than the Vite Plugin SSR
  // technique described here: https://vite-plugin-ssr.com/html-head This seems
  // easier for using data fetched from APIs and also allows us to input the
  // data using our custom MetaTags Svelte component.

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${base}logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${dangerouslySkipEscape(appHead)}
        <style>${appCss}</style>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`
}