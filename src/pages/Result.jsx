import { useEffect, useState } from "react";
import { generateSurat } from "../generate-surat";

export default function Result() {
  const [data, setData] = useState(null);
  const [step, setStep] = useState("loading");
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"));

    setTimeout(() => {
      setData(student);
      setStep("result");

      if (student?.status === "LULUS") {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }, 2200);
  }, []);

  if (!data) return null;

  const isLulus = data.status === "LULUS";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F6F2",
        fontFamily: "DM Sans, sans-serif",
      }}
    >
      {/* NAVBAR FIXED */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#166534",
          color: "white",
          padding: "14px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>
            SMK DIPONEGORO CIPARI
          </div>
          <div style={{ fontSize: 11, opacity: 0.8 }}>
            Tahun Pelajaran 2025 / 2026
          </div>
        </div>

        <div
          style={{
            fontSize: 11,
            background: "#DCFCE7",
            color: "#14532D",
            padding: "6px 14px",
            borderRadius: 99,
            fontWeight: 600,
          }}
        >
          KELULUSAN 2026
        </div>
      </div>

      {/* BODY */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 380,
            background: "#fff",
            borderRadius: 26,
            border: "1px solid #EDEBE4",
            boxShadow: "0 30px 60px rgba(0,0,0,0.06)",
            overflow: "hidden",
            animation: "fadeUp 0.6s ease",
          }}
        >
          {/* LOADING */}
          {step === "loading" && (
            <div style={{ padding: 60, textAlign: "center" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  border: "5px solid #E5E7EB",
                  borderTop: "5px solid #166534",
                  margin: "0 auto 20px",
                  animation: "spin 1s linear infinite",
                }}
              />
              <h3 style={{ fontWeight: 500 }}>Memverifikasi Data...</h3>
              <p style={{ fontSize: 12, color: "#888" }}>
                Sistem sedang memproses hasil kelulusan
              </p>
            </div>
          )}

          {/* RESULT */}
          {step === "result" && (
            <>
              {/* HEADER */}
              <div
                style={{
                  padding: "32px 24px",
                  textAlign: "center",
                  background: "#FAFAF8",
                  borderBottom: "1px solid #EDEBE4",
                }}
              >
                <img
                  src={data.foto || "https://via.placeholder.com/100"}
                  style={{
                    width: 82,
                    height: 82,
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: 14,
                    border: "3px solid #fff",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                  }}
                />

                <div style={{ fontSize: 19, fontWeight: 600 }}>{data.nama}</div>
                <div style={{ fontSize: 12, color: "#999", marginTop: 5 }}>
                  NISN · {data.nisn}
                </div>
                <div style={{ fontSize: 13, color: "#666" }}>
                  <strong>{data.jurusan}</strong>
                </div>
              </div>

              {/* STATUS */}
              <div style={{ padding: 24 }}>
                <div
                  style={{
                    padding: 22,
                    borderRadius: 18,
                    textAlign: "center",
                    background: isLulus ? "#ECFDF5" : "#FEF2F2",
                    border: `1px solid ${isLulus ? "#A7F3D0" : "#FECACA"}`,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ fontSize: 30, marginBottom: 8 }}>
                    {isLulus ? "🎓" : "📄"}
                  </div>

                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 600,
                      color: isLulus ? "#065F46" : "#991B1B",
                    }}
                  >
                    {isLulus
                      ? "ANDA DINYATAKAN LULUS"
                      : "BELUM DINYATAKAN LULUS"}
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      marginTop: 6,
                      color: isLulus ? "#065F46" : "#991B1B",
                    }}
                  >
                    {isLulus
                      ? "Selamat atas pencapaianmu 🎉"
                      : "Silakan hubungi pihak sekolah untuk informasi lebih lanjut"}
                  </div>
                </div>
                {isLulus && (
                  <div
                    style={{
                      marginTop: 18,
                      fontSize: 11,
                      color: "#777",
                      textAlign: "center",
                      lineHeight: 1.6,
                    }}
                  >
                    Selamat atas kelulusan Anda.
                    <br />
                    Perjalanan selama tiga tahun telah dilalui dengan baik,
                    semoga menjadi awal yang baik untuk masa depan Anda.
                  </div>
                )}
                {/* BUTTON */}
                <div style={{ marginTop: 22 }}>
                  {isLulus && (
                    <button
                      onClick={() => generateSurat(data)}
                      style={{
                        width: "100%",
                        padding: 13,
                        borderRadius: 12,
                        border: "none",
                        background: "linear-gradient(135deg,#22C55E,#16A34A)",
                        color: "#fff",
                        fontWeight: 600,
                        marginBottom: 10,
                        cursor: "pointer",
                        transition: "0.2s",
                      }}
                      onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
                      onMouseLeave={(e) => (e.target.style.opacity = "1")}
                    >
                      📄 Lihat Surat Kelulusan
                    </button>
                  )}

                  <button
                    onClick={() => (window.location.href = "/profile")}
                    style={{
                      width: "100%",
                      padding: 13,
                      borderRadius: 12,
                      border: "1px solid #E5E7EB",
                      background: "#fff",
                      color: "#555",
                      cursor: "pointer",
                    }}
                  >
                    ← Kembali ke Profil
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* CONFETTI HUJAN */}
      {showConfetti &&
        [...Array(120)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "fixed",
              top: "-10px",
              left: Math.random() * 100 + "%",
              width: Math.random() * 6 + 4 + "px",
              height: Math.random() * 6 + 4 + "px",
              background: `hsl(${Math.random() * 360}, 80%, 60%)`,
              opacity: 0.9,
              borderRadius: "2px",
              animation: `confettiFall ${
                Math.random() * 2 + 2
              }s linear ${Math.random() * 1}s forwards`,
            }}
          />
        ))}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform: translateY(30px); }
          to { opacity:1; transform: translateY(0); }
        }
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>

      {/* FOOTER */}
      <div
        style={{
          background: "#166534",
          marginTop: "20%",
          padding: "26px 20px",
          textAlign: "center",
          color: "#BBF7D0",
        }}
      >
        <div style={{ fontSize: "13px", fontWeight: 500 }}>
          SMK Diponegoro Cipari · Tahun Pelajaran 2025 / 2026
        </div>
        <div style={{ fontSize: "11px", opacity: 0.8 }}>
          Sistem Pengumuman Kelulusan
        </div>
      </div>
    </div>
  );
}
