import React from 'react';
import './App.css';

// ── 1. FUNCIÓN PARA CARGAR LAS IMÁGENES CORRECTAMENTE EN VITE ──
const getAssetUrl = (name) => {
  return new URL(`./assets/${name}`, import.meta.url).href;
};

// ── 2. COMPONENTE DE LA TARJETA DE TESTIMONIOS ──
function TestimonioCardExtenso({ paragraphs, highlightQuote, name, meta, imgSrc }) {
  return (
    <div className="testimonio-card">
      <div className="testimonio-img-wrap">
        <img src={imgSrc} alt={`Testimonio de ${name}`} />
      </div>
      <div className="testimonio-content">
        <span className="quote-icon">“</span>
        <blockquote className="highlight-quote">{highlightQuote}</blockquote>
        <div className="testimonio-paragraphs">
          {paragraphs.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
        <div className="testimonio-footer">
          <h4 className="testimonio-name">{name}</h4>
          <p className="testimonio-meta">{meta}</p>
        </div>
      </div>
    </div>
  );
}

// ── 3. COMPONENTE PRINCIPAL (APP) ──
export default function App() {
  // Datos de los testimonios con las rutas corregidas
  const testimonioFrancisco = [
    "Uno siente vergüenza de preguntar, porque piensa que para el resto es obvio. A mi edad, quedarse abajo del tren digital es quedarse sola.",
    "A veces prefiero decir que no me interesa, pero la verdad es que me da miedo bloquear el teléfono o borrar algo importante sin querer."
  ];

  const testimonioLiliana = [
    "Todo se volvió un trámite en una pantalla. Ir al banco antes era conversar con alguien; ahora es pelear con una máquina que no me entiende.",
    "Siento que el mundo avanzó muy rápido y a los de nuestra generación nos dejaron cuidando el pasado, sin darnos las llaves del presente."
  ];

  return (
    <div className="app-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Inclusión y Alfabetización Digital</h1>
          <p>Reduciendo la brecha tecnológica en nuestra comunidad.</p>
        </div>
      </header>

      {/* ── APARTADO EXTENSO DE TESTIMONIOS ── */}
      <section className="testimonios-section" id="testimonios">
        <div className="testimonios-inner">
          <div className="section-tag">Testimonios Reales</div>
          <h2 className="section-title">Historias de nuestra comunidad</h2>
          <p className="section-desc">El impacto humano detrás de la transformación digital. Testimonios íntimos sobre el esfuerzo y los desafíos de conectarse hoy en día.</p>
          
          <div className="testimonios-grid">
            {/* Testimonio 1: Francisco */}
            <TestimonioCardExtenso
              imgSrc={getAssetUrl("abuelo belen.jpeg")}
              paragraphs={testimonioFrancisco}
              highlightQuote="Uno siente vergüenza de preguntar, porque parece que todos saben menos tú"
              name="Francisco"
              meta="Exoperario metalúrgico · Jubilado"
            />
            
            {/* Testimonio 2: Liliana */}
            <TestimonioCardExtenso
              imgSrc={getAssetUrl("abuela belen.jpeg")}
              paragraphs={testimonioLiliana}
              highlightQuote="Ahora no sé en qué creer. Antes dudaba de pocas cosas, ahora dudo de todo."
              name="Liliana (Gloria)"
              meta="70 años · Dueña de casa"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
