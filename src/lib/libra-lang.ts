import { StreamLanguage, LanguageSupport } from '@codemirror/language';

// Palavras reservadas da Libra (espelham Tokenizador.cs).
const palavrasChave = new Set([
  'var', 'const', 'funcao', 'classe', 'se', 'senao', 'enquanto', 'repetir',
  'para', 'cada', 'em', 'romper', 'continuar', 'retornar', 'tentar',
  'capturar', 'entao', 'fim', 'importar', 'como',
]);

// Operadores em forma de palavra.
const operadoresPalavra = new Set(['e', 'ou', 'nao', 'neg']);

// Literais.
const atomos = new Set(['nulo']);

// Nomes de tipos (TiposPadrao).
const tipos = new Set([
  'Texto', 'Int', 'Real', 'Vetor', 'Objeto', 'Nulo', 'Byte', 'Func',
]);

// Funções embutidas mais comuns (LibraBase / módulos padrão).
const embutidas = new Set([
  'exibir', 'entrada', 'tipo', 'tamanho', 'texto', 'int', 'real', 'garantir',
  'erro', 'concat', 'pausar', 'sair', 'bytes', 'tentarInt', 'tentarReal',
  'caractere',
]);

type EstadoLibra = { emComentario: boolean };

const parserLibra = StreamLanguage.define<EstadoLibra>({
  name: 'libra',
  startState: () => ({ emComentario: false }),
  token(stream, state) {
    // Comentário de bloco em andamento
    if (state.emComentario) {
      if (stream.match(/.*?\*\//)) state.emComentario = false;
      else stream.skipToEnd();
      return 'comment';
    }

    if (stream.eatSpace()) return null;

    // Comentários
    if (stream.match('//')) {
      stream.skipToEnd();
      return 'comment';
    }
    if (stream.match('/*')) {
      state.emComentario = true;
      return 'comment';
    }

    // Strings (com fechamento opcional para não "vazar" em linha incompleta)
    if (stream.match(/^"(?:[^"\\]|\\.)*"?/)) return 'string';

    // Números (aceita separador _ e casas decimais)
    if (stream.match(/^\d[\d_]*(?:\.\d+)?/)) return 'number';

    // Identificadores e palavras reservadas
    if (stream.match(/^[A-Za-z_][A-Za-z0-9_]*/)) {
      const palavra = stream.current();
      if (palavrasChave.has(palavra)) return 'keyword';
      if (operadoresPalavra.has(palavra)) return 'operator';
      if (atomos.has(palavra)) return 'atom';
      if (tipos.has(palavra)) return 'type';
      if (embutidas.has(palavra)) return 'builtin';
      return 'variable';
    }

    // Operadores/símbolos
    if (stream.match(/^[+\-*/%^=<>!]+/)) return 'operator';

    stream.next();
    return null;
  },
  languageData: {
    commentTokens: { line: '//', block: { open: '/*', close: '*/' } },
  },
});

/** Extensão de linguagem Libra para o CodeMirror. */
export function libra() {
  return new LanguageSupport(parserLibra);
}
