import { useEffect, useState } from "react";

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState("in");

  useEffect(() => {
    const fadeOut = setTimeout(() => setPhase("out"), 1600);
    const done = setTimeout(() => onDone?.(), 2200);
    return () => {
      clearTimeout(fadeOut);
      clearTimeout(done);
    };
  }, []);

  const G = "#166534";
  const GD = "#14532D";
  const GL = "#DCFCE7";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes splashIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes splashOut {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(1.03); }
        }
        @keyframes logoUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ringPulse {
          0%   { transform: scale(1);    opacity: 0.25; }
          50%  { transform: scale(1.18); opacity: 0.08; }
          100% { transform: scale(1),    opacity: 0.25; }
        }
        @keyframes barGrow {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }

        .splash-root {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: ${G};
          animation: ${phase === "out" ? "splashOut .6s ease forwards" : "splashIn .5s ease forwards"};
        }

        .splash-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          animation: ringPulse 2.4s ease-in-out infinite;
          pointer-events: none;
        }

        .splash-content {
          display: flex; flex-direction: column; align-items: center;
          animation: logoUp .6s .15s cubic-bezier(.22,1,.36,1) both;
          position: relative; z-index: 1;
        }

        .splash-bar-track {
          width: 120px; height: 2px;
          background: rgba(255,255,255,0.15);
          border-radius: 99px; overflow: hidden;
          margin-top: 32px;
        }
        .splash-bar-fill {
          height: 100%;
          background: #A3E635;
          border-radius: 99px;
          animation: barGrow 1.5s .2s cubic-bezier(.4,0,.2,1) forwards;
        }
        .splash-dots {
          display: flex; gap: 6px; margin-top: 14px;
        }
        .splash-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255,255,255,0.35);
          animation: dotBlink 1.4s ease-in-out infinite;
        }
          @media (max-width: 600px) {
  .splash-ring {
    transform: scale(0.6);
  }

  .splash-content {
    padding: 0 20px;
  }

  .splash-bar-track {
    width: 90px;
  }

  .splash-dot {
    width: 4px;
    height: 4px;
  }
}
      `}</style>

      <div className="splash-root">
        {/* decorative rings */}
        <div
          className="splash-ring"
          style={{ width: "300px", height: "300px", animationDelay: "0s" }}
        />
        <div
          className="splash-ring"
          style={{ width: "460px", height: "460px", animationDelay: "0.4s" }}
        />
        <div
          className="splash-ring"
          style={{ width: "620px", height: "620px", animationDelay: "0.8s" }}
        />

        {/* decorative corner dots */}
        {[
          { top: "12%", left: "8%" },
          { top: "18%", right: "10%" },
          { bottom: "14%", left: "10%" },
          { bottom: "10%", right: "8%" },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              ...pos,
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              animation: `dotBlink ${1.2 + i * 0.3}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* main content */}
        <div className="splash-content">
          {/* school emblem */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "22px",
            }}
          >
            {/* SVG mortar board icon */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <polygon
                points="20,8 38,16 20,24 2,16"
                fill="rgba(255,255,255,0.9)"
              />
              <path
                d="M8 19v9c0 0 4 5 12 5s12-5 12-5V19"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="2"
                strokeLinejoin="round"
                fill="none"
              />
              <line
                x1="38"
                y1="16"
                x2="38"
                y2="26"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="38" cy="27" r="2" fill="#A3E635" />
            </svg>
          </div>

          {/* school name */}
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            SMK Diponegoro
          </div>

          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "28px",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.5px",
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            Cipari
          </div>

          {/* year badge */}
          <div
            style={{
              marginTop: "14px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(163,230,53,0.15)",
              border: "1px solid rgba(163,230,53,0.3)",
              borderRadius: "99px",
              padding: "5px 14px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "#A3E635",
              letterSpacing: "0.06em",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#A3E635",
                animation: "dotBlink 1.8s ease-in-out infinite",
                display: "inline-block",
              }}
            />
            KELULUSAN 2026
          </div>

          {/* progress bar */}
          <div className="splash-bar-track">
            <div className="splash-bar-fill" />
          </div>

          {/* loading dots */}
          <div className="splash-dots">
            {[0, 0.2, 0.4].map((d, i) => (
              <div
                key={i}
                className="splash-dot"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
          </div>
        </div>

        {/* bottom credit */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.04em",
          }}
        >
          Sistem Pengumuman Kelulusan
        </div>
      </div>
    </>
  );
}
