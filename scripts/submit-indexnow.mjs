import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://gutembergfonseca.com.br";
const INDEXNOW_KEY = "2d42b65c6e944ac8a9ad4a5dff3b2255";
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sitemap = await readFile(path.join(projectRoot, "public", "sitemap.xml"), "utf8");
const urlList = [...sitemap.matchAll(/<loc>(https:\/\/gutembergfonseca\.com\.br\/[^<]*)<\/loc>/g)]
  .map((match) => match[1])
  .filter((url) => !url.includes("/images/"));

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: "gutembergfonseca.com.br",
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList,
  }),
});

if (!response.ok && response.status !== 202) {
  throw new Error(`IndexNow respondeu ${response.status}: ${await response.text()}`);
}

console.log(`IndexNow notificado sobre ${urlList.length} URLs (${response.status}).`);
