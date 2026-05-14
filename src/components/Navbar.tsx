import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-zinc-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="https://avatars.githubusercontent.com/u/170988597?s=400&u=1aa68e42fb32ade404e8312e7b765d74578a57e3&v=4" 
            alt="Libra Logo" 
            className="w-9 h-9 rounded-xl"
          />
          <span className="text-xl font-bold tracking-tight text-emerald-600">Libra</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-500">
          <Link to="/baixar" className="hover:text-emerald-600 transition-colors">Baixar</Link>
          <Link to="/documentacao" className="hover:text-emerald-600 transition-colors">Documentação</Link>
          <Link to="/comunidade" className="hover:text-emerald-600 transition-colors">Comunidade</Link>
          <Link to="/blog" className="hover:text-emerald-600 transition-colors">Blog</Link>
          <Link to="/sobre" className="hover:text-emerald-600 transition-colors">Sobre</Link>
        </div>
        <a 
          href="https://testar.linguagemlibra.site" 
          target="_blank"
          className="bg-emerald-500 text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-emerald-600 transition-all shadow-md shadow-emerald-200 active:scale-95"
        >
          Testar agora
        </a>
      </div>
    </nav>
  );
}
