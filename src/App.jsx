import React, { useState } from 'react';
import './App.css';

// ── 1. FUNCIÓN PARA CARGAR LAS IMÁGENES CORRECTAMENTE EN VITE ──
const getAssetUrl = (name) => {
  return new URL(`./assets/${name}`, import.meta.url).href;
};

// ── 2. COMPONENTES COMPLEMENTARIOS ──

function StatCard({ number, label, description }) {
  return (
    <div className="stat-card">
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-desc">{description}</div>
    </div>
  );
}

function PillarCard({ title, description, icon }) {
  return (
    <div className="pillar-card">
      <div className="pillar-icon-wrap">{icon}</div>
      <h3 className="pillar-title">{title}</h3>
      <p className="pillar-desc">{description}</p>
    </div>
  );
}

function TestimonioCardExtenso({ paragraphs, highlightQuote, name, meta, avatarLetter, imgSrc }) {
  return (
    <div className="testimonio-card-extenso">
      <div className="testimonio-card-main">
        <div className="testimonio-img-container">
          <img src={imgSrc} alt={`Retrato de ${name}`} className="testimonio-img" />
        </div>
        <div className="testimonio-body">
          <div className="testimonio-header">
            <div className="testimonio-avatar-fallback">{avatarLetter}</div>
            <div className="testimonio-meta-info">
              <h4 className="testimonio-name-text">{name}</h4>
              <p className="testimonio-meta-sub">{meta}</p>
            </div>
          </div>
          <span className="quote-mark-large">“</span>
          <blockquote className="testimonio-highlight-quote">
            {highlightQuote}
          </blockquote>
          <div className="testimonio-paragraphs-wrap">
            {paragraphs.map((p, i) => (
              <p key={i} className="testimonio-paragraph-item">{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 3. COMPONENTE PRINCIPAL (APP) ──
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Textos originales extensos de tus testimonios
  const testimonioFrancisco = [
    "«Uno siente vergüenza de preguntar, porque piensa que para el resto es obvio. A mi edad, quedarse abajo del tren digital es quedarse sola. Mis hijos me compraron un teléfono moderno para estar conectados, pero cada vez que se actualiza o cambia algo de lugar, quedo completamente a ciegas».",
    "«A veces prefiero decir que no me interesa o que prefiero lo antiguo, pero la verdad es que me da miedo bloquear el teléfono, transferir dinero a un lugar equivocado o borrar algo importante sin querer. El mundo digital se siente como un vecindario desconocido donde todos caminan muy rápido y nadie tiene tiempo de darte una dirección».",
    "«La tecnología debería acercarnos, pero cuando dependes de que alguien más te haga un trámite en Comisaría Virtual o revise tu cartola del banco, sientes que pierdes un pedazo de tu dignidad y de tu independencia»."
  ];

  const testimonioLiliana = [
    "«Todo se volvió un trámite en una pantalla. Ir al banco antes era conversar con un ejecutivo que te conocía; ahora es pelear con una máquina automática que no me entiende la huella o una aplicación que me pide cambiar la clave cada tres meses».",
    "«Siento que el mundo avanzó demasiado rápido y a los de nuestra generación nos dejaron cuidando el pasado, sin darnos las llaves del presente. Cuando intentas aprender, los manuales están en un lenguaje extraño lleno de palabras en inglés como 'link', 'login' o 'scam'. Da una sensación tremenda de desamparo»."
  ];

  return (
    <div className="site-wrapper">
      {/* HEADER / NAVIGATION */}
      <header className="site-header">
        <div className="header-inner">
          <div className="logo-area">
            <span className="logo-dot"></span>
            <span className="logo-text">BRECHA digital</span>
          </div>

          <nav className={`main-nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
            <a href="#contexto" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contexto</a>
            <a href="#pilares" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Pilares</a>
            <a href="#testimonios" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Testimonios</a>
            <a href="#soluciones" className="nav-link nav-btn-accent" onClick={() => setMobileMenuOpen(false)}>Propuesta de Inclusión</a>
          </nav>

          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-text-side">
            <div className="hero-badge">Proyecto de Concientización Social · 2026</div>
            <h1 className="hero-main-title">
              Analfabetismo <br />
              <span className="text-gradient">Digital</span> en la <br />
              Tercera Edad.
            </h1>
            <p className="hero-subtitle">
              La digitalización acelerada de los servicios esenciales ha transformado la tecnología en una barrera invisible de exclusión. Analizamos el impacto humano detrás de las pantallas y la urgencia de un diseño verdaderamente inclusivo.
            </p>
            <div className="hero-cta-group">
              <a href="#testimonios" className="btn btn-primary">Ver Historias Reales</a>
              <a href="#contexto" className="btn btn-secondary">Analizar Datos</a>
            </div>
          </div>
          <div className="hero-image-side">
            <div className="hero-image-wrapper">
              <img 
                src={getAssetUrl("hero.png")} 
                alt="Visualización de la desconexión digital" 
                className="hero-img-main"
              />
              <div className="image-overlay-card">
                <span className="card-accent-line"></span>
                <p className="card-text">"La tecnología debe ser un puente de integración, no un muro de aislamiento social."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTEXTO & ESTADÍSTICAS ── */}
      <section className="context-section" id="contexto">
        <div className="section-container">
          <div className="section-header-centered">
            <div className="section-tag">El Escenario Actual</div>
            <h2 className="section-title-large">La realidad en cifras frías</h2>
            <p className="section-subtitle-max">Detrás de la comodidad de la automatización global, millones de adultos mayores quedan completamente marginados de la infraestructura civil y financiera básica.</p>
          </div>

          <div className="stats-grid-layout">
            <StatCard 
              number="72%" 
              label="Exclusión Financiera" 
              description="De las personas mayores de 70 años manifiesta dificultades severas para realizar transferencias o revisar estados de cuenta de forma autónoma."
            />
            <StatCard 
              number="3 de 5" 
              label="Trámites Complejos" 
              description="Dependen de la asistencia directa de familiares o terceros para interactuar con plataformas gubernamentales o de salud digital."
            />
            <StatCard 
              number="+80pts" 
              label="Brecha de Usabilidad" 
              description="De distancia entre los patrones de diseño estándar actuales y los requerimientos cognitivos y visuales de la tercera edad."
            />
          </div>
        </div>
      </section>

      {/* ── PILARES DE LA EXCLUSIÓN ── */}
      <section className="pillars-section" id="pilares">
        <div className="section-container">
          <div className="pillars-wrapper">
            <div className="pillars-sticky-side">
              <div className="section-tag">Ejes del Problema</div>
              <h2 className="section-sticky-title">¿Por qué la tecnología actual aísla?</h2>
              <p className="section-sticky-desc">El analfabetismo digital no es una falta de capacidad de aprendizaje; es el resultado directo de una industria que diseña ignorando sistemáticamente los cambios biológicos y cognitivos naturales del envejecimiento.</p>
              <div className="sticky-decorator"></div>
            </div>

            <div className="pillars-scroll-side">
              <PillarCard 
                icon="👁️"
                title="Barreras de Diseño Visual Estricto"
                description="Interfaces con contrastes tipográficos deficientes, tamaños de fuente microscópicos por defecto y elementos interactivos demasiado pequeños que ignoran la pérdida natural de agudeza visual y motricidad fina."
              />
              <PillarCard 
                icon="🧠"
                title="Complejidad de Carga Cognitiva"
                description="Flujos de navegación laberínticos llenos de menús ocultos, cambios constantes en la arquitectura de la información debido a actualizaciones frecuentes y jerarquías visuales caóticas que confunden al usuario."
              />
              <PillarCard 
                icon="🔒"
                title="Ansiedad de Seguridad y Vulnerabilidad"
                description="Falta de entornos controlados y seguros para el aprendizaje. El miedo constante a cometer un error irreparable, ser víctima de estafas sofisticadas o bloquear accesos genera un estado de parálisis digital."
              />
            </div>
          </div>
        </div>
      </section>

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
              avatarLetter="F"
            />
            
            {/* Testimonio 2: Liliana */}
            <TestimonioCardExtenso
              imgSrc={getAssetUrl("abuela belen.jpeg")}
              paragraphs={testimonioLiliana}
              highlightQuote="Ahora no sé en qué creer. Antes dudaba de pocas cosas, ahora dudo de todo."
              name="Liliana (Gloria)"
              meta="70 años · Dueña de casa"
              avatarLetter="L"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo-area">
              <span className="logo-dot"></span>
              <span className="logo-text">BRECHA digital</span>
            </div>
            <p className="footer-tagline">Hacia un entorno tecnológico universal, accesible y profundamente humano.</p>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Proyecto Inclusión Digital. Diseñado con un enfoque de accesibilidad universal.</p>
          </div>
        </div>
      </footer>
    </div>
  );
