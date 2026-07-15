export default function MaintenancePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          cursor: default !important;
        }

        html, body {
          height: 100%;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #ffffff;
          color: #1a1a1a;
          -webkit-font-smoothing: antialiased;
        }

        .maintenance-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        /* Subtle background texture lines */
        .bg-line {
          position: fixed;
          background: #e5e5e5;
          z-index: 0;
        }

        .bg-line-h {
          width: 100%;
          height: 1px;
        }

        .bg-line-v {
          height: 100%;
          width: 1px;
        }

        .content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 560px;
        }

        .label {
          font-size: 0.7rem;
          font-weight: 400;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 3rem;
        }

        .divider {
          width: 40px;
          height: 1px;
          background: #1a1a1a;
          margin: 0 auto 3rem;
        }

        h1 {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: #1a1a1a;
          margin-bottom: 1.5rem;
        }

        h1 span {
          font-weight: 300;
          font-style: italic;
        }

        .description {
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.8;
          color: #666;
          margin-bottom: 3.5rem;
          letter-spacing: 0.01em;
        }

        .contact-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #999;
        }

        .contact-row a {
          color: #1a1a1a;
          text-decoration: none;
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 1px;
          transition: border-color 0.2s;
        }

        .contact-row a:hover {
          border-color: #1a1a1a;
        }

        .contact-row .dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #ccc;
          display: inline-block;
        }

        .footer-sig {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ccc;
          z-index: 1;
          white-space: nowrap;
        }

        /* Corner decorations */
        .corner {
          position: fixed;
          width: 24px;
          height: 24px;
          z-index: 1;
        }

        .corner::before,
        .corner::after {
          content: '';
          position: absolute;
          background: #d0d0d0;
        }

        .corner::before { width: 1px; height: 100%; }
        .corner::after  { width: 100%; height: 1px; }

        .corner-tl { top: 2rem; left: 2rem; }
        .corner-tr { top: 2rem; right: 2rem; transform: scaleX(-1); }
        .corner-bl { bottom: 2rem; left: 2rem; transform: scaleY(-1); }
        .corner-br { bottom: 2rem; right: 2rem; transform: scale(-1); }

        @media (max-width: 480px) {
          .corner { display: none; }
          .footer-sig { font-size: 0.6rem; }
        }
      `}</style>

      <div className="maintenance-wrapper">
        {/* Corner decorations */}
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />

        {/* Content */}
        <div className="content">
          <p className="label">Daniel França — Arquitetura</p>

          <div className="divider" />

          <h1>
            Em <span>manutenção</span>
          </h1>

          <p className="description">
            O site está temporariamente fora do ar para atualizações.<br />
            Em breve estará de volta com novidades.
          </p>

          <div className="contact-row">
            <span>Contato</span>
            <span className="dot" />
            <a href="mailto:contato@danielfranca.arq.br">
              contato@danielfranca.arq.br
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="footer-sig">© Daniel França Arquitetura</p>
      </div>
    </>
  );
}
