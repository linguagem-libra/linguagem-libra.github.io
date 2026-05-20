import { Link } from 'react-router-dom';

export function Home() {
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
      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                Começar Agora
              </Link>
              <a href="https://testar.linguagemlibra.site" target="_blank" className="bg-zinc-50 text-zinc-600 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-zinc-100 transition-all border border-zinc-200 flex items-center justify-center gap-2">
                Testar no Navegador
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

      {/* Features Grid */}
      <section className="bg-zinc-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-zinc-900">Performance Nativa</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Construída sobre o ecossistema .NET, a Libra oferece velocidade e segurança para aplicações reais.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-zinc-900">Foco Educacional</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Sintaxe pensada para ser o primeiro passo de qualquer estudante, eliminando a barreira linguística.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-zinc-900">Comunidade Ativa</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Um projeto brasileiro, feito por brasileiros, com suporte direto em canais da nossa comunidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore & Blog Section Combined */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link to="/documentacao" className="group p-6 bg-white border border-zinc-100 rounded-3xl hover:shadow-lg transition-all">
                <h4 className="font-bold text-zinc-900 mb-2 group-hover:text-emerald-600 transition-colors">Documentação →</h4>
                <p className="text-zinc-500 text-sm">Aprenda a sintaxe e as bibliotecas padrão.</p>
              </Link>
              <Link to="/comunidade" className="group p-6 bg-white border border-zinc-100 rounded-3xl hover:shadow-lg transition-all">
                <h4 className="font-bold text-zinc-900 mb-2 group-hover:text-emerald-600 transition-colors">Comunidade →</h4>
                <p className="text-zinc-500 text-sm">Participe do nosso Discord e colabore.</p>
              </Link>
              <Link to="/sobre" className="group p-6 bg-white border border-zinc-100 rounded-3xl hover:shadow-lg transition-all">
                <h4 className="font-bold text-zinc-900 mb-2 group-hover:text-emerald-600 transition-colors">Sobre o Projeto →</h4>
                <p className="text-zinc-500 text-sm">Conheça a história e quem faz a Libra.</p>
              </Link>
              <Link to="/baixar" className="group p-6 bg-emerald-50 border border-emerald-100 rounded-3xl hover:shadow-lg transition-all">
                <h4 className="font-bold text-emerald-700 mb-2">Baixar Libra →</h4>
                <p className="text-emerald-600/70 text-sm">Instale no seu computador e comece agora.</p>
              </Link>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-zinc-900">Últimas do Blog</h3>
                <Link to="/blog" className="text-xs font-bold text-emerald-600 hover:underline">Ver tudo</Link>
              </div>
              <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100">
                <ul className="space-y-4">
                  <li className="text-zinc-400 text-sm italic">Nenhuma postagem ainda...</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-16 text-center border-t border-zinc-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-6">Pronto para criar o futuro em português?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/baixar" className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-md shadow-emerald-100">
              Baixar Agora
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
