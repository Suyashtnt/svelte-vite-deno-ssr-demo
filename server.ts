import { Application, FlashServer, hasFlash } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { renderPage } from "vite-plugin-ssr";

const root = Deno.cwd();

const appOptions = hasFlash() ? { serverConstructor: FlashServer } : undefined;
const app = new Application(appOptions);

app.use( async (ctx, next ) => {
    const pageCtxInit = {
        urlOriginal: ctx.request.url.toString()
    }

    const pageCtx = await renderPage(pageCtxInit);
    if (pageCtx.httpResponse === null) return await next()
    const { body, statusCode, contentType } = pageCtx.httpResponse;


    ctx.response.status = statusCode;
    ctx.response.type = contentType;
    ctx.response.body = body;
})

app.use(async (ctx, next) => {
    const staticDir = `${root}/dist/client`;
    try {
        await ctx.send({ root: staticDir })
    } catch {
        await next();
    }
})

const port = 3000;
await app.listen({ port });