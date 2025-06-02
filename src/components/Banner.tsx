import React from 'react';
import './Banner.css';
import Button from './Button';

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-content-holder">
        <div className="banner-content">
            <h1>Libra, uma linguagem de Programação simples e eficiente</h1>
            <p>Libra é ótima para iniciantes e desenvolvedores que querem escrever código claro, 
                direto e eficiente — sem barreiras de idioma, e totalmente gratis!
            </p>
            <Button type='secondary'>Baixe agora</Button>
        </div>
        
      </div>
    </section>
  );
};

export default Banner;
