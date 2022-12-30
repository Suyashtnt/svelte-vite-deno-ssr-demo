import { renderPage } from "vite-plugin-ssr";
import { contentType } from "https://deno.land/std@0.170.0/media_types/mod.ts"


const root = Deno.cwd();

const port = 3000;
Deno.serve(async (req) => {
    const staticDir = `${root}/dist/client`;
    const path = new URL(req.url).pathname;
    const file = `${staticDir}${path}`;

    try {
        const stat = await Deno.stat(file);
        if (stat.isDirectory) throw new Error("is directory");
        const size = stat.size
        const body = (await Deno.open(file)).readable;

        console.log("serving", path);
        const extension = path.split(".").pop();
        if(!extension) throw new Error("no extension")

        return new Response(body, {
            headers: {
                "Content-Length": size.toString(),
                "Content-Type": contentType(extension) || "application/octet-stream"
            }
        })
    } catch {
        console.log("rendering", req.url)
        const pageCtxInit = {
            urlOriginal: req.url
        }

        const pageCtx = await renderPage(pageCtxInit);
        if (pageCtx.httpResponse === null) return new Response("not found", { status: 404 });
        const { body, statusCode, contentType } = pageCtx.httpResponse;

        return new Response(body, {
            status: statusCode,
            headers: {
                "Content-Type": contentType,
            }
        })

    }
}, { port })