// Carrega o interpretador da Libra compilado para WebAssembly (projeto libra-cs/src/Libra.Wasm)
// e expõe uma função simples para executar código no browser.
//
// Os artefatos (_framework/dotnet.js + .wasm) são gerados por `npm run build:wasm`
// e ficam em public/libra-wasm/, servidos estaticamente.

type LibraExports = {
  LibraInterop: {
    Executar: (codigo: string, stdin: string, modoEstrito: boolean) => string;
    Versao: () => string;
  };
};

/** Opções do motor da Libra expostas no playground. */
export type OpcoesLibra = {
  /** Tipagem estática mais rígida no parser/interpretador. Padrão: desligado. */
  modoEstrito: boolean;
};

export const OPCOES_PADRAO: OpcoesLibra = {
  modoEstrito: false,
};

let runtimePromise: Promise<LibraExports> | null = null;

function baseUrl(): string {
  // Respeita o base do Vite (ex.: '/' no domínio custom).
  return import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : import.meta.env.BASE_URL + '/';
}

/**
 * Inicializa o runtime .NET WASM uma única vez e devolve os exports gerenciados.
 * Chamadas subsequentes reaproveitam a mesma instância.
 */
export function carregarLibra(): Promise<LibraExports> {
  if (runtimePromise) return runtimePromise;

  runtimePromise = (async () => {
    // Importa por URL absoluta (com origin). Assim o Vite trata o módulo como externo
    // e não aplica a checagem de "arquivo em /public" que quebra o import em dev.
    const dotnetUrl = new URL(
      `${baseUrl()}libra-wasm/_framework/dotnet.js`,
      window.location.origin,
    ).href;
    const { dotnet } = await import(/* @vite-ignore */ dotnetUrl);

    const { getAssemblyExports, getConfig } = await dotnet.create();
    const config = getConfig();
    const exports = (await getAssemblyExports(
      config.mainAssemblyName,
    )) as LibraExports;

    return exports;
  })();

  return runtimePromise;
}

/**
 * Executa código Libra e devolve o texto do terminal
 * (saída do script + eventuais mensagens de erro).
 *
 * @param codigo Código-fonte Libra.
 * @param stdin  Conteúdo da "entrada padrão", consumido linha a linha por `entrada()`.
 * @param opcoes Opções do motor (ex.: modo estrito).
 */
export async function executarLibra(
  codigo: string,
  stdin: string,
  opcoes: OpcoesLibra = OPCOES_PADRAO,
): Promise<string> {
  const { LibraInterop } = await carregarLibra();
  return LibraInterop.Executar(codigo, stdin, opcoes.modoEstrito);
}
