export default function MaintenancePage() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        html, body {
          height: 100%;
          background: #ffffff;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        p {
          font-size: 1rem;
          font-weight: 300;
          letter-spacing: 0.05em;
          color: #1a1a1a;
        }
      `}</style>

      <div className="wrapper">
        <p>em manutenção</p>
      </div>
    </>
  );
}
