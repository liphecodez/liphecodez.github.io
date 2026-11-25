import { readFile, writeFile, mkdir } from "node:fs/promises";
import { projects } from "../src/data/projects.ts";

const origin = "https://liphecodez.github.io";
const template = await readFile("dist/index.html", "utf8");
const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

// Diretórios físicos permitem acesso direto e recarregamento no GitHub Pages.
for (const project of projects) {
  const path = `/projetos/${project.slug}/`;
  const title = escapeHtml(`${project.name} — Luis Bernardo`);
  const description = escapeHtml(project.intro);
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*/, `$1${description}`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*/, `$1${title}`)
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*/,
      `$1${description}`,
    )
    .replaceAll(`${origin}/`, `${origin}${path}`);
  await mkdir(`dist${path}`, { recursive: true });
  await writeFile(`dist${path}index.html`, html);
}
await writeFile(
  "dist/404.html",
  template
    .replace(
      /<title>.*?<\/title>/,
      "<title>Página não encontrada — Luis Bernardo</title>",
    )
    .replace("</head>", '<meta name="robots" content="noindex" /></head>'),
);
const paths = ["/", ...projects.map((project) => `/projetos/${project.slug}/`)];
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${origin}${path}</loc></url>`).join("")}</urlset>\n`,
);
console.log(`Páginas geradas: ${paths.length}, 404 e sitemap.`);
