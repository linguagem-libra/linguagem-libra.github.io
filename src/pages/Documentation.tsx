export function Documentation() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 text-center">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Documentação</h1>
      <p className="text-lg text-zinc-500 mb-12 max-w-2xl mx-auto">
        Aprenda tudo sobre a sintaxe, bibliotecas padrão e como contribuir para a linguagem Libra.
      </p>
      
      <div className="bg-zinc-50 rounded-[3rem] p-12 border border-zinc-100">
        <h2 className="text-2xl font-bold mb-6 text-zinc-800">Guia Completo</h2>
        <p className="text-zinc-600 mb-10">
          Nossa documentação oficial é mantida diretamente no repositório principal para garantir que esteja sempre atualizada.
        </p>
        <a 
          href="https://github.com/linguagem-libra/libra/tree/master/docs" 
          target="_blank"
          className="inline-block bg-emerald-500 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200"
        >
          Acessar Documentação →
        </a>
      </div>
    </main>
  );
}
