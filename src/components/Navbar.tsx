import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/baixar', label: 'Baixar' },
    { to: '/documentacao', label: 'Documentação' },
    { to: '/comunidade', label: 'Comunidade' },
    { to: '/blog', label: 'Blog' },
    { to: '/sobre', label: 'Sobre' },
  ];

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

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-500">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-emerald-600 transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://testar.linguagemlibra.site" 
            target="_blank"
            className="hidden sm:block bg-emerald-500 text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-emerald-600 transition-all shadow-md shadow-emerald-200 active:scale-95"
          >
            Testar agora
          </a>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white p-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className="text-lg font-semibold text-zinc-600 hover:text-emerald-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-zinc-100">
            <a 
              href="https://testar.linguagemlibra.site" 
              target="_blank"
              className="block w-full text-center bg-emerald-500 text-white px-5 py-3 rounded-2xl text-base font-bold hover:bg-emerald-600 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Testar agora no navegador
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
