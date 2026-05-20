export function About() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-zinc-900 text-center md:text-left">Sobre a Libra</h1>
      
      <section className="prose prose-zinc prose-lg max-w-none text-zinc-600 leading-relaxed space-y-6">
        <p>
          A <span className="text-emerald-600 font-bold">Libra</span> nasceu do desejo de tornar a tecnologia mais acessível para todos os brasileiros. Frequentemente, o maior obstáculo para quem quer aprender a programar não é a lógica, mas sim a barreira do idioma inglês.
        </p>
        
        <p>
          Nossa missão é fornecer uma linguagem de programação moderna, robusta e totalmente em português, permitindo que estudantes foquem no que realmente importa: resolver problemas e criar soluções inovadoras.
        </p>

        <h2 className="text-2xl font-bold text-zinc-900 mt-12">Por que Libra?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-6">
          <div className="space-y-2">
            <h3 className="font-bold text-emerald-600">Simplicidade</h3>
            <p className="text-sm">Sintaxe limpa e intuitiva, inspirada nas melhores linguagens modernas.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-emerald-600">Educação</h3>
            <p className="text-sm">Feita para ser a primeira linguagem de qualquer estudante brasileiro.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-emerald-600">Performance</h3>
            <p className="text-sm">Desenvolvida sobre o ecossistema .NET para garantir velocidade e segurança.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 mt-12">Desenvolvimento Aberto</h2>
        <p>
          A Libra é um projeto de código aberto mantido por <span className="font-bold text-zinc-900">Lucas M. Campos</span> e construído com a ajuda de voluntários. Acreditamos que uma linguagem feita para o Brasil deve ser evoluída de forma transparente e colaborativa, onde qualquer pessoa pode sugerir melhorias, reportar problemas ou contribuir com o código-fonte.
        </p>
      </section>
    </main>
  );
}
