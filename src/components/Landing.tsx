import { useEffect } from 'react';
import { storage } from '../utils/storage';
import { ga4Tracking } from '../utils/ga4Tracking';

interface LandingProps {
    onNavigate: (page: string) => void;
}

export default function Landing({ onNavigate }: LandingProps) {
    // ========================================
    // ✅ SISTEMA DE CAPTURA DE UTMs (PRESERVADO)
    // ========================================
    const captureUTMs = () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const utms: Record<string, string> = {};

            const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
            utmParams.forEach(param => {
                const value = urlParams.get(param);
                if (value) utms[param] = value;
            });

            const clickIds = ['fbclid', 'gclid', 'ttclid'];
            clickIds.forEach(param => {
                const value = urlParams.get(param);
                if (value) utms[param] = value;
            });

            if (Object.keys(utms).length > 0) {
                localStorage.setItem('quiz_utms', JSON.stringify(utms));
                console.log('✅ UTMs capturadas:', utms);
            } else {
                console.log('ℹ️ Nenhuma UTM encontrada na URL');
            }
        } catch (error) {
            console.error('❌ Erro ao capturar UTMs:', error);
        }
    };

    useEffect(() => {
        // ✅ CAPTURA UTMs ASSIM QUE A PÁGINA CARREGA
        captureUTMs();

        // Removido: tracking.pageView (gerenciado pelo Utmify)
        ga4Tracking.landingPageView();

        // Removido: scrollObserver (não necessário)
    }, []);

    const handleCTAClick = () => {
        // Removido: tracking.ctaClicked (gerenciado pelo Utmify)
        ga4Tracking.landingCTAClick();
        onNavigate('chat');
    };

    // 📰 Data dinâmica em espanhol — atualiza sozinha a cada acesso
    const fechaHoy = new Date().toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="landing-container">
            <div className="matrix-bg"></div>
            <div className="scanlines"></div>

            <div className="content-wrapper">
                <article className="article-frame">

                    {/* 1. TAG DE CATEGORIA + DATA DINÂMICA */}
                    <div className="news-bar">
                        <span className="news-category">Psicología Conductual · Relaciones</span>
                        <span className="news-date">{fechaHoy}</span>
                    </div>

                    <main className="landing-main">

                        {/* ============================================
                            ZONA DA DOBRA — tudo visível sem rolar no mobile
                            Ordem: manchete → byline → frescor → parágrafo → CTA
                            ============================================ */}
                        <div className="fold-zone">

                            {/* 2. MANCHETE — bicolor */}
                            <h1 className="hero-headline">
                                Cada día que pasa, tu ex recuerda{' '}
                                <span className="accent">un poco menos de ti</span>.
                            </h1>

                            {/* 3. BYLINE — autoridade em 1 linha */}
                            <p className="hero-byline">
                                Por <strong>Sophia Sanchez</strong>, especialista en reconquista de pareja
                            </p>

                            {/* 4. LINHA DE FRESCOR */}
                            <p className="hero-fresh">Actualizado hoy</p>

                            {/* 5. PARÁGRAFO CURTO — escada para o mecanismo */}
                            <p className="hero-sub">
                                Y cuando ella deja de recordar, deja de extrañarte. Descubre la{' '}
                                <strong>Ventana Neuroquímica de 72 Horas</strong> que decide si ella
                                te va a recibir… <em>o te va a olvidar para siempre.</em>
                            </p>

                            {/* 6. CTA — fecha a dobra, zona do polegar */}
                            <div className="cta-group">
                                <button className="hero-cta" onClick={handleCTAClick}>
                                    QUIERO RECUPERAR A MI EX →
                                </button>
                                <p className="hero-safety">
                                    Tarda menos de 2 minutos. Gratis y anónimo.
                                </p>
                            </div>

                        </div>

                        {/* ============================================
                            ABAIXO DA DOBRA — nada é deletado, só desce
                            ============================================ */}

                        {/* 7. MICRO-LINHA DE IMPACTO */}
                        <p className="timing-hook">
                            No fue falta de amor. <strong>Fue falta de timing.</strong>
                        </p>

                        {/* 8. CAIXA DA ESPECIALISTA — intacta, borda vermelha */}
                        <div className="article-box">
                            <p className="article-box-title">
                                <span className="article-box-tag">Psicología Conductual, Relaciones:</span>{' '}
                                <strong>Sophia Sanchez, especialista en reconquista</strong>, presenta
                                la metodología sobre comportamiento femenino que ya ha ayudado a más
                                de <span className="article-box-accent">9.000 hombres</span> a
                                recuperar a su pareja.
                            </p>
                        </div>

                        {/* 9. PROVA SOCIAL — frase-selo única */}
                        <p className="proof-strip">
                            <strong>Más de 9.000</strong> hombres ya hicieron la lectura de
                            escenario antes de mandar el próximo mensaje.
                        </p>

                        {/* 10. LINHA DE ASSINATURA */}
                        <p className="hero-tagline">
                            Claridad antes del mensaje. Estrategia antes de la insistencia.
                        </p>

                    </main>
                </article>
            </div>

            {/* CSS INLINE */}
            <style jsx="true">{`
                .landing-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    background: #fff;
                    overflow: hidden;
                }

                .matrix-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                }

                .scanlines {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    pointer-events: none;
                }

                .content-wrapper {
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    max-width: 800px;
                    padding: 0;
                }

                .article-frame {
                    background: #fff;
                    width: 100%;
                    max-width: 560px;
                    margin: 0 auto;
                    padding: 1rem 1.4rem 1.6rem;
                    min-height: 100vh;
                    min-height: 100dvh;
                }

                /* 1. TAG + DATA */
                .news-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    padding: 0.65rem 0;
                    border-bottom: 1px solid rgba(17, 24, 39, 0.12);
                    margin-bottom: 0.9rem;
                }

                .news-category {
                    font-size: 0.65rem;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: rgba(17, 24, 39, 0.6);
                }

                .news-date {
                    font-size: 0.67rem;
                    color: rgba(17, 24, 39, 0.45);
                }

                .landing-main {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }

                /* ============================================
                   ZONA DA DOBRA — ocupa a primeira tela do celular
                   CTA empatado no pé (zona do polegar)
                   ============================================ */
                .fold-zone {
                    width: 100%;
                    max-width: 460px;
                    min-height: calc(100vh - 76px);
                    min-height: calc(100dvh - 76px);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.85rem;
                    padding-bottom: 0.8rem;
                }

                /* 2. MANCHETE — serifada, bicolor */
                .hero-headline {
                    font-family: Georgia, 'Times New Roman', serif;
                    font-size: 1.45rem;
                    line-height: 1.25;
                    color: #111827;
                    font-weight: 700;
                    letter-spacing: -0.3px;
                    margin: 0.4rem 0 0;
                }

                .hero-headline .accent {
                    color: #dc2626;
                }

                /* 3. BYLINE — autoridade em 1 linha */
                .hero-byline {
                    font-size: 0.78rem;
                    line-height: 1.4;
                    color: rgba(17, 24, 39, 0.68);
                    margin: 0;
                    max-width: 340px;
                }

                .hero-byline strong {
                    color: #111827;
                    font-weight: 700;
                }

                /* 4. FRESCOR — pontinho verde ao vivo */
                .hero-fresh {
                    display: flex;
                    align-items: center;
                    gap: 0.35rem;
                    font-size: 0.66rem;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: rgba(17, 24, 39, 0.5);
                    margin: 0;
                }

                .hero-fresh::before {
                    content: '';
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #16a34a;
                    box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.15);
                    flex-shrink: 0;
                }

                /* 5. PARÁGRAFO CURTO */
                .hero-sub {
                    font-size: 0.92rem;
                    line-height: 1.5;
                    color: rgba(17, 24, 39, 0.75);
                    margin: 0;
                    max-width: 420px;
                }

                .hero-sub strong {
                    color: #111827;
                }

                /* 6. CTA — empurrado pro pé da primeira tela */
                .cta-group {
                    margin-top: auto;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    padding-top: 1rem;
                }

                .hero-cta {
                    background: #dc2626;
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    min-height: 48px;
                    padding: 15px 28px;
                    font-size: 1rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    box-shadow: 0 8px 24px rgba(220, 38, 38, 0.35);
                    width: 100%;
                    max-width: 420px;
                    text-align: center;
                    line-height: 1.3;
                    animation: pulse-cta 2s ease-in-out infinite;
                }

                @keyframes pulse-cta {
                    0%, 100% {
                        transform: scale(1);
                        box-shadow: 0 8px 24px rgba(220, 38, 38, 0.35);
                    }
                    50% {
                        transform: scale(1.03);
                        box-shadow: 0 12px 32px rgba(220, 38, 38, 0.55);
                    }
                }

                .hero-cta:hover {
                    transform: translateY(-2px) scale(1.03);
                    box-shadow: 0 12px 32px rgba(220, 38, 38, 0.55);
                    animation: none;
                }

                .hero-cta:active {
                    transform: translateY(-1px) scale(1.02);
                }

                .hero-safety {
                    font-size: 0.75rem;
                    line-height: 1.5;
                    color: rgba(17, 24, 39, 0.5);
                    margin: 0;
                }

                /* ============================================
                   ABAIXO DA DOBRA
                   ============================================ */

                /* 7. MICRO-LINHA DE IMPACTO */
                .timing-hook {
                    font-family: Georgia, 'Times New Roman', serif;
                    font-style: italic;
                    font-size: 1.02rem;
                    line-height: 1.5;
                    color: rgba(17, 24, 39, 0.85);
                    margin: 1.8rem 0 0;
                    text-align: center;
                }

                .timing-hook strong {
                    color: #111827;
                    font-style: normal;
                }

                /* 8. CAIXA DA ESPECIALISTA */
                .article-box {
                    width: 100%;
                    max-width: 460px;
                    background: #f4f4f5;
                    border: 1px solid rgba(17, 24, 39, 0.1);
                    border-left: 3px solid #dc2626;
                    border-radius: 6px;
                    padding: 0.95rem 1.05rem;
                    margin-top: 1rem;
                    text-align: left;
                }

                .article-box-title {
                    margin: 0;
                    font-family: Georgia, 'Times New Roman', serif;
                    font-size: 0.95rem;
                    line-height: 1.5;
                    color: #111827;
                }

                .article-box-tag {
                    font-weight: 700;
                }

                .article-box-accent {
                    color: #dc2626;
                    font-weight: 700;
                }

                /* 9. PROVA SOCIAL — frase-selo única */
                .proof-strip {
                    display: block;
                    width: 100%;
                    max-width: 430px;
                    border-top: 1px solid rgba(17, 24, 39, 0.1);
                    border-bottom: 1px solid rgba(17, 24, 39, 0.1);
                    padding: 0.85rem 0.5rem;
                    margin: 1.2rem 0 0;
                    text-align: center;
                    font-size: 0.88rem;
                    line-height: 1.55;
                    color: rgba(17, 24, 39, 0.75);
                }

                .proof-strip strong {
                    color: #dc2626;
                    font-weight: 700;
                }

                /* 10. LINHA DE ASSINATURA */
                .hero-tagline {
                    font-size: 0.75rem;
                    line-height: 1.5;
                    color: rgba(17, 24, 39, 0.45);
                    margin: 1.1rem 0 0.4rem;
                    text-align: center;
                }

                /* RESPONSIVO */
                @media (max-width: 768px) {
                    .article-frame {
                        padding: 0.9rem 1.15rem 1.4rem;
                    }

                    .hero-headline {
                        font-size: 1.32rem;
                    }

                    .hero-sub {
                        font-size: 0.9rem;
                    }
                }

                /* iPhone SE / 360px — dobra compacta sem scroll */
                @media (max-width: 380px) {
                    .article-frame {
                        padding: 0.8rem 1rem 1.2rem;
                    }

                    .news-bar {
                        padding: 0.55rem 0;
                        margin-bottom: 0.75rem;
                    }

                    .fold-zone {
                        gap: 0.7rem;
                        min-height: calc(100vh - 64px);
                        min-height: calc(100dvh - 64px);
                    }

                    .hero-headline {
                        font-size: 1.18rem;
                    }

                    .hero-byline {
                        font-size: 0.73rem;
                    }

                    .hero-sub {
                        font-size: 0.85rem;
                        line-height: 1.45;
                    }

                    .hero-cta {
                        padding: 13px 18px;
                        font-size: 0.95rem;
                    }
                }
            `}</style>
        </div>
    );
}
