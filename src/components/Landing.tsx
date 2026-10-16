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
        captureUTMs();
        ga4Tracking.landingPageView();
    }, []);

    const handleCTAClick = () => {
        ga4Tracking.landingCTAClick();
        onNavigate('chat');
    };

    // 📰 Data do dia renderizada em espanhol (estilo portal de notícias)
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

                    {/* 0. BARRA SUPERIOR — categoria + data, sem logo de veículo */}
                    <div className="news-bar">
                        <span className="news-category">Psicología Conductual · Relaciones</span>
                        <span className="news-date">{fechaHoy}</span>
                    </div>

                    <main className="landing-main-simple">

                        {/* 1. MANCHETE — curta, direta, serifada */}
                        <h1 className="hero-headline">
                            El método que ya ayudó a <span className="accent">más de 9.000 hombres</span> a recuperar a su ex.
                        </h1>

                        {/* 2. SUBHEADLINE — a dor + o mecanismo */}
                        <p className="hero-sub">
                            Descubre la <strong>Ventana Neuroquímica de 72 Horas</strong> que decide si
                            ella te va a recibir… <em>o te va a olvidar para siempre.</em>
                        </p>

                        {/* 3. CORPO ESTILO ARTIGO — resumido e escaneável */}
                        <p className="article-body">
                            Escribir demasiado pronto, suplicar, pedir perdón: el error que casi
                            todos cometen después de una ruptura. <strong>No fue falta de amor —
                            fue falta de timing.</strong> Existe una ventana en su cerebro. Cuando
                            se lee bien, los buenos recuerdos vuelven.
                        </p>

                        {/* 4. PROVA SOCIAL — linha simples, sem caixa */}
                        <div className="social-proof">
                            <span className="proof-badge">+9.000</span>
                            <p>hombres ya hicieron la lectura de escenario antes de mandar el próximo mensaje.</p>
                        </div>

                        {/* 5. CTA — vermelho de alto contraste */}
                        <button className="hero-cta" onClick={handleCTAClick}>
                            QUIERO SABER SI ESTOY DENTRO DEL PLAZO
                        </button>

                        {/* 6. MICROCOPY DO RODAPÉ */}
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
                    background: #000;
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

                /* ========================================
                   DOBRA 100% BRANCA — sem borda preta
                   ======================================== */
                .article-frame {
                    background: #fff;
                    border: none;
                    border-radius: 0;
                    width: 100%;
                    max-width: 560px;
                    margin: 0 auto;
                    padding: 1.25rem 1.5rem 2.25rem;
                    min-height: 100vh;
                }

                /* 0. BARRA SUPERIOR — leve, discreta */
                .news-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    padding: 0.85rem 0;
                    border-bottom: 1px solid rgba(17, 24, 39, 0.12);
                    margin-bottom: 1.6rem;
                }

                .news-category {
                    font-size: 0.68rem;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: rgba(17, 24, 39, 0.6);
                }

                .news-date {
                    font-size: 0.7rem;
                    color: rgba(17, 24, 39, 0.45);
                }

                .landing-main-simple {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    gap: 1.4rem;
                }

                /* 1. MANCHETE — serifada, estilo jornal */
                .hero-headline {
                    text-align: center;
                    font-family: Georgia, 'Times New Roman', serif;
                    font-size: 1.75rem;
                    line-height: 1.25;
                    color: #111827;
                    font-weight: 700;
                    letter-spacing: -0.3px;
                    margin: 0;
                }

                .hero-headline .accent {
                    color: #dc2626;
                }

                /* 2. SUBHEADLINE */
                .hero-sub {
                    text-align: center;
                    font-size: 1.05rem;
                    line-height: 1.55;
                    color: rgba(17, 24, 39, 0.75);
                    margin: 0;
                    max-width: 420px;
                }

                .hero-sub strong {
                    color: #111827;
                }

                /* 3. CORPO DO ARTIGO — mais respiro, menos destaque */
                .article-body {
                    text-align: left;
                    font-size: 1rem;
                    line-height: 1.75;
                    color: rgba(17, 24, 39, 0.8);
                    margin: 0;
                }

                .article-body strong {
                    color: #111827;
                    font-weight: 600;
                }

                /* 4. PROVA SOCIAL — linha com filete, lê em 1 segundo */
                .social-proof {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    width: 100%;
                    max-width: 420px;
                    background: transparent;
                    border: none;
                    border-top: 1px solid rgba(17, 24, 39, 0.1);
                    border-bottom: 1px solid rgba(17, 24, 39, 0.1);
                    border-radius: 0;
                    padding: 0.9rem 0.5rem;
                    text-align: center;
                }

                .proof-badge {
                    flex-shrink: 0;
                    font-family: Georgia, serif;
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: #dc2626;
                }

                .social-proof p {
                    margin: 0;
                    font-size: 0.88rem;
                    line-height: 1.45;
                    color: rgba(17, 24, 39, 0.7);
                }

                /* 5. CTA — vermelho sólido, protagonista da dobra */
                .hero-cta {
                    background: #dc2626;
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    padding: 17px 36px;
                    font-size: 1.05rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    box-shadow: 0 8px 24px rgba(220, 38, 38, 0.35);
                    max-width: 95%;
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
                        transform: scale(1.04);
                        box-shadow: 0 12px 32px rgba(220, 38, 38, 0.55);
                    }
                }

                .hero-cta:hover {
                    transform: translateY(-3px) scale(1.04);
                    box-shadow: 0 12px 32px rgba(220, 38, 38, 0.55);
                    animation: none;
                }

                .hero-cta:active {
                    transform: translateY(-1px) scale(1.02);
                }

                /* 6. MICROCOPY DO RODAPÉ */
                .hero-safety {
                    text-align: center;
                    font-size: 0.82rem;
                    line-height: 1.55;
                    color: rgba(17, 24, 39, 0.5);
                    margin: 0;
                }

                /* RESPONSIVO */
                @media (max-width: 768px) {
                    .article-frame {
                        padding: 1.1rem 1.25rem 2rem;
                    }

                    .landing-main-simple {
                        gap: 1.2rem;
                    }

                    .hero-headline {
                        font-size: 1.5rem;
                    }
                }

                @media (max-width: 480px) {
                    .article-frame {
                        padding: 1rem 1.1rem 1.75rem;
                    }

                    .landing-main-simple {
                        gap: 1.1rem;
                    }

                    .hero-headline {
                        font-size: 1.35rem;
                    }

                    .hero-sub {
                        font-size: 0.98rem;
                    }

                    .article-body {
                        font-size: 0.94rem;
                        line-height: 1.7;
                    }

                    .hero-cta {
                        padding: 15px 26px;
                        font-size: 0.98rem;
                    }

                    .social-proof p {
                        font-size: 0.83rem;
                    }
                }
            `}</style>
        </div>
    );
}
