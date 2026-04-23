import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { OPEN_TIME } from "../config";

export default function Login() {
  const [nisn, setNisn] = useState("");
  const [timeLeft, setTimeLeft] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hovBtn, setHovBtn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = OPEN_TIME - now;

      if (diff <= 0) {
        setIsOpen(true);
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const ADMIN_PASSWORD = "hilmi24";

  const handleLogin = async () => {
    if (nisn === ADMIN_PASSWORD) {
      localStorage.setItem("role", "admin");
      window.location.href = "/admin";
      return;
    }

    const q = query(collection(db, "students"), where("nisn", "==", nisn));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data();
      localStorage.setItem("student", JSON.stringify(data));
      window.location.href = "/result";
    } else {
      alert("Data tidak ditemukan!");
    }
  };

  const G = "#166534";
  const GL = "#DCFCE7";
  const GM = "#86EFAC";
  const GD = "#14532D";
  const CREAM = "#F9F8F3";
  const WHITE = "#FFFFFF";
  const BORDER = "#E8E5DC";
  const TEXT1 = "#1A1917";
  const TEXT2 = "#6B6860";
  const TEXT3 = "#A8A59C";
  const GOLD = "#CA8A04";
  const GOLDL = "#FEF9C3";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Playfair+Display:wght@500;600&display=swap');*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }
        @keyframes tickFlip {
          0%   { opacity: 0; transform: translateY(-5px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .fu1 { animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .fu2 { animation: fadeUp 0.6s 0.1s cubic-bezier(0.22,1,0.36,1) both; }
        .fu3 { animation: fadeUp 0.6s 0.2s cubic-bezier(0.22,1,0.36,1) both; }
        .fu4 { animation: fadeUp 0.6s 0.3s cubic-bezier(0.22,1,0.36,1) both; }
        .fi  { animation: fadeIn 0.4s 0.05s both; }

        @media (max-width: 600px) {
          .m-hide { display: none !important; }
          .m-col  { flex-direction: column !important; }
          .m-full { width: 100% !important; }
          .m-px   { padding-left: 20px !important; padding-right: 20px !important; }
          .m-title { font-size: 28px !important; line-height: 1.25 !important; }
          .m-hero { padding: 52px 20px 60px !important; }
          .m-wrap { flex-wrap: wrap !important; gap: 8px !important; }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: CREAM,
          fontFamily: "'Plus Jakarta Sans', sans-serif;",
          color: TEXT1,
        }}
      >
        {/* ── NAVBAR ── */}
        <div
          style={{
            background: "#14532D",
            borderBottom: `1px solid ${BORDER}`,
            height: "60px",
            display: "flex",
            alignItems: "center",
            color: "white",
            justifyContent: "space-between",
            padding: "0 48px",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
          className="m-px"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "9px",
                background: G,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path
                  d="M8.5 2L15 5.8V11.2L8.5 15L2 11.2V5.8L8.5 2Z"
                  stroke="#fff"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
                <circle cx="8.5" cy="8.5" r="2" fill="rgba(255,255,255,0.45)" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#fff",
                  letterSpacing: "0.02em",
                }}
              >
                SMK DIPONEGORO CIPARI
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#fff",
                  letterSpacing: "0.04em",
                }}
              >
                CIPARI · JAWA TENGAH
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "26px" }} className="m-hide">
            {["Cari Nama", "Galeri", "Pesan"].map((l) => (
              <span
                key={l}
                style={{ fontSize: "13px", color: "#fff", cursor: "pointer" }}
              >
                {l}
              </span>
            ))}
          </div>

          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: GOLD,
              background: GOLDL,
              border: `1px solid #FDE68A`,
              padding: "5px 14px",
              borderRadius: "99px",
            }}
          >
            KELULUSAN 2026
          </div>
        </div>

        {/* ── HERO ── */}
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            padding: "80px 24px 72px",
            textAlign: "center",
          }}
          className="m-hero"
        >
          {/* live badge */}
          <div
            className="fi"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: GL,
              border: `1px solid ${GM}`,
              borderRadius: "99px",
              padding: "6px 16px",
              fontSize: "12px",
              fontWeight: 500,
              color: GD,
              marginBottom: "30px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: G,
                display: "inline-block",
                animation: "blink 2s ease-in-out infinite",
              }}
            />
            Pengumuman resmi kelulusan siswa 2026
          </div>

          {/* heading */}
          <h1
            className="fu1 m-title"
            style={{
              fontFamily: "'Playfair Display', serif;",
              fontSize: "48px",
              fontWeight: 500,
              lineHeight: 1.18,
              color: TEXT1,
              marginBottom: "18px",
            }}
          >
            Selamat kepada seluruh
            <br />
            <span style={{ color: G }}>lulusan</span>{" "}
            <span style={{ fontStyle: "bold", color: GD }}>angkatan 2026</span>
          </h1>

          {/* desc */}
          <p
            className="fu2"
            style={{
              fontSize: "15px",
              color: TEXT2,
              lineHeight: 1.75,
              maxWidth: "440px",
              margin: "0 auto 44px",
            }}
          >
            Tiga tahun perjalanan panjang telah usai. Hari ini adalah milik
            kalian — babak baru yang lebih besar menanti di depan.
          </p>

          {/* COUNTDOWN */}
          {!isOpen ? (
            <div className="fu3">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginBottom: "14px",
                }}
              >
                {[
                  { val: timeLeft.days ?? 0, label: "Hari" },
                  { val: timeLeft.hours ?? 0, label: "Jam" },
                  { val: timeLeft.minutes ?? 0, label: "Menit" },
                  { val: timeLeft.seconds ?? 0, label: "Detik" },
                ].map(({ val, label }, i) => (
                  <div
                    key={i}
                    style={{
                      background: WHITE,
                      border: `1px solid ${BORDER}`,
                      borderRadius: "16px",
                      padding: "22px 14px 14px",
                      minWidth: "84px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      key={val}
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif;",
                        fontSize: "38px",
                        fontWeight: 500,
                        color: G,
                        lineHeight: 1,
                        marginBottom: "6px",
                        animation: "tickFlip 0.18s ease",
                      }}
                    >
                      {String(val).padStart(2, "0")}
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        color: TEXT3,
                        textTransform: "uppercase",
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "12px", color: TEXT3 }}>
                Pengumuman akan segera dibuka
              </p>
            </div>
          ) : (
            /* LOGIN CARD */
            <div
              className="fu3"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                style={{
                  background: WHITE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: "20px",
                  padding: "28px",
                  width: "100%",
                  maxWidth: "400px",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "18px",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      background: GL,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle
                        cx="9"
                        cy="6"
                        r="2.8"
                        stroke={G}
                        strokeWidth="1.4"
                      />
                      <path
                        d="M3.5 15c0-3.04 2.46-5.5 5.5-5.5s5.5 2.46 5.5 5.5"
                        stroke={G}
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: TEXT1,
                      }}
                    >
                      Cek status kelulusanmu
                    </div>
                    <div style={{ fontSize: "11px", color: TEXT3 }}>
                      Masukkan NISN 10 digit
                    </div>
                  </div>
                </div>

                <div
                  style={{ display: "flex", gap: "8px", marginBottom: "12px" }}
                  className="m-col"
                >
                  <input
                    type="text"
                    placeholder="Nomor NISN kamu..."
                    value={nisn}
                    maxLength={10}
                    onChange={(e) => setNisn(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={{
                      flex: 1,
                      padding: "12px 14px",
                      border: `1px solid ${focused ? G : "#DEDAD2"}`,
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontFamily: "'Playfair Display', serif;",
                      color: TEXT1,
                      background: focused ? WHITE : "#FAFAF7",
                      outline: "none",
                      transition: "border-color 0.15s, background 0.15s",
                    }}
                  />
                  <button
                    onClick={handleLogin}
                    onMouseEnter={() => setHovBtn(true)}
                    onMouseLeave={() => setHovBtn(false)}
                    style={{
                      padding: "12px 22px",
                      borderRadius: "10px",
                      border: "none",
                      background: hovBtn ? GD : G,
                      color: WHITE,
                      fontSize: "13px",
                      fontWeight: 600,
                      fontFamily: "'Outfit', sans-serif",
                      cursor: "pointer",
                      transition: "background 0.15s",
                      whiteSpace: "nowrap",
                    }}
                    className="m-full"
                  >
                    Cek Sekarang
                  </button>
                </div>

                <p style={{ fontSize: "11px", color: TEXT3, lineHeight: 1.55 }}>
                  Data bersifat rahasia dan hanya bisa diakses oleh pemilik
                  NISN.
                </p>
              </div>
            </div>
          )}

          {/* STATS */}
          <div
            className="fu4"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "40px auto 0",
              maxWidth: "400px",
              background: WHITE,
              border: `1px solid ${BORDER}`,
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {[
              { num: "100+", label: "Siswa lulus" },
              { num: "100%", label: "Kelulusan" },
              { num: "2", label: "Jurusan" },
            ].map(({ num, label }, i, arr) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "20px 12px",
                  textAlign: "center",
                  borderRight:
                    i < arr.length - 1 ? `1px solid ${BORDER}` : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: "26px",
                    fontWeight: 500,
                    color: G,
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    color: TEXT3,
                    letterSpacing: "0.04em",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── INFO STRIP ── */}
        <div
          style={{
            background: G,
            padding: "18px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0",
            flexWrap: "wrap",
          }}
          className="m-px m-wrap"
        >
          {[
            "SMK Diponegoro Cipari",
            "Teknik Komputer & Jaringan",
            "Akuntansi & Keuangan Lembaga",
            "Angkatan 2026",
          ].map((t, i, arr) => (
            <span
              key={i}
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#BBF7D0",
                  letterSpacing: "0.03em",
                  padding: "0 20px",
                }}
              >
                {t}
              </span>
              {i < arr.length - 1 && (
                <span
                  className="m-hide"
                  style={{
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    background: "#4ADE80",
                    flexShrink: 0,
                  }}
                />
              )}
            </span>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <div
          style={{
            background: WHITE,
            borderTop: `1px solid ${BORDER}`,
            padding: "18px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
          className="m-px"
        >
          <span style={{ fontSize: "12px", color: TEXT3 }}>
            SMK Diponegoro Cipari · Tahun Pelajaran 2025 / 2026
          </span>
          <span style={{ fontSize: "12px", color: "#D4D1C8" }}>
            Sistem Pengumuman Kelulusan
          </span>
        </div>
      </div>
    </>
  );
}
