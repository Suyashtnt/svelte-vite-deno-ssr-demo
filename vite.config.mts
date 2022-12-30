/// <reference types="vite/client" />

import { defineConfig } from "npm:vite";
import { svelte } from "npm:@sveltejs/vite-plugin-svelte";
import { ssr } from 'npm:vite-plugin-ssr/plugin'

import "npm:svelte";
import "npm:vite-plugin-ssr";
import "npm:typescript"

import "npm:postcss";
import "npm:postcss-load-config";
import "npm:postcss-nested"
import "npm:cssnano"


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
      svelte({
        compilerOptions: {
          hydratable: true,
        },
      }),
      ssr({
        prerender: true,
      })
    ],
    server: {
      host: true
    }
  });
