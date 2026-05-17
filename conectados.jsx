import { useState, useEffect, useRef } from "react";

const COLORS = {
  azulProfundo: "#1E3A5F",
  azulClaro: "#4A90E2",
  blancoCálido: "#F8FAFC",
  grisSuave: "#E5E7EB",
  verdeSuave: "#5FA777",
  rojoModerado: "#D9534F",
};

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --azul: #1E3A5F;
    --azul-claro: #4A90E2;
    --blanco: #F8FAFC;
    --gris: #E5E7EB;
    --gris-texto: #6B7280;
    --verde: #5FA777;
    --rojo: #D9534F;
    --sombra: 0 2px 16px rgba(30,58,95,0.08);
    --sombra-hover: 0 8px 32px rgba(30,58,95,0.14);
    --radio: 14px;
    --radio-sm: 8px;
    --transicion: 0.28s cubic-bezier(0.4,0,0.2,1);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Inter', sans-serif;
    background: var(--blanco);
    color: #1a2840;
    font-size: 16px;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }

  h1,h2,h3,h4,h5 {
    font-family: 'Poppins', sans-serif;
    line-height: 1.2;
    color: var(--azul);
  }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(28px); }
    to   { opacity:1; transform:translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }

  @keyframes wavePlay {
    0%,100% { transform: scaleY(0.4); }
    50%      { transform: scaleY(1); }
  }

  @keyframes pulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(95,167,119,0.35); }
    50%      { box-shadow: 0 0 0 10px rgba(95,167,119,0); }
  }

  .animate-up { animation: fadeUp 0.7s ease both; }
  .animate-in { animation: fadeIn 0.6s ease both; }

  /* NAV */
  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(248,250,252,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--gris);
    padding: 0 2rem;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: box-shadow var(--transicion);
  }
  .navbar.scrolled { box-shadow: var(--sombra); }
  .nav-logo {
    font-family:'Poppins',sans-serif;
    font-weight:700;
    font-size:1.15rem;
    color:var(--azul);
    display:flex;
    align-items:center;
    gap:0.5rem;
    text-decoration:none;
  }
  .nav-logo span { color: var(--azul-claro); }
  .nav-links { display:flex; gap:2rem; list-style:none; }
  .nav-links a {
    font-size:0.875rem;
    font-weight:500;
    color:#374151;
    text-decoration:none;
    transition: color var(--transicion);
  }
  .nav-links a:hover { color:var(--azul-claro); }
  .nav-cta {
    background: var(--azul);
    color:#fff !important;
    padding: 0.5rem 1.2rem;
    border-radius: 50px;
    font-size:0.875rem;
    font-weight:600;
    transition: background var(--transicion), transform var(--transicion) !important;
  }
  .nav-cta:hover { background: var(--azul-claro) !important; transform: translateY(-1px); }
  .nav-hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; }
  .nav-hamburger span { display:block; width:22px; height:2px; background:var(--azul); border-radius:2px; transition:var(--transicion); }

  /* HERO */
  .hero {
    min-height: calc(100vh - 64px);
    display: flex;
    align-items: center;
    padding: 5rem 2rem;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content:'';
    position:absolute;
    inset:0;
    background: radial-gradient(ellipse 70% 60% at 70% 50%, rgba(74,144,226,0.07) 0%, transparent 70%),
                radial-gradient(ellipse 40% 40% at 10% 80%, rgba(95,167,119,0.05) 0%, transparent 60%);
    pointer-events:none;
  }
  .hero-inner {
    max-width:1200px;
    margin:0 auto;
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:4rem;
    align-items:center;
    width:100%;
  }
  .hero-badge {
    display:inline-flex;
    align-items:center;
    gap:0.5rem;
    background:#EFF6FF;
    border:1px solid #BFDBFE;
    color:var(--azul-claro);
    font-size:0.78rem;
    font-weight:600;
    padding:0.35rem 0.9rem;
    border-radius:50px;
    margin-bottom:1.5rem;
    letter-spacing:0.03em;
  }
  .hero h1 {
    font-size:clamp(2.2rem,4vw,3.4rem);
    font-weight:800;
    color:var(--azul);
    margin-bottom:1.25rem;
    letter-spacing:-0.02em;
  }
  .hero h1 em {
    font-style:normal;
    color:var(--azul-claro);
    position:relative;
  }
  .hero-desc {
    font-size:1.1rem;
    color:#374151;
    max-width:480px;
    margin-bottom:2.5rem;
    line-height:1.75;
  }
  .hero-btns { display:flex; gap:1rem; flex-wrap:wrap; }
  .btn-primary {
    background:var(--azul);
    color:#fff;
    padding:0.85rem 2rem;
    border-radius:50px;
    font-family:'Poppins',sans-serif;
    font-weight:600;
    font-size:0.95rem;
    border:none;
    cursor:pointer;
    text-decoration:none;
    display:inline-flex;
    align-items:center;
    gap:0.5rem;
    transition: transform var(--transicion), background var(--transicion), box-shadow var(--transicion);
    box-shadow: 0 4px 14px rgba(30,58,95,0.25);
  }
  .btn-primary:hover { transform:translateY(-2px); background:var(--azul-claro); box-shadow: 0 8px 24px rgba(74,144,226,0.35); }
  .btn-secondary {
    background:#fff;
    color:var(--azul);
    padding:0.85rem 2rem;
    border-radius:50px;
    font-family:'Poppins',sans-serif;
    font-weight:600;
    font-size:0.95rem;
    border:2px solid var(--gris);
    cursor:pointer;
    text-decoration:none;
    display:inline-flex;
    align-items:center;
    gap:0.5rem;
    transition: transform var(--transicion), border-color var(--transicion), box-shadow var(--transicion);
  }
  .btn-secondary:hover { transform:translateY(-2px); border-color:var(--verde); box-shadow: 0 4px 16px rgba(95,167,119,0.2); }
  .hero-stats {
    display:flex;
    gap:2rem;
    margin-top:3rem;
    padding-top:2rem;
    border-top:1px solid var(--gris);
  }
  .hero-stat-num {
    font-family:'Poppins',sans-serif;
    font-size:1.6rem;
    font-weight:800;
    color:var(--azul);
  }
  .hero-stat-label { font-size:0.8rem; color:var(--gris-texto); margin-top:0.1rem; }
  .hero-visual {
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .hero-illustration {
    width:100%;
    max-width:480px;
    aspect-ratio:1;
    position:relative;
  }

  /* SECTION WRAPPERS */
  .section { padding:6rem 2rem; }
  .section-inner { max-width:1200px; margin:0 auto; }
  .section-tag {
    font-size:0.75rem;
    font-weight:700;
    letter-spacing:0.12em;
    text-transform:uppercase;
    color:var(--azul-claro);
    margin-bottom:0.75rem;
  }
  .section-title {
    font-size:clamp(1.7rem,3vw,2.5rem);
    font-weight:700;
    color:var(--azul);
    margin-bottom:1rem;
    letter-spacing:-0.01em;
  }
  .section-desc {
    font-size:1.05rem;
    color:#4B5563;
    max-width:560px;
    line-height:1.75;
  }
  .section-alt { background:#f3f6fb; }

  /* STATS SECTION */
  .stats-grid {
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
    gap:1.5rem;
    margin-top:3.5rem;
  }
  .stat-card {
    background:#fff;
    border:1px solid var(--gris);
    border-radius:var(--radio);
    padding:1.75rem 1.5rem;
    transition: transform var(--transicion), box-shadow var(--transicion);
  }
  .stat-card:hover { transform:translateY(-4px); box-shadow:var(--sombra-hover); }
  .stat-card-num {
    font-family:'Poppins',sans-serif;
    font-size:2.5rem;
    font-weight:800;
    color:var(--azul);
    margin-bottom:0.25rem;
  }
  .stat-card-label { font-size:0.9rem; color:#4B5563; line-height:1.5; }
  .stat-card-accent { width:32px; height:3px; background:var(--azul-claro); border-radius:2px; margin-bottom:1rem; }

  /* EDITORIAL BLOCK */
  .editorial-grid {
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:4rem;
    align-items:center;
    margin-top:4rem;
  }
  .editorial-grid.reverse { direction:rtl; }
  .editorial-grid.reverse > * { direction:ltr; }
  .editorial-text h3 {
    font-size:1.6rem;
    font-weight:700;
    margin-bottom:1rem;
  }
  .editorial-text p { color:#4B5563; line-height:1.8; margin-bottom:1rem; }
  .editorial-visual {
    background:linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%);
    border-radius:20px;
    aspect-ratio:4/3;
    display:flex;
    align-items:center;
    justify-content:center;
    border:1px solid #BFDBFE;
    overflow:hidden;
    position:relative;
  }

  /* TEMAS CARDS */
  .temas-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
    gap:1.5rem;
    margin-top:3.5rem;
  }
  .tema-card {
    background:#fff;
    border:1px solid var(--gris);
    border-radius:var(--radio);
    padding:2rem;
    cursor:pointer;
    transition: transform var(--transicion), box-shadow var(--transicion), border-color var(--transicion);
    position:relative;
    overflow:hidden;
  }
  .tema-card::after {
    content:'';
    position:absolute;
    bottom:0;left:0;right:0;
    height:3px;
    background:var(--azul-claro);
    transform:scaleX(0);
    transform-origin:left;
    transition:transform var(--transicion);
  }
  .tema-card:hover { transform:translateY(-5px); box-shadow:var(--sombra-hover); border-color:transparent; }
  .tema-card:hover::after { transform:scaleX(1); }
  .tema-icon {
    width:48px; height:48px;
    border-radius:12px;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-bottom:1.25rem;
    font-size:1.4rem;
  }
  .tema-card h3 { font-size:1.1rem; font-weight:700; margin-bottom:0.5rem; }
  .tema-card p { font-size:0.875rem; color:#6B7280; line-height:1.6; }
  .tema-link {
    display:inline-flex;
    align-items:center;
    gap:0.3rem;
    color:var(--azul-claro);
    font-size:0.82rem;
    font-weight:600;
    margin-top:1rem;
    text-decoration:none;
    transition:gap var(--transicion);
  }
  .tema-card:hover .tema-link { gap:0.6rem; }

  /* TRANSMEDIA */
  .transmedia-timeline {
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
    gap:0;
    margin-top:4rem;
    position:relative;
  }
  .transmedia-timeline::before {
    content:'';
    position:absolute;
    top:40px;left:0;right:0;
    height:2px;
    background:linear-gradient(90deg,var(--gris),var(--azul-claro),var(--gris));
  }
  .transmedia-item {
    display:flex;
    flex-direction:column;
    align-items:center;
    text-align:center;
    padding:0 1rem;
    padding-top:0;
    position:relative;
  }
  .transmedia-dot {
    width:80px;height:80px;
    border-radius:50%;
    background:#fff;
    border:2px solid var(--gris);
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:1.6rem;
    margin-bottom:1.5rem;
    position:relative;
    z-index:2;
    box-shadow:var(--sombra);
    transition: transform var(--transicion), border-color var(--transicion), box-shadow var(--transicion);
    cursor:default;
  }
  .transmedia-item:hover .transmedia-dot { transform:translateY(-4px) scale(1.05); border-color:var(--azul-claro); box-shadow:var(--sombra-hover); }
  .transmedia-item h3 { font-size:1rem; font-weight:700; margin-bottom:0.4rem; }
  .transmedia-item p { font-size:0.82rem; color:#6B7280; line-height:1.6; }

  /* PODCAST PLAYER */
  .podcast-grid {
    display:grid;
    gap:1rem;
    margin-top:3rem;
  }
  .podcast-card {
    background:#fff;
    border:1px solid var(--gris);
    border-radius:var(--radio);
    padding:1.25rem 1.5rem;
    display:flex;
    align-items:center;
    gap:1.25rem;
    cursor:pointer;
    transition: box-shadow var(--transicion), border-color var(--transicion);
  }
  .podcast-card:hover { box-shadow:var(--sombra-hover); border-color:#BFDBFE; }
  .podcast-card.playing { border-color:var(--azul-claro); background:#EFF6FF; }
  .podcast-play {
    width:44px;height:44px;
    border-radius:50%;
    background:var(--azul);
    color:#fff;
    border:none;
    cursor:pointer;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-shrink:0;
    transition: background var(--transicion), transform var(--transicion);
    font-size:1rem;
  }
  .podcast-play:hover { background:var(--azul-claro); transform:scale(1.05); }
  .podcast-card.playing .podcast-play { background:var(--verde); animation: pulse 2s infinite; }
  .podcast-info { flex:1; }
  .podcast-num { font-size:0.72rem; font-weight:700; letter-spacing:0.08em; color:var(--azul-claro); text-transform:uppercase; }
  .podcast-title { font-family:'Poppins',sans-serif; font-size:0.95rem; font-weight:600; color:var(--azul); margin:0.15rem 0; }
  .podcast-desc { font-size:0.8rem; color:#6B7280; }
  .podcast-waveform {
    display:flex;
    align-items:center;
    gap:2px;
    height:32px;
  }
  .waveform-bar {
    width:3px;
    border-radius:2px;
    background:var(--gris);
    transition: background var(--transicion);
  }
  .podcast-card.playing .waveform-bar { background:var(--azul-claro); }
  .podcast-dur { font-size:0.78rem; color:#9CA3AF; font-weight:500; white-space:nowrap; }

  /* WHATSAPP */
  .wa-section {
    background:linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%);
    border:1px solid #bbf7d0;
    border-radius:20px;
    padding:3rem;
    margin-top:3rem;
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:3rem;
    align-items:center;
  }
  .wa-chat {
    background:#fff;
    border-radius:16px;
    padding:1.25rem;
    box-shadow:var(--sombra);
    border:1px solid var(--gris);
  }
  .wa-header {
    display:flex;
    align-items:center;
    gap:0.75rem;
    padding-bottom:1rem;
    border-bottom:1px solid var(--gris);
    margin-bottom:1rem;
  }
  .wa-avatar {
    width:38px;height:38px;
    border-radius:50%;
    background:var(--verde);
    display:flex;
    align-items:center;
    justify-content:center;
    color:#fff;
    font-weight:700;
    font-size:0.9rem;
  }
  .wa-name { font-family:'Poppins',sans-serif; font-size:0.9rem; font-weight:600; color:var(--azul); }
  .wa-status { font-size:0.72rem; color:var(--verde); }
  .wa-messages { display:flex; flex-direction:column; gap:0.75rem; }
  .wa-msg {
    padding:0.6rem 0.9rem;
    border-radius:12px;
    font-size:0.82rem;
    line-height:1.5;
    max-width:85%;
    position:relative;
  }
  .wa-msg.received {
    background:#f3f4f6;
    color:#1f2937;
    align-self:flex-start;
    border-bottom-left-radius:4px;
  }
  .wa-msg.sent {
    background:#dcf8c6;
    color:#1f2937;
    align-self:flex-end;
    border-bottom-right-radius:4px;
  }
  .wa-msg-time { font-size:0.65rem; color:#9CA3AF; margin-top:0.25rem; text-align:right; }
  .wa-info h3 { font-size:1.4rem; font-weight:700; margin-bottom:0.75rem; }
  .wa-info p { font-size:0.9rem; color:#374151; line-height:1.75; margin-bottom:1.5rem; }
  .wa-features { list-style:none; margin-bottom:2rem; }
  .wa-features li {
    display:flex;
    align-items:flex-start;
    gap:0.5rem;
    font-size:0.875rem;
    color:#374151;
    padding:0.4rem 0;
  }
  .wa-features li::before { content:'✓'; color:var(--verde); font-weight:700; flex-shrink:0; margin-top:0.1rem; }
  .btn-wa {
    background:#25D366;
    color:#fff;
    padding:0.85rem 2rem;
    border-radius:50px;
    font-family:'Poppins',sans-serif;
    font-weight:600;
    font-size:0.95rem;
    border:none;
    cursor:pointer;
    display:inline-flex;
    align-items:center;
    gap:0.6rem;
    transition: transform var(--transicion), box-shadow var(--transicion);
    box-shadow:0 4px 14px rgba(37,211,102,0.3);
  }
  .btn-wa:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(37,211,102,0.4); }

  /* RECURSOS */
  .recursos-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
    gap:1.5rem;
    margin-top:3rem;
  }
  .recurso-card {
    background:#fff;
    border:1px solid var(--gris);
    border-radius:var(--radio);
    padding:1.5rem;
    display:flex;
    flex-direction:column;
    gap:0.75rem;
    transition: transform var(--transicion), box-shadow var(--transicion);
    cursor:pointer;
  }
  .recurso-card:hover { transform:translateY(-4px); box-shadow:var(--sombra-hover); }
  .recurso-type {
    font-size:0.7rem;
    font-weight:700;
    letter-spacing:0.1em;
    text-transform:uppercase;
    padding:0.25rem 0.6rem;
    border-radius:4px;
    display:inline-block;
    width:fit-content;
  }
  .recurso-type.pdf { background:#FEF2F2; color:var(--rojo); }
  .recurso-type.guia { background:#EFF6FF; color:var(--azul-claro); }
  .recurso-type.video { background:#F0FDF4; color:var(--verde); }
  .recurso-card h3 { font-size:0.95rem; font-weight:600; color:var(--azul); }
  .recurso-card p { font-size:0.82rem; color:#6B7280; flex:1; }
  .recurso-dl {
    display:inline-flex;
    align-items:center;
    gap:0.4rem;
    font-size:0.8rem;
    font-weight:600;
    color:var(--azul-claro);
    text-decoration:none;
    margin-top:0.5rem;
  }

  /* ALERTA CARD */
  .alert-card {
    background:#FEF2F2;
    border:1px solid #FECACA;
    border-left:4px solid var(--rojo);
    border-radius:var(--radio);
    padding:1.25rem 1.5rem;
    display:flex;
    gap:1rem;
    align-items:flex-start;
    margin-top:2rem;
  }
  .alert-icon { color:var(--rojo); font-size:1.3rem; flex-shrink:0; }
  .alert-card p { font-size:0.875rem; color:#7F1D1D; line-height:1.6; }
  .alert-card strong { color:#991B1B; }

  /* TIP CARD */
  .tip-card {
    background:#F0FDF4;
    border:1px solid #BBF7D0;
    border-left:4px solid var(--verde);
    border-radius:var(--radio);
    padding:1.25rem 1.5rem;
    display:flex;
    gap:1rem;
    align-items:flex-start;
    margin-top:1rem;
  }
  .tip-icon { color:var(--verde); font-size:1.3rem; flex-shrink:0; }
  .tip-card p { font-size:0.875rem; color:#14532D; line-height:1.6; }

  /* FOOTER */
  footer {
    background:var(--azul);
    color:#CBD5E1;
    padding:4rem 2rem 2rem;
  }
  .footer-inner {
    max-width:1200px;
    margin:0 auto;
  }
  .footer-top {
    display:grid;
    grid-template-columns:2fr 1fr 1fr 1fr;
    gap:3rem;
    padding-bottom:3rem;
    border-bottom:1px solid rgba(255,255,255,0.1);
    margin-bottom:2rem;
  }
  .footer-brand-name {
    font-family:'Poppins',sans-serif;
    font-size:1.2rem;
    font-weight:700;
    color:#fff;
    margin-bottom:0.75rem;
  }
  .footer-brand-desc { font-size:0.85rem; line-height:1.7; margin-bottom:1.25rem; }
  .footer-col h4 { font-family:'Poppins',sans-serif; font-size:0.85rem; font-weight:600; color:#fff; margin-bottom:1rem; }
  .footer-col ul { list-style:none; }
  .footer-col li { margin-bottom:0.5rem; }
  .footer-col a { color:#94A3B8; font-size:0.82rem; text-decoration:none; transition:color var(--transicion); }
  .footer-col a:hover { color:#fff; }
  .footer-bottom {
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size:0.78rem;
    color:#64748B;
    flex-wrap:wrap;
    gap:1rem;
  }
  .footer-badge {
    display:inline-flex;
    align-items:center;
    gap:0.4rem;
    background:rgba(255,255,255,0.07);
    border:1px solid rgba(255,255,255,0.1);
    padding:0.3rem 0.8rem;
    border-radius:50px;
    font-size:0.75rem;
    color:#94A3B8;
  }

  /* RESPONSIVE */
  @media(max-width:900px) {
    .hero-inner { grid-template-columns:1fr; gap:3rem; }
    .hero-visual { order:-1; }
    .hero-illustration { max-width:320px; margin:0 auto; }
    .editorial-grid { grid-template-columns:1fr; gap:2rem; }
    .editorial-grid.reverse { direction:ltr; }
    .wa-section { grid-template-columns:1fr; }
    .transmedia-timeline::before { display:none; }
    .transmedia-timeline { grid-template-columns:repeat(2,1fr); }
    .footer-top { grid-template-columns:1fr 1fr; }
  }

  @media(max-width:640px) {
    .section { padding:4rem 1.25rem; }
    .hero { padding:3rem 1.25rem; }
    .navbar { padding:0 1.25rem; }
    .nav-links { display:none; }
    .nav-hamburger { display:flex; }
    .transmedia-timeline { grid-template-columns:1fr; }
    .footer-top { grid-template-columns:1fr; gap:2rem; }
    .wa-section { padding:2rem; }
    .hero-stats { flex-wrap:wrap; gap:1.25rem; }
  }
`;

// ── SVG ILLUSTRATION ──────────────────────────────────────────────────────────
function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:440}}>
      {/* Background circle */}
      <circle cx="240" cy="240" r="200" fill="#EFF6FF" />
      <circle cx="240" cy="240" r="160" fill="#DBEAFE" opacity="0.5" />

      {/* Phone */}
      <rect x="185" y="140" width="110" height="190" rx="16" fill="#1E3A5F" />
      <rect x="192" y="150" width="96" height="165" rx="10" fill="#F8FAFC" />
      <rect x="225" y="137" width="30" height="5" rx="3" fill="#4A90E2" />

      {/* Screen content */}
      <rect x="202" y="162" width="76" height="8" rx="4" fill="#E5E7EB" />
      <rect x="202" y="176" width="55" height="6" rx="3" fill="#BFDBFE" />
      <rect x="202" y="192" width="76" height="40" rx="6" fill="#EFF6FF" />
      <rect x="208" y="199" width="12" height="12" rx="3" fill="#4A90E2" />
      <rect x="225" y="200" width="40" height="5" rx="3" fill="#CBD5E1" />
      <rect x="225" y="208" width="28" height="4" rx="2" fill="#E5E7EB" />

      <rect x="202" y="240" width="76" height="40" rx="6" fill="#F0FDF4" />
      <rect x="208" y="247" width="12" height="12" rx="3" fill="#5FA777" />
      <rect x="225" y="248" width="40" height="5" rx="3" fill="#CBD5E1" />
      <rect x="225" y="256" width="28" height="4" rx="2" fill="#E5E7EB" />

      <rect x="202" y="288" width="76" height="18" rx="9" fill="#1E3A5F" />
      <rect x="218" y="293" width="44" height="7" rx="3" fill="#fff" />

      {/* Floating cards */}
      <rect x="60" y="160" width="100" height="60" rx="12" fill="#fff" style={{filter:'drop-shadow(0 4px 12px rgba(30,58,95,0.1))'}} />
      <rect x="72" y="173" width="10" height="10" rx="3" fill="#5FA777" />
      <rect x="87" y="174" width="55" height="5" rx="3" fill="#E5E7EB" />
      <rect x="87" y="183" width="38" height="4" rx="2" fill="#F3F4F6" />
      <rect x="72" y="190" width="76" height="20" rx="6" fill="#F0FDF4" />
      <rect x="78" y="196" width="50" height="4" rx="2" fill="#BBF7D0" />
      <rect x="78" y="203" width="35" height="3" rx="1.5" fill="#D1FAE5" />

      <rect x="320" y="200" width="105" height="65" rx="12" fill="#fff" style={{filter:'drop-shadow(0 4px 12px rgba(30,58,95,0.1))'}} />
      <rect x="332" y="213" width="10" height="10" rx="3" fill="#D9534F" />
      <rect x="347" y="214" width="55" height="5" rx="3" fill="#E5E7EB" />
      <rect x="347" y="223" width="35" height="4" rx="2" fill="#F3F4F6" />
      <rect x="332" y="232" width="82" height="24" rx="6" fill="#FEF2F2" />
      <rect x="338" y="238" width="55" height="4" rx="2" fill="#FECACA" />
      <rect x="338" y="246" width="40" height="3" rx="1.5" fill="#FEE2E2" />

      {/* Radio waves */}
      <circle cx="350" cy="140" r="8" fill="#4A90E2" opacity="0.15" />
      <circle cx="350" cy="140" r="16" stroke="#4A90E2" strokeWidth="1.5" opacity="0.2" fill="none" />
      <circle cx="350" cy="140" r="24" stroke="#4A90E2" strokeWidth="1" opacity="0.1" fill="none" />
      <circle cx="350" cy="140" r="6" fill="#4A90E2" />

      {/* Signal dots */}
      <circle cx="110" cy="130" r="5" fill="#5FA777" />
      <circle cx="380" cy="310" r="5" fill="#4A90E2" />
      <circle cx="90" cy="330" r="4" fill="#1E3A5F" opacity="0.3" />

      {/* Bottom people shapes */}
      <ellipse cx="180" cy="370" rx="22" ry="22" fill="#BFDBFE" />
      <ellipse cx="180" cy="355" rx="10" ry="10" fill="#93C5FD" />
      <ellipse cx="240" cy="365" rx="22" ry="22" fill="#BBF7D0" />
      <ellipse cx="240" cy="350" rx="10" ry="10" fill="#6EE7B7" />
      <ellipse cx="300" cy="370" rx="22" ry="22" fill="#BFDBFE" />
      <ellipse cx="300" cy="355" rx="10" ry="10" fill="#93C5FD" />
    </svg>
  );
}

// ── ICONS ─────────────────────────────────────────────────────────────────────
const icons = {
  shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  alertTriangle: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  newspaper: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-1.981 1.819A2 2 0 0 1 4 22z"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6z"/>
    </svg>
  ),
  key: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>
    </svg>
  ),
  smartphone: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  fileText: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  arrowRight: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  play: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  pause: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
    </svg>
  ),
  download: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  whatsapp: "💬",
  radio: "📻",
  qr: "📲",
  web: "🌐",
  info: "ℹ️",
  checkCircle: "✅",
};

// ── WAVEFORM ──────────────────────────────────────────────────────────────────
function Waveform({ playing }) {
  const heights = [8,14,20,12,24,18,10,22,16,8,20,14,10,18,24,12,16,8,20,14];
  return (
    <div className="podcast-waveform">
      {heights.map((h, i) => (
        <div
          key={i}
          className="waveform-bar"
          style={{
            height: h,
            animationName: playing ? 'wavePlay' : 'none',
            animationDuration: `${0.4 + (i % 5) * 0.1}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: `${i * 0.04}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [playingEp, setPlayingEp] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const temas = [
    { icon: icons.shield, color: "#EFF6FF", iconColor: "#4A90E2", title: "Seguridad Digital", desc: "Aprende a proteger tus datos personales y cuentas en línea con pasos simples y claros.", label: "Ver guía" },
    { icon: icons.alertTriangle, color: "#FEF2F2", iconColor: "#D9534F", title: "Estafas Online", desc: "Conoce las estafas más comunes por internet y cómo identificarlas antes de que sea tarde.", label: "Ver guía" },
    { icon: icons.newspaper, color: "#FFF7ED", iconColor: "#D97706", title: "Noticias Falsas", desc: "Herramientas prácticas para verificar la información y no compartir contenido falso.", label: "Ver guía" },
    { icon: icons.key, color: "#F5F3FF", iconColor: "#7C3AED", title: "Contraseñas Seguras", desc: "Cómo crear y recordar contraseñas fuertes para proteger tus cuentas importantes.", label: "Ver guía" },
    { icon: icons.smartphone, color: "#F0FDF4", iconColor: "#5FA777", title: "Uso del Celular", desc: "Guías básicas para sacarle el máximo provecho a tu teléfono de manera segura.", label: "Ver guía" },
    { icon: icons.fileText, color: "#EFF6FF", iconColor: "#0EA5E9", title: "Trámites Digitales", desc: "Paso a paso para realizar trámites en plataformas del Estado desde casa.", label: "Ver guía" },
  ];

  const episodes = [
    { num: "EP 01", title: "¿Qué es una estafa digital y cómo reconocerla?", desc: "Casos reales del Maule · Radio Maule", dur: "12:34" },
    { num: "EP 02", title: "Contraseñas: tu primera línea de defensa", desc: "Consejo práctico en 10 minutos · Radio Bío-Bío", dur: "10:18" },
    { num: "EP 03", title: "Noticias falsas: cómo no caer en la trampa", desc: "Verificación ciudadana · Radio Maule", dur: "15:02" },
    { num: "EP 04", title: "Clave Única: tramita desde tu casa", desc: "Trámites del Estado · Radio Universidad", dur: "09:45" },
  ];

  const recursos = [
    { type: "pdf", typeLabel: "PDF", title: "Guía: Cómo crear una contraseña segura", desc: "Paso a paso ilustrado para crear contraseñas fuertes. Ideal para imprimir.", pages: "8 páginas" },
    { type: "guia", typeLabel: "GUÍA", title: "Reconociendo estafas por WhatsApp", desc: "Los 7 tipos de estafa más comunes en Chile y cómo evitarlos.", pages: "12 páginas" },
    { type: "video", typeLabel: "VIDEO", title: "Tutorial: Activar Clave Única en 5 pasos", desc: "Video corto con instrucciones claras para adultos mayores.", pages: "7 min" },
    { type: "pdf", typeLabel: "PDF", title: "Diccionario Digital Básico", desc: "Los 30 términos digitales que deberías conocer, explicados sin tecnicismos.", pages: "6 páginas" },
    { type: "guia", typeLabel: "GUÍA", title: "Privacidad en Facebook: configuración segura", desc: "Guía visual para revisar y mejorar tu privacidad en redes sociales.", pages: "10 páginas" },
    { type: "video", typeLabel: "VIDEO", title: "Trámites en ChileAtiende desde el celular", desc: "Tutorial grabado con pantalla real de la plataforma oficial.", pages: "11 min" },
  ];

  const transmediaItems = [
    { icon: icons.qr, title: "Folletos QR", desc: "Materiales impresos distribuidos en consultorios, municipios y ferias del Maule con código QR para acceder al contenido digital." },
    { icon: icons.radio, title: "Cápsulas Radiales", desc: "Microprogramas de 10 minutos emitidos en radios locales del Maule, con consejos prácticos narrados de forma accesible." },
    { icon: icons.whatsapp, title: "Comunidad WhatsApp", desc: "Grupo activo de difusión con tips semanales, alertas de estafas y respuesta a preguntas de la comunidad." },
    { icon: icons.web, title: "Sitio Web", desc: "Plataforma central con recursos descargables, guías en video, episodios de radio y acceso a todos los contenidos." },
  ];

  return (
    <>
      <style>{style}</style>

      {/* ── NAVBAR ── */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <a className="nav-logo" href="#">
          <span>Conectados</span> · Maule
        </a>
        <ul className="nav-links">
          <li><a href="#temas">Temas</a></li>
          <li><a href="#capsulas">Cápsulas</a></li>
          <li><a href="#comunidad">Comunidad</a></li>
          <li><a href="#recursos">Recursos</a></li>
          <li><a href="#comunidad" className="nav-cta">Unirse</a></li>
        </ul>
        <div className="nav-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span /><span /><span />
        </div>
      </nav>

      {mobileOpen && (
        <div style={{background:'#fff',borderBottom:'1px solid #E5E7EB',padding:'1rem 1.5rem',zIndex:99,position:'sticky',top:64}}>
          {["Temas","Cápsulas","Comunidad","Recursos"].map(l => (
            <a key={l} href={`#${l.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"")}`}
               style={{display:'block',padding:'0.6rem 0',color:'#374151',textDecoration:'none',fontWeight:500,fontSize:'0.9rem'}}
               onClick={()=>setMobileOpen(false)}>{l}</a>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="animate-up">
            <div className="hero-badge">
               Universidad Autónoma
            </div>
            <h1>
              <em>Conectados:</em> Alfabetización Digital<br />para la Comunidad
            </h1>
            <p className="hero-desc">
              Un proyecto educativo hecho para personas reales en la Región del Maule.
              Aprendemos juntos a usar internet con seguridad, sin tecnicismos, sin miedo.
            </p>
            <div className="hero-btns">
              <a href="#temas" className="btn-primary">
                Aprender ahora {icons.arrowRight}
              </a>
              <a href="#comunidad" className="btn-secondary">
                {icons.whatsapp} Unirse a WhatsApp
              </a>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">+1.200</div>
                <div className="hero-stat-label">personas alcanzadas<br/>en el Maule</div>
              </div>
              <div>
                <div className="hero-stat-num">4</div>
                <div className="hero-stat-label">plataformas<br/>transmedia</div>
              </div>
              <div>
                <div className="hero-stat-num">6</div>
                <div className="hero-stat-label">temas de<br/>alfabetización</div>
              </div>
            </div>
          </div>
          <div className="hero-visual animate-in">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* ── ¿POR QUÉ? ── */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-tag">El problema</div>
          <h2 className="section-title">La brecha digital en el Maule es real</h2>
          <p className="section-desc">
            Cientos de miles de personas en nuestra región usan internet, pero sin las herramientas para hacerlo con seguridad.
            Los adultos mayores, las zonas rurales y los sectores más vulnerables son los más expuestos.
          </p>

          <div className="stats-grid">
            {[
              { num: "42%", label: "de los adultos mayores en Chile nunca ha realizado un trámite en línea" },
              { num: "62%", label: "de las comunas del Maule son rurales con conectividad limitada" },
              { num: "3 de 4", label: "personas no saben identificar una estafa digital antes de ser víctima" },
              { num: "+60%", label: "de los delitos informáticos en Chile afectan a personas sobre 50 años" },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-card-accent" />
                <div className="stat-card-num">{s.num}</div>
                <div className="stat-card-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="alert-card">
            <span className="alert-icon">⚠️</span>
            <p>
              <strong>Alerta:</strong> Las estafas por WhatsApp y correo electrónico aumentaron un <strong>87% en Chile durante 2023</strong>.
              Las personas mayores son las más vulnerables porque nadie les enseñó a identificarlas.
            </p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">💡</span>
            <p>
              <strong>Buenas noticias:</strong> Con información clara y accesible, cualquier persona puede aprender a protegerse.
              Ese es exactamente el objetivo de <strong>Conectados</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ── TEMAS ── */}
      <section className="section" id="temas">
        <div className="section-inner">
          <div className="section-tag">Contenidos</div>
          <h2 className="section-title">Temas que importan</h2>
          <p className="section-desc">
            Seis áreas clave de alfabetización digital, explicadas en lenguaje simple, con guías prácticas y sin tecnicismos.
          </p>
          <div className="temas-grid">
            {temas.map((t, i) => (
              <div key={i} className="tema-card">
                <div className="tema-icon" style={{background: t.color, color: t.iconColor}}>
                  {t.icon}
                </div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
                <a className="tema-link" href="#">
                  {t.label} {icons.arrowRight}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRANSMEDIA ── */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-tag">Proyecto transmedia</div>
          <h2 className="section-title">Un proyecto conectado en todos los canales</h2>
          <p className="section-desc">
            Conectados no es solo una web. Es una experiencia que llega donde la gente está:
            en la radio, en papel, en WhatsApp y en pantalla.
          </p>

          <div className="transmedia-timeline">
            {transmediaItems.map((item, i) => (
              <div key={i} className="transmedia-item">
                <div className="transmedia-dot" style={{fontSize:'2rem'}}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÁPSULAS ── */}
      <section className="section" id="capsulas">
        <div className="section-inner">
          <div className="section-tag">Radio · Podcast</div>
          <h2 className="section-title">Cápsulas radiales</h2>
          <p className="section-desc">
            Episodios breves y claros, pensados para escuchar en cualquier momento.
            Disponibles en radios locales del Maule y aquí mismo.
          </p>

          <div className="podcast-grid">
            {episodes.map((ep, i) => {
              const isPlaying = playingEp === i;
              return (
                <div key={i} className={`podcast-card${isPlaying ? " playing" : ""}`}
                     onClick={() => setPlayingEp(isPlaying ? null : i)}>
                  <button className="podcast-play" aria-label={isPlaying ? "Pausar" : "Reproducir"}>
                    {isPlaying ? icons.pause : icons.play}
                  </button>
                  <div className="podcast-info">
                    <div className="podcast-num">{ep.num}</div>
                    <div className="podcast-title">{ep.title}</div>
                    <div className="podcast-desc">{ep.desc}</div>
                  </div>
                  <Waveform playing={isPlaying} />
                  <span className="podcast-dur">{ep.dur}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP ── */}
      <section className="section section-alt" id="comunidad">
        <div className="section-inner">
          <div className="section-tag">Comunidad</div>
          <h2 className="section-title">Únete a la comunidad</h2>
          <p className="section-desc">
            Un espacio real donde se comparten consejos, alertas de estafas y respuestas a tus dudas.
          </p>

          <div className="wa-section">
            <div className="wa-info">
              <h3>Aprende con tu comunidad</h3>
              <p>
                Más de 800 personas del Maule ya son parte de nuestra comunidad de WhatsApp.
                Recibe consejos semanales, alertas de estafas en tu zona y responde tus dudas con el equipo.
              </p>
              <ul className="wa-features">
                <li>Tips semanales de seguridad digital</li>
                <li>Alertas de estafas detectadas en la región</li>
                <li>Respuesta a preguntas del grupo</li>
                <li>Contenido en lenguaje claro y accesible</li>
                <li>Sin spam ni publicidad</li>
              </ul>
              <button className="btn-wa">
                💬 Unirse al grupo de WhatsApp
              </button>
            </div>

            <div className="wa-chat">
              <div className="wa-header">
                <div className="wa-avatar">C</div>
                <div>
                  <div className="wa-name">Conectados Maule</div>
                  <div className="wa-status">● Grupo activo · 847 miembros</div>
                </div>
              </div>
              <div className="wa-messages">
                {[
                  { text: "🔐 ALERTA SEGURIDAD: Están circulando mensajes falsos del Banco Estado. No hagas clic en ningún enlace. Tu banco NUNCA te pide contraseñas por WhatsApp.", sent: false, time: "09:14" },
                  { text: "Gracias por el aviso, mi vecina estuvo a punto de caer en eso.", sent: true, time: "09:16" },
                  { text: "💡 Consejo de hoy: Activa la verificación en dos pasos en WhatsApp. Ve a Ajustes → Cuenta → Verificación en dos pasos. ¡Solo toma 2 minutos!", sent: false, time: "10:30" },
                  { text: "¿Pueden hacer una guía para entender los correos del SII?", sent: true, time: "10:45" },
                  { text: "¡Buena idea! La subimos esta semana 📋", sent: false, time: "10:47" },
                ].map((m, i) => (
                  <div key={i} className={`wa-msg ${m.sent ? "sent" : "received"}`}>
                    {m.text}
                    <div className="wa-msg-time">{m.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RECURSOS ── */}
      <section className="section" id="recursos">
        <div className="section-inner">
          <div className="section-tag">Biblioteca</div>
          <h2 className="section-title">Recursos descargables</h2>
          <p className="section-desc">
            Guías, folletos y tutoriales diseñados para imprimir o compartir.
            Todos gratuitos, en lenguaje simple.
          </p>
          <div className="recursos-grid">
            {recursos.map((r, i) => (
              <div key={i} className="recurso-card">
                <span className={`recurso-type ${r.type}`}>{r.typeLabel}</span>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <span style={{fontSize:'0.75rem',color:'#9CA3AF'}}>{r.pages}</span>
                <a className="recurso-dl" href="#">
                  {icons.download} Descargar gratis
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-brand-name">Conectados · Maule</div>
              <p className="footer-brand-desc">
                Proyecto transmedia de alfabetización digital para la Región del Maule.
                Una iniciativa universitaria pensada para las personas reales de nuestra comunidad.
              </p>
              <div className="footer-badge">
                🎓 Universidad Autónoma · Periodismo
              </div>
            </div>
            <div className="footer-col">
              <h4>Temas</h4>
              <ul>
                {["Seguridad digital","Estafas online","Noticias falsas","Contraseñas","Uso del celular","Trámites digitales"].map(l => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Recursos</h4>
              <ul>
                {["Guías PDF","Cápsulas radiales","Tutoriales video","Comunidad WhatsApp","Folletos imprimibles"].map(l => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Proyecto</h4>
              <ul>
                {["Sobre el proyecto","Equipo","Metodología","Contacto","Prensa"].map(l => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2024 Conectados Maule · Universidad Autónoma · Proyecto académico sin fines de lucro</span>
            <span>Diseñado con 💙 para la comunidad del Maule</span>
          </div>
        </div>
      </footer>
    </>
  );
}
