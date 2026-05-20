import { Link } from 'react-router-dom';

export function Home() {
  const syntaxItems = [
    { label: 'Variáveis', example: 'var nome = "Libra"', desc: 'Guarde informações de forma simples.' },
    { label: 'Constantes', example: 'const PI = 3.14', desc: 'Valores que nunca mudam.' },
    { label: 'Tipos', example: 'var x: Int', desc: 'Números, textos e muito mais.' },
    { label: 'Vetores', example: 'var lista = {1, 2, 3}', desc: 'Agrupe vários itens juntos.' },
    { label: 'Classes', example: 'classe Animal ... fim', desc: 'Crie seus próprios objetos.' },
    { label: 'Loops', example: 'enquanto condicao repetir', desc: 'Repita tarefas automaticamente.' },
  ];

  const codeExample = (
    <code>
      <span className="text-zinc-500">// Jogo de Adivinhação</span>{"\n"}
      <span className="text-emerald-400">importar</span> matematica{"\n\n"}
      <span className="text-emerald-400">const</span> numeroSecreto = <span className="text-sky-300">int</span>(matematica.<span className="text-sky-300">aleatorio</span>(<span className="text-orange-300">0</span>, <span className="text-orange-300">100</span>)){"\n"}
      <span className="text-sky-300">exibir</span>(<span className="text-amber-200">"Adivinhe o número!"</span>){"\n\n"}
      <span className="text-emerald-400">var</span> palpite = <span className="text-sky-300">int</span>(<span className="text-sky-300">entrada</span>()){"\n\n"}
      <span className="text-emerald-400">enquanto</span> palpite != numeroSecreto <span className="text-emerald-400">repetir</span>{"\n"}
      {"    "}<span className="text-emerald-400">se</span> palpite {">"} numeroSecreto <span className="text-emerald-400">entao</span>{"\n"}
      {"        "}<span className="text-sky-300">exibir</span>(<span className="text-amber-200">"Muito alto!"</span>){"\n"}
      {"    "}<span className="text-emerald-400">senao</span>{"\n"}
      {"        "}<span className="text-sky-300">exibir</span>(<span className="text-amber-200">"Muito baixo!"</span>){"\n"}
      {"    "}<span className="text-emerald-400">fim</span>{"\n"}
      {"    "}palpite = <span className="text-sky-300">int</span>(<span className="text-sky-300">entrada</span>()){"\n"}
      <span className="text-emerald-400">fim</span>{"\n\n"}
      <span className="text-sky-300">exibir</span>(<span className="text-amber-200">"Você acertou!"</span>)
    </code>
  );

  return (
    <>
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold mb-6">
              ✨ Simples, Moderna e Brasileira
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-zinc-900 leading-[1.15]">
              Aprenda a programar no <span className="text-emerald-500">seu idioma</span>.
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Libra remove a barreira do inglês para quem está começando. Uma linguagem poderosa para estudantes e criadores, feita por brasileiros para brasileiros.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/baixar" className="bg-emerald-500 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2">
                Baixar Libra
              </Link>
              <a href="https://testar.linguagemlibra.site" target="_blank" className="bg-zinc-50 text-zinc-600 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-zinc-100 transition-all border border-zinc-200 flex items-center justify-center gap-2">
                Testar no Navegador
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="relative w-full overflow-hidden lg:overflow-visible">
            <div className="absolute -inset-4 bg-emerald-100/50 blur-3xl rounded-full -z-10"></div>
            <div className="bg-[#1e1e1e] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-2xl shadow-emerald-200/50 relative overflow-hidden border border-zinc-800">
              <div className="flex gap-1.5 mb-6">
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <span className="text-[10px] text-zinc-500 font-mono ml-2 uppercase tracking-widest">adivinhacao.libra</span>
              </div>
              <div className="overflow-x-auto scrollbar-minimalist pb-4">
                <pre className="font-mono text-xs sm:text-sm md:text-base leading-relaxed text-zinc-300">
                  {codeExample}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="bg-zinc-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Tudo o que você precisa</h2>
            <p className="text-zinc-500">Uma sintaxe intuitiva que faz sentido desde o primeiro dia.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {syntaxItems.map((item, i) => (
              <div key={i} className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-zinc-100 hover:shadow-xl hover:shadow-emerald-500/5 transition-all group">
                <h3 className="text-emerald-600 font-bold mb-2">{item.label}</h3>
                <p className="text-zinc-500 text-sm mb-4 leading-relaxed">{item.desc}</p>
                <code className="block bg-zinc-50 p-4 rounded-xl text-zinc-700 font-mono text-xs sm:text-sm group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors border border-zinc-100 overflow-x-auto">
                  {item.example}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
