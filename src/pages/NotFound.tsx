import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20 md:py-40 text-center">
      <div className="text-7xl md:text-9xl font-black text-emerald-500/10 mb-8 select-none">404</div>
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-zinc-900">Opa! Página não encontrada.</h1>
      <p className="text-xl text-zinc-500 mb-10 max-w-md mx-auto leading-relaxed">
        Parece que o caminho que você tentou seguir não existe ou foi movido para outro lugar.
      </p>
      <Link 
        to="/" 
        className="inline-block bg-emerald-500 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 active:scale-95"
      >
        Voltar para o início
      </Link>
    </main>
  );
}
