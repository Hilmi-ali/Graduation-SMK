import { useEffect, useState } from "react";

export default function Loading() {
  const [count, setCount] = useState(3);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    const prog = setInterval(() => {
      setProgress((prev) => prev + 10);
    }, 300);

    setTimeout(() => {
      window.location.href = "/result";
    }, 3500);

    return () => {
      clearInterval(countdown);
      clearInterval(prog);
    };
  }, []);

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg,#020617,#1e3a8a)",
      color: "white",
      flexDirection: "column",
    },
    card: {
      background: "rgba(255,255,255,0.08)",
      padding: "40px",
      borderRadius: "20px",
      backdropFilter: "blur(20px)",
      textAlign: "center",
      width: "380px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
    },
    title: {
      fontSize: "22px",
      marginBottom: "20px",
    },
    countdown: {
      fontSize: "60px",
      fontWeight: "bold",
      margin: "20px 0",
      color: "#60a5fa",
      animation: "pulse 1s infinite",
    },
    progressBar: {
      width: "100%",
      height: "10px",
      background: "rgba(255,255,255,0.2)",
      borderRadius: "10px",
      overflow: "hidden",
      marginTop: "20px",
    },
    progress: {
      height: "100%",
      width: `${progress}%`,
      background: "linear-gradient(90deg,#3b82f6,#22c55e)",
      transition: "0.3s",
    },
    text: {
      marginTop: "15px",
      fontSize: "14px",
      opacity: 0.8,
    },
  };
  const styleTag = document.createElement("style");
  styleTag.innerHTML = `
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}`;
  document.head.appendChild(styleTag);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Memproses Kelulusan...</h2>

        <div style={styles.countdown}>{count > 0 ? count : "🎓"}</div>

        <div style={styles.progressBar}>
          <div style={styles.progress}></div>
        </div>

        <p style={styles.text}>Mohon tunggu, sistem sedang mengambil data...</p>
      </div>
    </div>
  );
}
