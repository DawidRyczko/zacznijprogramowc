// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  base: ".",
  site: "https://zacznijprogramowac.net/",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    "/szybki-kurs-javascript-kupon-udemy": {
      status: 301,
      destination: "/tags/szybki-kurs-javascript",
    },
    "/szybki-kurs-javascript": {
      status: 301,
      destination: "/tags/szybki-kurs-javascript",
    },
    "/slowniczek-javascript": {
      status: 301,
      destination: "/tags/slowniczek-java-script",
    },
    "/angular-pytania": {
      status: 301,
      destination: "/tags/angular-pytania",
    },
    "/angular": {
      status: 301,
      destination: "/tags/angular",
    },
    "/kurs-java-8": {
      status: 301,
      destination: "/tags/kurs-java-8",
    },
    "/sprawny-programista": {
      status: 301,
      destination: "/tags/sprawny-programista",
    },
  },
});
