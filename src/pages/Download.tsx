export function Download() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center md:text-left">Baixar Libra</h1>
      <p className="text-lg text-zinc-500 mb-12 text-center md:text-left">
        Escolha a melhor forma de começar a usar a Libra no seu computador.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-zinc-800 flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm shrink-0">1</span>
            Instalação Automática via Docker (Recomendado)
          </h2>
          <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-zinc-100 shadow-sm">
            <p className="text-zinc-600 mb-6 text-sm md:text-base">
              Este script detecta seu shell automaticamente e configura o alias <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-emerald-600 font-mono">libra</code> no seu perfil.
            </p>
            <div className="bg-zinc-900 p-5 rounded-2xl font-mono text-sm text-emerald-400 mb-4 overflow-x-auto scrollbar-minimalist pb-4 whitespace-nowrap md:whitespace-normal">
              curl -sSL https://linguagem-libra.github.io/instalar-docker.sh | bash
            </div>
            <p className="text-sm text-zinc-400">
              Após rodar, basta reiniciar o terminal ou rodar <code className="bg-zinc-50 px-1 rounded border">source ~/.bashrc</code> (ou seu respectivo arquivo de shell).
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-zinc-800 flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm shrink-0">2</span>
            Outras Formas de Uso
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-zinc-100 shadow-sm">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-emerald-600">Execução Direta</h3>
              <p className="text-zinc-500 text-sm mb-6">Se você não quiser criar um alias, pode rodar o container diretamente mapeando o diretório atual:</p>
              <div className="bg-zinc-900 p-4 rounded-xl font-mono text-xs text-emerald-400 mb-4 overflow-x-auto leading-relaxed">
                docker run -it --rm -v $(pwd):/app -w /app lucazof/libra
              </div>
              <p className="text-xs text-zinc-400">Isso monta sua pasta atual dentro do container para que a Libra consiga ler seus arquivos <code className="bg-zinc-50">.libra</code>.</p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-zinc-100 shadow-sm">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-emerald-600">Alias Manual</h3>
              <p className="text-zinc-500 text-sm mb-4">Adicione esta linha ao seu <code className="bg-zinc-100 px-1">.bashrc</code> ou <code className="bg-zinc-100 px-1">.zshrc</code>:</p>
              <div className="bg-zinc-900 p-4 rounded-xl font-mono text-xs text-emerald-400 mb-4 overflow-x-auto whitespace-nowrap">
                alias libra='docker run -it --rm -v $(pwd):/app -w /app lucazof/libra'
              </div>
              <p className="text-xs text-zinc-400 italic font-medium">Nota: No Fish Shell, a sintaxe muda ligeiramente (veja o script de instalação).</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-emerald-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-emerald-100">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-emerald-800">Extensão VS Code</h2>
            <p className="text-emerald-700 text-sm mb-6 font-medium">Tenha syntax highlighting e suporte completo ao escrever seus códigos.</p>
            <a 
              href="https://marketplace.visualstudio.com/items?itemName=LucasMCampos.libra" 
              target="_blank"
              className="inline-block w-full md:w-auto text-center bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-md shadow-emerald-200"
            >
              Instalar Extensão
            </a>
          </div>

          <div className="bg-zinc-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-zinc-200">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-zinc-800">Build Local</h2>
            <p className="text-zinc-500 text-sm mb-6 italic">Requer .NET 9 SDK para compilação manual do código fonte.</p>
            <a 
              href="https://github.com/linguagem-libra/libra" 
              target="_blank" 
              className="text-emerald-600 font-bold hover:underline inline-flex items-center gap-2"
            >
              Ver repositório no GitHub →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
