import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { renderPage } from 'npm:vite-plugin-ssr';

const isProduction = Deno.env.get('DENO_ENV') === 'production';
const root = Deno.cwd();
const app = new Application();

if (isProduction) {
    app.use(async (ctx, next) => {
        const staticDir = `${root}/dist/client`;
        try {
            await ctx.send({ root: staticDir })
        } catch {
            await next();
        }
    })
} else {
    const { createServer } = await import('npm:vite@^4.0.3');
    const viteDevServer = await createServer({
        root,
        server: {
            middlewareMode: true,
        },
    });
    app.use(viteDevServer.middlewares);
}

const router = new Router();

router.get('*', async (ctx, next ) => {
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

app.use(router.routes());
app.use(router.allowedMethods());

const port = 3000;
console.log(`Listening on port ${port}`);
await app.listen({ port });