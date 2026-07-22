// Publica o interpretador Libra para WebAssembly e copia os artefatos para public/libra-wasm/.
// Requer: .NET 9 SDK + workload `wasm-tools` (dotnet workload install wasm-tools).
//
// Uso: node scripts/build-wasm.mjs   (executado automaticamente por `npm run build:wasm`)

import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { rmSync, mkdirSync, cpSync, existsSync } from 'node:fs';

const raizSite = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const csproj = resolve(raizSite, '..', 'libra-cs', 'src', 'Libra.Wasm', 'Libra.Wasm.csproj');
const publishDir = join(raizSite, '.wasm-publish');
const destino = join(raizSite, 'public', 'libra-wasm');

if (!existsSync(csproj)) {
  console.error(`[build-wasm] csproj não encontrado: ${csproj}`);
  process.exit(1);
}

console.log('[build-wasm] Publicando Libra.Wasm (Release, LibraWasm=true)…');
execFileSync(
  'dotnet',
  ['publish', csproj, '-c', 'Release', '-p:LibraWasm=true', '-o', publishDir, '--nologo'],
  { stdio: 'inherit', shell: process.platform === 'win32' },
);

const frameworkSrc = join(publishDir, 'wwwroot', '_framework');
if (!existsSync(frameworkSrc)) {
  console.error(`[build-wasm] _framework não encontrado em ${frameworkSrc}`);
  process.exit(1);
}

console.log(`[build-wasm] Copiando _framework para ${destino}…`);
rmSync(destino, { recursive: true, force: true });
mkdirSync(destino, { recursive: true });
cpSync(frameworkSrc, join(destino, '_framework'), { recursive: true });
rmSync(publishDir, { recursive: true, force: true });

console.log('[build-wasm] Concluído.');
