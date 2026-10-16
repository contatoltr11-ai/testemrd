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

                    <main className="landing-main-simple">

                        {/* 2. HEADLINE — bicolor, medo sem prazo fixo */}
                        <h1 className="hero-headline">
                            Cada día que pasa, tu ex recuerda{' '}
                            <span className="accent">un poco menos de ti</span>.
                        </h1>

                        {/* 3. SUBHEADLINE — escada para o mecanismo */}
                        <p className="hero-sub">
                            Y cuando ella deja de recordar, deja de extrañarte. Descubre la{' '}
                            <strong>Ventana Neuroquímica de 72 Horas</strong> que decide si ella
                            te va a recibir… <em>o te va a olvidar para siempre.</em>
                        </p>

                        {/* 4. BOX DE ARTIGO SIMULADO — autoridade editorial, sem foto/logo */}
                        <div className="article-box">
                            <p className="article-box-title">
                                <span className="article-box-tag">Psicología Conductual, Relaciones:</span>{' '}
                                <strong>Sophia Sanchez, especialista en reconquista</strong>, presenta
                                la metodología sobre comportamiento femenino que ya ha ayudado a más
                                de <span className="article-box-accent">9.000 hombres</span> a
                                recuperar a su pareja.
                            </p>
                        </div>

                        {/* 5. CORPO ESTILO ARTIGO */}
                        <p className="article-body">
                            El error que casi todos los hombres cometen después de una ruptura es
                            escribir demasiado pronto: suplicar, pedir perdón, mandar mensajes
                            largos. Lo que pocos saben es que <strong>no fue falta de amor. Fue
                            falta de timing.</strong> Existe una ventana en su cerebro — la{' '}
                            <strong>Ventana Neuroquímica de 72 Horas</strong> — que decide cómo se
                            recibe cada acercamiento. Cuando esa ventana se lee bien, su mente le
                            da espacio a los buenos recuerdos. Cuando se la ignora, cualquier
                            mensaje llega como presión… no como deseo.
                        </p>

                        {/* 6. FAIXA DE PROVA SOCIAL */}
                        <div className="social-proof">
                            <span className="proof-badge">+9.000</span>
                            <p>hombres ya hicieron la lectura de escenario antes de mandar el próximo mensaje.</p>
                        </div>

                        {/* 7. CTA — vermelho sólido, full-width no mobile */}
                        <button className="hero-cta" onClick={handleCTAClick}>
                            QUIERO RECUPERAR A MI EX →
                        </button>

                        {/* 8. MICROCOPY DO RODAPÉ */}
                        <p className="hero-safety">
                            Tarda menos de 2 minutos. Gratis y anónimo.<br />
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

                /* DOBRA 100% BRANCA */
                .article-frame {
                    background: #fff;
                    width: 100%;
                    max-width: 560px;
                    margin: 0 auto;
                    padding: 1.1rem 1.4rem 2rem;
                    min-height: 100vh;
                }

                /* 1. TAG + DATA */
                .news-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    padding: 0.7rem 0;
                    border-bottom: 1px solid rgba(17, 24, 39, 0.12);
                    margin-bottom: 1.3rem;
                }

                .news-category {
                    font-size: 0.66rem;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: rgba(17, 24, 39, 0.6);
                }

                .news-date {
                    font-size: 0.68rem;
                    color: rgba(17, 24, 39, 0.45);
                }

                .landing-main-simple {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    gap: 1.05rem;
                }

                /* 2. HEADLINE — serifada, bicolor */
                .hero-headline {
                    text-align: center;
                    font-family: Georgia, 'Times New Roman', serif;
                    font-size: 1.55rem;
                    line-height: 1.25;
                    color: #111827;
                    font-weight: 700;
                    letter-spacing: -0.3px;
                    margin: 0;
                }

                .hero-headline .accent {
                    color: #dc2626;
                }

                /* 3. SUBHEADLINE */
                .hero-sub {
                    text-align: center;
                    font-size: 0.98rem;
                    line-height: 1.55;
                    color: rgba(17, 24, 39, 0.75);
                    margin: 0;
                    max-width: 430px;
                }

                .hero-sub strong {
                    color: #111827;
                }

                /* 4. BOX DE ARTIGO SIMULADO — contraste editorial */
                .article-box {
                    width: 100%;
                    max-width: 460px;
                    background: #f4f4f5;
                    border: 1px solid rgba(17, 24, 39, 0.1);
                    border-left: 3px solid #dc2626;
                    border-radius: 6px;
                    padding: 1rem 1.1rem;
                    text-align: left;
                }

                .article-box-title {
                    margin: 0;
                    font-family: Georgia, 'Times New Roman', serif;
                    font-size: 0.98rem;
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

                /* 5. CORPO DO ARTIGO */
                .article-body {
                    text-align: left;
                    font-size: 0.94rem;
                    line-height: 1.7;
                    color: rgba(17, 24, 39, 0.82);
                    margin: 0;
                    max-width: 460px;
                }

                .article-body strong {
                    color: #111827;
                    font-weight: 600;
                }

                /* 6. PROVA SOCIAL — linha leve com filete */
                .social-proof {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    width: 100%;
                    max-width: 430px;
                    border-top: 1px solid rgba(17, 24, 39, 0.1);
                    border-bottom: 1px solid rgba(17, 24, 39, 0.1);
                    padding: 0.8rem 0.5rem;
                    text-align: center;
                }

                .proof-badge {
                    flex-shrink: 0;
                    font-family: Georgia, serif;
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: #dc2626;
                }

                .social-proof p {
                    margin: 0;
                    font-size: 0.84rem;
                    line-height: 1.4;
                    color: rgba(17, 24, 39, 0.7);
                }

                /* 7. CTA — vermelho sólido, full-width no mobile */
                .hero-cta {
                    background: #dc2626;
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    padding: 16px 32px;
                    font-size: 1.02rem;
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

                /* 8. MICROCOPY */
                .hero-safety {
                    text-align: center;
                    font-size: 0.8rem;
                    line-height: 1.55;
                    color: rgba(17, 24, 39, 0.5);
                    margin: 0;
                }

                /* RESPONSIVO */
                @media (max-width: 768px) {
                    .article-frame {
                        padding: 1rem 1.15rem 1.8rem;
                    }

                    .hero-headline {
                        font-size: 1.35rem;
                    }

                    .hero-sub {
                        font-size: 0.94rem;
                    }
                }

                @media (max-width: 480px) {
                    .article-frame {
                        padding: 0.9rem 1rem 1.6rem;
                    }

                    .news-bar {
                        padding: 0.6rem 0;
                        margin-bottom: 1.1rem;
                    }

                    .landing-main-simple {
                        gap: 0.85rem;
                    }

                    .hero-headline {
                        font-size: 1.25rem;
                    }

                    .hero-sub {
                        font-size: 0.9rem;
                    }

                    .article-box {
                        padding: 0.85rem 0.95rem;
                    }

                    .article-box-title {
                        font-size: 0.92rem;
                    }

                    .article-body {
                        font-size: 0.88rem;
                    }

                    .hero-cta {
                        max-width: 100%;
                        padding: 15px 20px;
                        font-size: 0.98rem;
                    }

                    .social-proof p {
                        font-size: 0.8rem;
                    }
                }
            `}</style>
        </div>
    );
}
