export function Download() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-extrabold mb-6">Baixar Libra</h1>
      <p className="text-lg text-zinc-500 mb-12">
        Escolha a melhor forma de começar a usar a Libra no seu computador.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-emerald-600">Docker (Recomendado)</h2>
          <p className="text-zinc-500 mb-6">A forma mais rápida, sem precisar instalar dependências no seu sistema.</p>
          <div className="bg-zinc-900 p-4 rounded-xl font-mono text-sm text-emerald-400 mb-4">
            docker run -it --rm libra
          </div>
          <p className="text-xs text-zinc-400 italic">Requer Docker instalado.</p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-emerald-600">Build Local</h2>
          <p className="text-zinc-500 mb-6">Para desenvolvedores que desejam compilar a linguagem nativamente.</p>
          <ul className="text-sm text-zinc-600 space-y-3 mb-6">
            <li>• Requer .NET 9 SDK</li>
            <li>• Clone o repositório GitHub</li>
            <li>• Execute os scripts de publicação</li>
          </ul>
          <a href="https://github.com/linguagem-libra/libra" target="_blank" className="text-emerald-600 font-bold hover:underline">Ver no GitHub →</a>
        </div>
      </div>

      <div className="mt-12 bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100">
        <h2 className="text-xl font-bold mb-4 text-emerald-800">Extensão para VS Code</h2>
        <p className="text-emerald-700 mb-6">Tenha syntax highlighting e suporte completo ao escrever seus códigos .libra</p>
        <a 
          href="https://marketplace.visualstudio.com/items?itemName=LucasMCampos.libra" 
          target="_blank"
          className="inline-block bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-md shadow-emerald-200"
        >
          Instalar Extensão
        </a>
      </div>
    </main>
  );
}
