import { build, stop } from 'https://deno.land/x/esbuild@v0.16.12/mod.js'


await build({
    entryPoints: ['server.ts'],
    bundle: true,
    format: 'esm',
    banner: {
        js: `
import { createRequire } from 'https://deno.land/std@0.170.0/node/module.ts';
import path from 'https://deno.land/std@0.170.0/node/path.ts';
import { fileURLToPath } from 'https://deno.land/std@0.170.0/node/url.ts';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
`
    },
    platform: 'node',
    target: "node16",
    minify: true,
    outfile: 'main.js',
})

stop()