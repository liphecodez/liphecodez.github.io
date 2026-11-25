import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import { projects } from "../src/data/projects.ts";

const origin = "https://liphecodez.github.io";
const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const pages = [
  { path: "/", title: "Luis Bernardo — Desenvolvimento de software" },
  ...projects.map((project) => ({
    path: `/projetos/${project.slug}/`,
    title: `${project.name} — Luis Bernardo`,
    description: project.intro,
  })),
];
const sitemap = await readFile("dist/sitemap.xml", "utf8");
for (const page of pages) {
  const html = await readFile(`dist${page.path}index.html`, "utf8");
  assert.match(html, /<html lang="pt-BR">/);
  assert(
    html.includes(`<title>${escapeHtml(page.title)}</title>`),
    `Título incorreto: ${page.path}`,
  );
  assert(
    html.includes(`rel="canonical" href="${origin}${page.path}"`),
    `Canonical incorreto: ${page.path}`,
  );
  assert(html.includes(`property="og:url" content="${origin}${page.path}"`));
  if (page.description) {
    for (const attribute of [
      'name="description"',
      'property="og:description"',
    ]) {
      const meta = html.match(
        new RegExp(`<meta\\s+${attribute}\\s+content="([^"]*)"`),
      );
      assert.equal(
        meta?.[1],
        escapeHtml(page.description),
        `Descrição incorreta: ${page.path}`,
      );
    }
  }
  const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)];
  assert(
    assets.some(([, asset]) => asset.endsWith(".js")),
    "Bundle JavaScript ausente",
  );
  assert(
    assets.some(([, asset]) => asset.endsWith(".css")),
    "CSS ausente",
  );
  for (const [, asset] of assets)
    assert((await stat(`dist${asset}`)).size > 0, `Asset vazio: ${asset}`);
  assert(sitemap.includes(`<loc>${origin}${page.path}</loc>`));
  console.log(`OK ${page.path}: página física, metadados, sitemap e assets`);
}

await access("dist/.nojekyll");
await access("dist/favicon.svg");
assert(
  (await readFile("dist/robots.txt", "utf8")).includes(`${origin}/sitemap.xml`),
);
assert(
  (await readFile("dist/404.html", "utf8")).includes(
    'name="robots" content="noindex"',
  ),
);

// A publicação deve conter somente o resultado público, nunca arquivos de trabalho.
for (const file of await readdir("dist", { recursive: true })) {
  const parts = file.split(/[\\/]/);
  assert(
    !parts.some((part) =>
      /^(?:\.git|\.env(?:\..*)?|node_modules|GUIA-ESTUDO\.md|AGENTS\.md)$/i.test(
        part,
      ),
    ),
    `Arquivo privado no build: ${file}`,
  );
}
assert.equal(
  new Set(projects.map((project) => project.slug)).size,
  projects.length,
  "Slugs duplicados",
);
for (const project of projects) {
  assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  // Uma URL só pode ser habilitada se a exportação real estiver presente no build.
  if (project.demo.url?.startsWith("/"))
    await access(`dist${project.demo.url}`);
  for (const media of project.media)
    if (media.src.startsWith("/")) await access(`dist${media.src}`);
}
console.log(
  "OK: estrutura compatível com Pages e ausência de arquivos privados conhecidos.",
);
