import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Profile() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const local = JSON.parse(localStorage.getItem("student"));

        // ❌ kalau tidak ada localStorage
        if (!local || !local.nisn) {
          console.error("Data login tidak ditemukan");
          return;
        }

        // 🔥 ambil data fresh dari Firebase
        const q = query(
          collection(db, "students"),
          where("nisn", "==", local.nisn),
        );

        const snap = await getDocs(q);

        if (!snap.empty) {
          const freshData = snap.docs[0].data();

          // ✅ update state
          setData(freshData);
          console.log("FOTO URL (firebase):", freshData.foto);

          // ✅ update localStorage biar sinkron
          localStorage.setItem("student", JSON.stringify(freshData));
        } else {
          // fallback ke local kalau firebase kosong
          setData(local);
        }
      } catch (err) {
        console.error("Gagal ambil data:", err);

        // fallback aman
        const local = JSON.parse(localStorage.getItem("student"));
        setData(local);
      }
    };

    loadData();
  }, []);

  if (!data) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#F7F6F2",
          fontFamily: "DM Sans, sans-serif",
          color: "#666",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F6F2",
        fontFamily: "DM Sans, sans-serif",
      }}
    >
      {/* NAVBAR (STICKY) */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#166534",
          padding: "16px 36px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <div>
          <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
            SMK DIPONEGORO CIPARI
          </div>
          <div style={{ color: "#BBF7D0", fontSize: 11 }}>
            Tahun Pelajaran 2025 / 2026
          </div>
        </div>

        <div
          style={{
            fontSize: 11,
            background: "#DCFCE7",
            color: "#166534",
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
          padding: "50px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            background: "#fff",
            borderRadius: 24,
            border: "1px solid #EDEBE4",
            overflow: "hidden",
            boxShadow: "0 25px 60px rgba(0,0,0,0.05)",
            animation: "fadeUp 0.6s ease",
          }}
        >
          {/* HEADER PROFILE */}
          <div
            style={{
              padding: "34px 24px 26px",
              textAlign: "center",
              background: "linear-gradient(180deg, #F0FDF4 0%, #FAFAF8 100%)",
              borderBottom: "1px solid #EDEBE4",
            }}
          >
            <div
              style={{
                position: "relative",
                width: 90,
                height: 90,
                margin: "0 auto 14px",
              }}
            >
              {/* RING ANIMASI */}
              <div
                style={{
                  position: "absolute",
                  top: -5,
                  left: -5,
                  width: "calc(100% + 10px)",
                  height: "calc(100% + 10px)",
                  borderRadius: "50%",
                  border: "2px solid #166534",
                  animation: "pulseRing 2.5s ease-in-out infinite",
                }}
              />

              {/* FOTO */}
              <img
                src={data?.foto && data.foto !== "" ? data.foto : "/avatar.png"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/avatar.png";
                }}
                alt="Foto Siswa"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #fff",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                }}
              />
            </div>

            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#1C1B18",
              }}
            >
              {data.nama}
            </div>
          </div>

          {/* CONTENT */}
          <div style={{ padding: 24 }}>
            {/* INFO */}
            <div
              style={{
                background: "#ECFDF5",
                border: "1px solid #BBF7D0",
                borderRadius: 14,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                📢 Informasi Kelulusan
              </div>
              <div
                style={{
                  fontSize: 12,
                  marginTop: 6,
                  color: "#065F46",
                }}
              >
                Hasil kelulusan sudah tersedia. Klik tombol di bawah untuk
                melihat hasil resmi Anda.
              </div>
            </div>

            {/* META */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                background: "#F9FAFB",
                borderRadius: 12,
                padding: "12px 14px",
                marginBottom: 12,
                fontSize: 12,
              }}
            >
              <span style={{ color: "#777" }}>📅 Pengumuman</span>
              <b>4 Mei 2026</b>
            </div>

            {/* DETAIL */}
            <div
              style={{
                background: "#F9FAFB",
                borderRadius: 14,
                padding: 16,
                marginBottom: 14,
                fontSize: 12,
                color: "#444",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span style={{ color: "#888" }}>NISN</span>
                <b>{data.nisn}</b>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span style={{ color: "#888" }}>Jurusan</span>
                <b>{data.jurusan}</b>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: 2,
                  borderTop: "1px dashed #E5E7EB",
                }}
              >
                <span style={{ color: "#888" }}>Tahun Ajaran</span>
                <b>2025 / 2026</b>
              </div>
            </div>

            {/* PESAN */}
            <div
              style={{
                fontSize: 12,
                color: "#666",
                textAlign: "center",
                marginBottom: 20,
                lineHeight: 1.6,
              }}
            >
              Terima kasih atas perjuangan selama 3 tahun.
              <br />
              Semoga hasil terbaik menyertai langkah Anda.
            </div>

            {/* BUTTON */}
            <button
              onClick={() => navigate("/result")}
              style={{
                width: "100%",
                padding: 13,
                borderRadius: 10,
                border: "none",
                background: "#166534",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: 10,
                transition: "0.2s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#14532D")}
              onMouseOut={(e) => (e.target.style.background = "#166534")}
            >
              Cek Kelulusan
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                border: "1px solid #EDEBE4",
                background: "#fff",
                color: "#666",
                cursor: "pointer",
              }}
            >
              Kembali
            </button>
          </div>
        </div>
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
          @keyframes pulseRing {
        0% {
            transform: scale(1);
            opacity: 0.5;
        }
        50% {
            transform: scale(1.03);
            opacity: 0.9;
        }
        100% {
            transform: scale(1);
            opacity: 0.5;
        }
        }
      `}</style>
      {/* FLOATING WA ADMIN */}
      <a
        href="https://wa.me/6282223954383"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#166534",
          color: "white",
          padding: "12px 16px",
          borderRadius: "50px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          textDecoration: "none",
          fontSize: "12px",
          fontWeight: "500",
          boxShadow: "0 8px 20px rgba(0,0,0.2,0.45)",
          zIndex: 999,
          transition: "0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        💬 Bantuan
      </a>
    </div>
  );
}
