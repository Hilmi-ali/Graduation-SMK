import { useEffect, useState } from "react";

export default function Result() {
  const [data, setData] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuratMenu, setShowSuratMenu] = useState(false);

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"));

    setTimeout(() => {
      setData(student);

      if (student?.status === "LULUS") {
        setShowConfetti(true);

        // 🔥 AUTO STOP 3 DETIK
        setTimeout(() => {
          setShowConfetti(false);
        }, 10000);
      }
    }, 800);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Surat Kelulusan Fix.pdf"; // pastikan file ada di public/
    link.download = `Surat_Kelulusan_${data.nisn}.docx`;
    link.click();
  };

  const handlePreview = () => {
    window.open("/Surat Kelulusan Fix.pdf", "_blank");
  };

  if (!data) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }

          @keyframes shimmerMove {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }

          .skeleton-wrap {
            min-height: 100vh;
            background: #F7F6F2;
            font-family: 'DM Sans', sans-serif;
          }
          .sk-nav {
            padding: 18px 36px;
            background: #fff;
            border-bottom: 1px solid #EDEBE4;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .sk-logo { width: 160px; height: 14px; background: #E8E5DC; border-radius: 4px; animation: pulse 1.5s infinite; }
          .sk-logo-sm { width: 80px; height: 14px; background: #E8E5DC; border-radius: 4px; animation: pulse 1.5s infinite 0.2s; }
          .sk-body {
            display: flex; justify-content: center; align-items: center;
            min-height: calc(100vh - 57px); padding: 40px 20px;
          }
          .sk-card {
            background: #fff;
            border-radius: 24px;
            border: 1px solid #EDEBE4;
            padding: 40px 32px;
            width: 100%; max-width: 380px;
            display: flex; flex-direction: column; align-items: center; gap: 14px;
          }
          .sk-avatar { width: 88px; height: 88px; border-radius: 50%; background: #F0EDE4; animation: pulse 1.5s infinite; }
          .sk-line { height: 12px; background: #F0EDE4; border-radius: 4px; animation: pulse 1.5s infinite; }
        `}</style>
        <div className="skeleton-wrap">
          <div className="sk-nav">
            <div className="sk-logo" />
            <div className="sk-logo-sm" />
          </div>
          <div className="sk-body">
            <div className="sk-card">
              <div className="sk-avatar" />
              <div className="sk-line" style={{ width: "60%" }} />
              <div className="sk-line" style={{ width: "40%", opacity: 0.6 }} />
              <div className="sk-line" style={{ width: "50%", opacity: 0.5 }} />
              <div
                className="sk-line"
                style={{
                  width: "100%",
                  height: "56px",
                  borderRadius: "12px",
                  marginTop: "10px",
                }}
              />
              <div
                className="sk-line"
                style={{ width: "100%", height: "44px", borderRadius: "10px" }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  const isLulus = data.status === "LULUS";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display:ital@0;1&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=DM+Sans:wght@400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&family=Libre+Baskerville:wght@400;700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.93); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes confettiFall {
          0%   { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) rotate(480deg); opacity: 0; }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(1.06); }
        }
        @keyframes statusReveal {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .res-page {
          min-height: 100vh;
          background: #F7F6F2;
          font-family: 'DM Sans', sans-serif;
          color: #1C1B18;
        }

        .res-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 36px;
          background: #FFFFFF;
          border-bottom: 1px solid #EDEBE4;
        }
        .res-nav-left {
          display: flex; flex-direction: column; gap: 1px;
        }
        .res-nav-school {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: #1C1B18;
        }
        .res-nav-year {
          font-size: 11px;
          color: #9E9B91;
          letter-spacing: 0.03em;
        }
        .res-nav-tag {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: #534AB7;
          background: #EEEDFE;
          padding: 5px 14px;
          border-radius: 99px;
        }

        .res-body {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 57px);
          padding: 48px 20px;
        }

        .res-card {
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid #EDEBE4;
          width: 100%;
          max-width: 380px;
          overflow: hidden;
          animation: scaleIn 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }

        .res-top {
          padding: 36px 28px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          background: #FAFAF8;
          border-bottom: 1px solid #EDEBE4;
          position: relative;
        }

        .res-avatar-wrap {
          position: relative;
          margin-bottom: 18px;
        }
        .res-avatar-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid;
          animation: ringPulse 2.8s ease-in-out infinite;
        }
        .res-avatar-ring.lulus  { border-color: #5DCAA5; }
        .res-avatar-ring.tidak  { border-color: #F09595; }
        .res-avatar {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          border: 3px solid #fff;
          position: relative;
          z-index: 1;
        }

        .res-nama {
          font-family: 'Outfit', serif;
          font-size: 22px;
          color: #1C1B18;
          text-align: center;
          line-height: 1.2;
          margin-bottom: 6px;
          animation: fadeUp 0.5s 0.2s both;
        }
        .res-nisn {
          font-size: 12px;
          color: #B4B2A9;
          letter-spacing: 0.05em;
          margin-bottom: 2px;
          animation: fadeUp 0.5s 0.3s both;
        }
        .res-jurusan {
          font-size: 13px;
          color: #6E6C63;
          animation: fadeUp 0.5s 0.35s both;
        }

        .res-bottom {
          padding: 24px 28px 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .res-status-box {
          border-radius: 14px;
          padding: 18px 16px;
          text-align: center;
          animation: statusReveal 0.5s 0.45s both;
        }
        .res-status-box.lulus {
          background: #E1F5EE;
          border: 1px solid #9FE1CB;
        }
        .res-status-box.tidak {
          background: #FCEBEB;
          border: 1px solid #F7C1C1;
        }
        .res-status-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          margin-bottom: 6px;
        }
        .res-status-box.lulus .res-status-label { color: #0F6E56; }
        .res-status-box.tidak .res-status-label { color: #A32D2D; }

        .res-status-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          border-radius: 50%;
          margin-bottom: 8px;
        }
        .res-status-box.lulus .res-status-icon { background: #1D9E75; }
        .res-status-box.tidak .res-status-icon { background: #E24B4A; }

        .res-status-text {
          font-size: 15px;
          font-weight: 500;
          line-height: 1.35;
        }
        .res-status-box.lulus .res-status-text { color: #085041; }
        .res-status-box.tidak .res-status-text { color: #791F1F; }

        .res-status-sub {
          font-size: 12px;
          margin-top: 4px;
        }
        .res-status-box.lulus .res-status-sub { color: #0F6E56; }
        .res-status-box.tidak .res-status-sub { color: #A32D2D; }

        .res-btn {
          width: 100%;
          padding: 13px;
          border-radius: 10px;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.1s;
          animation: fadeUp 0.5s 0.55s both;
        }
        .res-btn:active { transform: scale(0.98); }
        .res-btn.primary {
          background: #534AB7;
          color: #EEEDFE;
        }
        .res-btn.primary:hover { opacity: 0.88; }
        .res-btn.ghost {
          background: transparent;
          color: #6E6C63;
          border: 1px solid #EDEBE4;
        }
        .res-btn.ghost:hover { background: #F7F6F2; }

        .res-divider {
          height: 1px;
          background: #F0EDE4;
          margin: 2px 0;
        }

        .confetti-piece {
          position: fixed;
          top: -12px;
          width: 7px;
          height: 7px;
          border-radius: 2px;
          pointer-events: none;
          z-index: 9999;
        }
      .res-btn.secondary {
  background: #EEEDFE;
  color: #534AB7;
  border: 1px solid #DCD9FF;
}

.res-btn.secondary:hover {
  background: #E4E2FD;
}

.res-btn.download {
  background: linear-gradient(135deg, #5DCAA5, #3FBF92);
  color: white;
}

.res-btn.download:hover {
  opacity: 0.9;
}
  .res-btn.surat {
  background: linear-gradient(135deg, #5DCAA5, #3FBF92);
  color: white;
  position: relative;
}

.res-surat-menu {
  position: absolute;
  bottom: 110%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #EDEBE4;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  animation: fadeUp 0.2s ease;
  z-index: 10;
}

.res-surat-item {
  padding: 12px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s;
}

.res-surat-item:hover {
  background: #F7F6F2;
}
      `}</style>

      <div className="res-page">
        {/* NAVBAR */}
        <div className="res-nav">
          <div className="res-nav-left">
            <span className="res-nav-school">SMK DIPONEGORO CIPARI</span>
            <span className="res-nav-year">Tahun Pelajaran 2025 / 2026</span>
          </div>
          <span className="res-nav-tag">KELULUSAN 2026</span>
        </div>

        {/* BODY */}
        <div className="res-body">
          <div className="res-card">
            {/* TOP: avatar + identitas */}
            <div className="res-top">
              <div className="res-avatar-wrap">
                <div
                  className={`res-avatar-ring ${isLulus ? "lulus" : "tidak"}`}
                />
                <img
                  src={data.foto || "https://via.placeholder.com/110"}
                  alt="foto"
                  className="res-avatar"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/110";
                  }}
                />
              </div>
              <div className="res-nama">{data.nama}</div>
              <div className="res-nisn">NISN · {data.nisn}</div>
              <div className="res-jurusan">{data.jurusan}</div>
            </div>

            {/* BOTTOM: status + tombol */}
            <div className="res-bottom">
              <div className={`res-status-box ${isLulus ? "lulus" : "tidak"}`}>
                <div className="res-status-icon">
                  {isLulus ? (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M3.5 9.5L7 13L14.5 5.5"
                        stroke="#fff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M5 5L13 13M5 13L13 5"
                        stroke="#fff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>
                <div className="res-status-label">
                  {isLulus ? "STATUS KELULUSAN" : "STATUS KELULUSAN"}
                </div>
                <div className="res-status-text">
                  {isLulus ? "Dinyatakan Lulus" : "Belum Dinyatakan Lulus"}
                </div>
                <div className="res-status-sub">
                  {isLulus
                    ? "Selamat! Kamu telah menyelesaikan pendidikanmu."
                    : "Mohon maaf. Hubungi wali kelas untuk info selanjutnya."}
                </div>
              </div>

              <div className="res-divider" />
              {isLulus && (
                <>
                  <div style={{ position: "relative", width: "100%" }}>
                    <button
                      className="res-btn surat"
                      onClick={() => setShowSuratMenu(!showSuratMenu)}
                    >
                      📄 Surat Kelulusan
                    </button>

                    {showSuratMenu && (
                      <div className="res-surat-menu">
                        <div
                          className="res-surat-item"
                          onClick={() => {
                            handlePreview();
                            setShowSuratMenu(false);
                          }}
                        >
                          👁️ Lihat Surat
                        </div>

                        <div
                          className="res-surat-item"
                          onClick={() => {
                            handleDownload();
                            setShowSuratMenu(false);
                          }}
                        >
                          ⬇️ Download Surat
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="res-divider" />
                </>
              )}
              <button
                className="res-btn primary"
                onClick={() => (window.location.href = "/")}
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>

        {/* CONFETTI */}
        {showConfetti &&
          [...Array(40)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: Math.random() * 100 + "%",
                background: `hsl(${Math.random() * 360}, 80%, 60%)`,
                animation: `confettiFall ${2 + Math.random()}s linear ${Math.random() * 0.8}s both`,
              }}
            />
          ))}
      </div>
    </>
  );
}
