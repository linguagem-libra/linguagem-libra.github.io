import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap } from '@codemirror/view';
import { indentUnit } from '@codemirror/language';
import { indentWithTab } from '@codemirror/commands';
import { executarLibra } from '../lib/libra';
import { libra } from '../lib/libra-lang';
import { EXEMPLOS, type ExemploLibra } from '../lib/exemplos';

// Documentação da linguagem: https://linguagemlibra.site/documentacao
const DOCS_URL = '/documentacao';

const EXEMPLO_INICIAL = `// Documentação: https://linguagemlibra.site/documentacao
exibir("Olá, Mundo!")
`;

// ── Preferências de aparência (persistidas em localStorage) ──────────────────
type Tema = 'escuro' | 'claro';

type Config = {
  tema: Tema;
  fontSize: number;
  quebraLinha: boolean;
  numeroLinhas: boolean;
};

const CONFIG_PADRAO: Config = {
  tema: 'escuro',
  fontSize: 14.5,
  quebraLinha: true,
  numeroLinhas: true,
};

const CONFIG_KEY = 'libra-playground-config';

function carregarConfig(): Config {
  try {
    const bruto = localStorage.getItem(CONFIG_KEY);
    if (bruto) return { ...CONFIG_PADRAO, ...JSON.parse(bruto) };
  } catch {
    /* ignora localStorage indisponível/corrompido */
  }
  return CONFIG_PADRAO;
}

export function Playground() {
  const [codigo, setCodigo] = useState(EXEMPLO_INICIAL);
  const [stdin, setStdin] = useState('');
  const [saida, setSaida] = useState('');
  const [erro, setErro] = useState(false);
  const [duracaoMs, setDuracaoMs] = useState<number | null>(null);
  const [rodando, setRodando] = useState(false);
  const [carregando, setCarregando] = useState(false);

  // Opções do motor da Libra.
  const [modoEstrito, setModoEstrito] = useState(false);

  // Configurações de aparência do editor.
  const [config, setConfig] = useState<Config>(carregarConfig);
  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    } catch {
      /* ignora */
    }
  }, [config]);

  // Menus (exemplos / configurações).
  const [menu, setMenu] = useState<'exemplos' | 'config' | null>(null);
  const barraRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menu) return;
    function aoClicar(e: MouseEvent) {
      if (barraRef.current && !barraRef.current.contains(e.target as Node)) {
        setMenu(null);
      }
    }
    function aoTecla(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenu(null);
    }
    document.addEventListener('mousedown', aoClicar);
    document.addEventListener('keydown', aoTecla);
    return () => {
      document.removeEventListener('mousedown', aoClicar);
      document.removeEventListener('keydown', aoTecla);
    };
  }, [menu]);

  const rodar = useCallback(async () => {
    setRodando(true);
    setCarregando(true); // a 1ª execução baixa o runtime .NET WASM
    setErro(false);
    const inicio = performance.now();
    try {
      const resultado = await executarLibra(codigo, stdin, { modoEstrito });
      setSaida(resultado.length ? resultado : '(sem saída)');
      setDuracaoMs(performance.now() - inicio);
    } catch (e) {
      setErro(true);
      setSaida(
        'Falha ao carregar o interpretador da Libra.\n' +
          (e instanceof Error ? e.message : String(e)),
      );
      setDuracaoMs(null);
    } finally {
      setRodando(false);
      setCarregando(false);
    }
  }, [codigo, stdin, modoEstrito]);

  // Mantém uma referência estável ao `rodar` atual para o atalho de teclado
  // do editor (evita recriar as extensões do CodeMirror a cada tecla).
  const rodarRef = useRef(rodar);
  useEffect(() => {
    rodarRef.current = rodar;
  }, [rodar]);

  const limparSaida = useCallback(() => {
    setSaida('');
    setErro(false);
    setDuracaoMs(null);
  }, []);

  const carregarExemplo = useCallback((ex: ExemploLibra) => {
    setCodigo(ex.codigo);
    setStdin(ex.stdin ?? '');
    setSaida('');
    setErro(false);
    setDuracaoMs(null);
    setMenu(null);
  }, []);

  // Tema do editor derivado das preferências.
  const temaEditor = useMemo(
    () =>
      EditorView.theme({
        '&': { height: '100%', fontSize: `${config.fontSize}px` },
        '.cm-scroller': {
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
          lineHeight: '1.65',
        },
        '.cm-content': { padding: '14px 0' },
        '.cm-gutters': { paddingRight: '4px' },
        '&.cm-focused': { outline: 'none' },
      }),
    [config.fontSize],
  );

  const extensoes = useMemo(() => {
    const exts = [
      libra(),
      temaEditor,
      indentUnit.of('    '), // indentação padrão: 4 espaços
      // O ref só é lido ao acionar o atalho (fora do render); manter as
      // extensões estáveis evita reconstruir o editor a cada tecla.
      // eslint-disable-next-line react-hooks/refs
      keymap.of([
        indentWithTab,
        {
          key: 'Mod-Enter',
          preventDefault: true,
          run: () => {
            rodarRef.current();
            return true;
          },
        },
      ]),
    ];
    if (config.quebraLinha) exts.push(EditorView.lineWrapping);
    return exts;
  }, [temaEditor, config.quebraLinha]);

  const escuro = config.tema === 'escuro';
  const linhasCodigo = useMemo(() => codigo.split('\n').length, [codigo]);

  return (
    <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 md:py-8">
      {/* Cabeçalho + barra de ferramentas */}
      <header className="flex flex-col gap-4 mb-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold mb-0.5">Playground</h1>
            <p className="text-zinc-500 text-sm md:text-base">
              Teste a Libra direto no navegador — sem instalar nada.
            </p>
          </div>
          <button
            onClick={rodar}
            disabled={rodando}
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-emerald-500 text-white px-6 sm:px-8 py-3 rounded-2xl text-base font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {rodando ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                {carregando ? 'Carregando…' : 'Rodando…'}
              </>
            ) : (
              <>
                ▶ Rodar
                <kbd className="hidden sm:inline-block ml-1 text-[11px] font-semibold bg-white/20 px-1.5 py-0.5 rounded">
                  Ctrl↵
                </kbd>
              </>
            )}
          </button>
        </div>

        <div ref={barraRef} className="relative flex flex-wrap items-center gap-2">
          {/* Carregar exemplo */}
          <button
            onClick={() => setMenu(menu === 'exemplos' ? null : 'exemplos')}
            className="inline-flex items-center gap-2 bg-white border border-zinc-200 text-zinc-700 px-4 py-2 rounded-xl text-sm font-semibold hover:border-emerald-400 hover:text-emerald-600 transition-colors"
          >
            <IconeCodigo />
            Carregar exemplo
            <IconeSeta aberto={menu === 'exemplos'} />
          </button>

          {/* Configurações */}
          <button
            onClick={() => setMenu(menu === 'config' ? null : 'config')}
            aria-label="Configurações"
            className="inline-flex items-center gap-2 bg-white border border-zinc-200 text-zinc-700 px-4 py-2 rounded-xl text-sm font-semibold hover:border-emerald-400 hover:text-emerald-600 transition-colors"
          >
            <IconeEngrenagem />
            Configurações
          </button>

          {modoEstrito && (
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
              Modo estrito
            </span>
          )}

          {menu === 'exemplos' && (
            <MenuExemplos onEscolher={carregarExemplo} />
          )}
          {menu === 'config' && (
            <PainelConfig
              config={config}
              setConfig={setConfig}
              modoEstrito={modoEstrito}
              setModoEstrito={setModoEstrito}
            />
          )}
        </div>
      </header>

      {/* Área principal: editor grande + saída/entrada */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Editor */}
        <section className="lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-2 gap-2">
            <div className="flex items-baseline gap-2 min-w-0">
              <label className="text-sm font-bold text-zinc-700">Código</label>
              <span className="text-xs text-zinc-400 font-mono truncate">playground.libra</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden sm:inline text-xs text-zinc-400 tabular-nums">
                {linhasCodigo} {linhasCodigo === 1 ? 'linha' : 'linhas'}
              </span>
              <BotaoBarra rotulo="Copiar código" texto={codigo} />
            </div>
          </div>
          <div
            className={`h-[74vh] min-h-[480px] rounded-2xl overflow-hidden border shadow-xl shadow-zinc-200/60 ${
              escuro ? 'border-zinc-800' : 'border-zinc-200'
            }`}
          >
            <CodeMirror
              value={codigo}
              onChange={setCodigo}
              height="100%"
              className="h-full"
              theme={escuro ? oneDark : 'light'}
              extensions={extensoes}
              basicSetup={{
                lineNumbers: config.numeroLinhas,
                foldGutter: false,
                highlightActiveLine: true,
                autocompletion: false,
                bracketMatching: true,
                closeBrackets: true,
              }}
            />
          </div>
        </section>

        {/* Saída + Entrada */}
        <section className="lg:col-span-1 flex flex-col gap-4 h-[74vh] min-h-[480px]">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-2 gap-2">
              <div className="flex items-center gap-2">
                <label className="text-sm font-bold text-zinc-700">Saída</label>
                <StatusSaida rodando={rodando} carregando={carregando} erro={erro} duracaoMs={duracaoMs} />
              </div>
              <div className="flex items-center gap-1">
                <BotaoBarra rotulo="Copiar saída" texto={saida} disabled={!saida} />
                <button
                  onClick={limparSaida}
                  disabled={!saida}
                  aria-label="Limpar saída"
                  title="Limpar saída"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  <IconeLixeira />
                </button>
              </div>
            </div>
            <pre
              className={`flex-1 font-mono text-sm p-5 rounded-2xl overflow-auto whitespace-pre-wrap shadow-xl shadow-zinc-200/60 scrollbar-minimalist transition-colors ${
                erro
                  ? 'bg-red-950 text-red-100 ring-1 ring-red-500/40'
                  : 'bg-zinc-900 text-zinc-100'
              }`}
            >
              {saida || (
                <span className="text-zinc-500">A saída do seu programa aparecerá aqui.</span>
              )}
            </pre>
          </div>

          <div className="shrink-0">
            <label className="block text-sm font-bold text-zinc-700 mb-2">
              Entrada padrão{' '}
              <span className="font-normal text-zinc-400 text-xs">
                — lida por <code className="bg-zinc-100 px-1 rounded">entrada()</code>, uma linha por vez
              </span>
            </label>
            <textarea
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              spellCheck={false}
              placeholder="Digite aqui o que o programa deve ler…"
              className="w-full h-24 bg-white border border-zinc-200 text-zinc-700 font-mono text-sm p-4 rounded-2xl resize-y outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </section>
      </div>

      <p className="text-xs text-zinc-400 mt-5 text-center">
        O interpretador oficial da Libra roda no seu navegador via WebAssembly. Recursos que dependem
        do sistema (arquivos, DLLs) ficam desabilitados nesta versão.{' '}
        <a href={DOCS_URL} className="text-emerald-600 hover:underline font-medium">
          Ver documentação
        </a>
        .
      </p>
    </main>
  );
}

// ── Menu de exemplos ─────────────────────────────────────────────────────────
function MenuExemplos({ onEscolher }: { onEscolher: (ex: ExemploLibra) => void }) {
  return (
    <div className="absolute top-full left-0 mt-2 w-80 max-w-[calc(100vw-2rem)] max-h-[60vh] overflow-auto bg-white border border-zinc-200 rounded-2xl shadow-2xl shadow-zinc-300/50 p-2 z-50 scrollbar-minimalist">
      {EXEMPLOS.map((ex) => (
        <button
          key={ex.id}
          onClick={() => onEscolher(ex)}
          className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors group"
        >
          <div className="text-sm font-semibold text-zinc-800 group-hover:text-emerald-700">
            {ex.nome}
          </div>
          <div className="text-xs text-zinc-500">{ex.descricao}</div>
        </button>
      ))}
    </div>
  );
}

// ── Painel de configurações ──────────────────────────────────────────────────
function PainelConfig({
  config,
  setConfig,
  modoEstrito,
  setModoEstrito,
}: {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
  modoEstrito: boolean;
  setModoEstrito: (v: boolean) => void;
}) {
  const set = <K extends keyof Config>(chave: K, valor: Config[K]) =>
    setConfig((c) => ({ ...c, [chave]: valor }));

  return (
    <div className="absolute top-full left-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white border border-zinc-200 rounded-2xl shadow-2xl shadow-zinc-300/50 p-4 z-50 space-y-5">
      {/* Aparência */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-400 mb-3">Aparência</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-700">Tema</span>
            <div className="flex bg-zinc-100 rounded-lg p-0.5">
              {(['claro', 'escuro'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => set('tema', t)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition-colors ${
                    config.tema === t ? 'bg-white shadow text-emerald-600' : 'text-zinc-500'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-700">Tamanho da fonte</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => set('fontSize', Math.max(11, Math.round((config.fontSize - 1) * 2) / 2))}
                className="w-7 h-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold"
              >
                −
              </button>
              <span className="text-sm font-mono text-zinc-600 w-10 text-center">
                {config.fontSize}px
              </span>
              <button
                onClick={() => set('fontSize', Math.min(24, Math.round((config.fontSize + 1) * 2) / 2))}
                className="w-7 h-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold"
              >
                +
              </button>
            </div>
          </div>

          <Interruptor
            rotulo="Quebra de linha"
            ativo={config.quebraLinha}
            onChange={(v) => set('quebraLinha', v)}
          />
          <Interruptor
            rotulo="Números de linha"
            ativo={config.numeroLinhas}
            onChange={(v) => set('numeroLinhas', v)}
          />
        </div>
      </div>

      {/* Motor */}
      <div className="border-t border-zinc-100 pt-4">
        <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-400 mb-3">Motor</h3>
        <Interruptor
          rotulo="Modo estrito"
          descricao="Tipagem estática mais rígida no parser e no interpretador."
          ativo={modoEstrito}
          onChange={setModoEstrito}
        />
      </div>
    </div>
  );
}

// ── Componentes auxiliares ───────────────────────────────────────────────────
function Interruptor({
  rotulo,
  descricao,
  ativo,
  onChange,
}: {
  rotulo: string;
  descricao?: string;
  ativo: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start justify-between gap-3 cursor-pointer">
      <span>
        <span className="text-sm font-medium text-zinc-700">{rotulo}</span>
        {descricao && <span className="block text-xs text-zinc-400 mt-0.5">{descricao}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={ativo}
        onClick={() => onChange(!ativo)}
        className={`shrink-0 mt-0.5 w-10 h-6 rounded-full transition-colors relative ${
          ativo ? 'bg-emerald-500' : 'bg-zinc-300'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            ativo ? 'translate-x-4' : ''
          }`}
        />
      </button>
    </label>
  );
}

// Hook: copia texto para a área de transferência com feedback temporário.
function useCopiar() {
  const [copiado, setCopiado] = useState(false);
  const copiar = useCallback((texto: string) => {
    if (!texto || !navigator.clipboard) return;
    navigator.clipboard
      .writeText(texto)
      .then(() => {
        setCopiado(true);
        setTimeout(() => setCopiado(false), 1500);
      })
      .catch(() => {
        /* ignora clipboard indisponível */
      });
  }, []);
  return { copiado, copiar };
}

// Botão pequeno de barra que copia um texto e mostra confirmação.
function BotaoBarra({
  rotulo,
  texto,
  disabled,
}: {
  rotulo: string;
  texto: string;
  disabled?: boolean;
}) {
  const { copiado, copiar } = useCopiar();
  return (
    <button
      onClick={() => copiar(texto)}
      disabled={disabled}
      aria-label={rotulo}
      title={rotulo}
      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent ${
        copiado
          ? 'text-emerald-600'
          : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700'
      }`}
    >
      {copiado ? <IconeCheck /> : <IconeCopiar />}
    </button>
  );
}

// Indicador de status da saída (rodando / erro / tempo de execução).
function StatusSaida({
  rodando,
  carregando,
  erro,
  duracaoMs,
}: {
  rodando: boolean;
  carregando: boolean;
  erro: boolean;
  duracaoMs: number | null;
}) {
  if (rodando) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        {carregando ? 'Carregando runtime…' : 'Executando…'}
      </span>
    );
  }
  if (erro) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        Falhou
      </span>
    );
  }
  if (duracaoMs != null) {
    const t = duracaoMs >= 1000 ? `${(duracaoMs / 1000).toFixed(2)}s` : `${Math.round(duracaoMs)}ms`;
    return <span className="text-xs text-zinc-400 tabular-nums">concluído em {t}</span>;
  }
  return null;
}

function IconeCopiar() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconeCheck() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconeLixeira() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function IconeEngrenagem() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function IconeCodigo() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconeSeta({ aberto }: { aberto: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 transition-transform ${aberto ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
