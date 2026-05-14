export function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-zinc-100 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <img src="https://avatars.githubusercontent.com/u/170988597?s=400&u=1aa68e42fb32ade404e8312e7b765d74578a57e3&v=4" className="w-8 h-8 rounded-lg grayscale opacity-50" alt="" />
          <span className="font-bold text-zinc-400 italic">Libra</span>
        </div>
        <div className="flex gap-8 text-sm font-medium text-zinc-400">
          <a href="https://discord.gg/mnGkSD4CsA" target="_blank" className="hover:text-emerald-600 transition-colors">Comunidade</a>
          <a href="mailto:lucasm.campos@hotmail.com.br" className="hover:text-emerald-600 transition-colors">Contato</a>
          <a href="https://github.com/linguagem-libra/libra" target="_blank" className="hover:text-emerald-600 transition-colors">GitHub</a>
        </div>
        <p className="text-zinc-400 text-sm">
          Feito com ❤️ por <span className="font-bold text-zinc-600">Lucas M. Campos</span>
        </p>
      </div>
    </footer>
  );
}
