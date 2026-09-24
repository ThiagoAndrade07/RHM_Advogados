import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
await mkdir(output, { recursive: true });
await cp(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true });
await cp(path.join(root, '.nojekyll'), path.join(output, '.nojekyll'));
await cp(path.join(root, 'acidentes-transito.html'), path.join(output, 'acidentes-transito.html'));
await cp(path.join(root, 'privacidade.html'), path.join(output, 'privacidade.html'));
let html = await readFile(path.join(root, 'index.html'), 'utf8');
const configuredUrl = process.env.SITE_URL?.trim();
if (configuredUrl) {
  const url = new URL(configuredUrl.endsWith('/') ? configuredUrl : `${configuredUrl}/`);
  if (!['https:', 'http:'].includes(url.protocol) || url.search || url.hash) throw new Error('SITE_URL deve ser uma URL HTTP(S) sem query ou fragmento.');
  const escaped = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  const imageUrl = escaped(new URL('assets/hero-equipe.png', url).href);
  html = html.replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]+(">)/g, `$1${imageUrl}$2`);
  html = html.replace('</head>', `<link rel="canonical" href="${escaped(url.href)}">\n<meta property="og:url" content="${escaped(url.href)}">\n</head>`);
}
await writeFile(path.join(output, 'index.html'), html);
console.log('Site estático gerado em dist/.');
