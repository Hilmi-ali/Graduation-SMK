import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import * as XLSX from "xlsx";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const [selectedJurusan, setSelectedJurusan] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [failedUploads, setFailedUploads] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    nama: "",
    nisn: "",
    jurusan: "",
    status: "LULUS",
  });

  const styles = {
    container: {
      padding: "30px",
      background: "#0f172a",
      minHeight: "100vh",
      color: "#e2e8f0",
      fontFamily: "sans-serif",
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
    },

    title: {
      fontSize: "22px",
      fontWeight: "600",
    },

    actions: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    },

    btn: {
      padding: "10px 16px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "14px",
    },

    table: {
      marginTop: "20px",
    },

    row: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#1e293b",
      padding: "14px",
      borderRadius: "12px",
      marginBottom: "12px",
      transition: "0.2s",
    },

    rowHover: {
      background: "#334155",
    },

    userInfo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },

    img: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid #334155",
    },

    name: {
      fontWeight: "600",
      fontSize: "15px",
    },

    subText: {
      fontSize: "12px",
      color: "#94a3b8",
    },

    actionBtn: {
      padding: "6px 10px",
      width: "60px",
      color: "#e2e8f0",
      borderRadius: "6px",
      border: "none",
      marginLeft: "6px",
      cursor: "pointer",
      fontSize: "12px",
    },

    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    modal: {
      background: "#1e293b",
      padding: "25px",
      borderRadius: "14px",
      width: "400px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
    },

    modalTitle: {
      marginBottom: "15px",
      fontSize: "18px",
      fontWeight: "600",
    },

    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "12px",
      borderRadius: "8px",
      border: "1px solid #334155",
      background: "#0f172a",
      color: "white",
    },

    dropZone: {
      border: "2px dashed #475569",
      padding: "30px",
      textAlign: "center",
      borderRadius: "10px",
      cursor: "pointer",
      color: "#94a3b8",
    },

    footerBtn: {
      marginTop: "10px",
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: "none",
      fontWeight: "600",
      cursor: "pointer",
    },
  };
  // 🔥 FETCH DATA (CACHE + FIREBASE)
  const fetchData = async () => {
    const local = localStorage.getItem("students");

    if (local) {
      const parsed = JSON.parse(local);
      if (parsed.length > 0) {
        setStudents(parsed);
        console.log("⚡ cache");
        return;
      }
    }

    const snap = await getDocs(collection(db, "students"));
    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setStudents(data);
    localStorage.setItem("students", JSON.stringify(data));
    console.log("🔥 firebase");
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ➕ TAMBAH / EDIT
  const handleSubmit = async () => {
    if (!form.nama || !form.nisn) return alert("Nama & NISN wajib!");

    // cek duplikat
    const exists = students.find(
      (s) => s.nisn === form.nisn && s.id !== editId,
    );
    if (exists) return alert("NISN sudah ada!");

    if (editId) {
      await updateDoc(doc(db, "students", editId), form);

      const updated = students.map((s) =>
        s.id === editId ? { ...s, ...form } : s,
      );

      setStudents(updated);
      localStorage.setItem("students", JSON.stringify(updated));
    } else {
      const docRef = await addDoc(collection(db, "students"), form);

      const newData = [...students, { id: docRef.id, ...form }];

      setStudents(newData);
      localStorage.setItem("students", JSON.stringify(newData));
    }

    setForm({ nama: "", nisn: "", jurusan: "", status: "LULUS" });
    setEditId(null);
    setShowModal(null);
  };

  // ❌ HAPUS
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "students", id));

    const filtered = students.filter((s) => s.id !== id);

    setStudents(filtered);
    localStorage.setItem("students", JSON.stringify(filtered));
  };

  // ✏️ EDIT
  const handleEdit = (s) => {
    setForm(s);
    setEditId(s.id);
    setShowModal("add");
  };
  // 🔒 TOGGLE STATUS LULUS / DITAHAN
  const toggleStatus = async (student) => {
    const newStatus = student.status === "LULUS" ? "DITAHAN" : "LULUS";

    await updateDoc(doc(db, "students", student.id), {
      status: newStatus,
    });

    const updated = students.map((s) =>
      s.id === student.id ? { ...s, status: newStatus } : s,
    );

    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
  };

  // 📊 UPLOAD EXCEL
  const handleExcel = async (file) => {
    if (!selectedJurusan) {
      return alert("Pilih jurusan dulu!");
    }

    setLoading(true);

    const data = await file.arrayBuffer();
    const wb = XLSX.read(data, { raw: false });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    let newStudents = [...students];

    for (const s of json) {
      const nama = (s.nama || "").trim();
      const nisn = (s.nisn || "").trim();

      if (!nama || !nisn) continue;

      const exists = newStudents.find((st) => st.nisn === nisn);
      if (exists) continue;

      const docRef = await addDoc(collection(db, "students"), {
        nama,
        nisn,
        jurusan: selectedJurusan,
        status: "LULUS",
      });

      newStudents.push({
        id: docRef.id,
        nama,
        nisn,
        jurusan: selectedJurusan,
        status: "LULUS",
      });
    }

    setStudents(newStudents);
    localStorage.setItem("students", JSON.stringify(newStudents));

    setLoading(false);

    // 🔥 TARUH DI SINI
    setSelectedJurusan("");
    setShowModal(null);

    alert("Upload Excel berhasil!");
  };

  // 📸 UPLOAD FOTO
  const handleFoto = async (files) => {
    setLoading(true);
    setUploadedCount(0);
    setFailedUploads([]);
    setUploadProgress(0);

    const studentsMap = {};
    students.forEach((s) => {
      studentsMap[s.nisn] = s.id;
    });

    // ambil hanya gambar
    const validFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/"),
    );

    // 🔥 hanya ambil file yang cocok NISN
    const matchedFiles = validFiles.filter((file) => {
      const nisn = file.name.split(".")[0];
      return studentsMap[nisn];
    });

    setTotalFiles(matchedFiles.length);

    // ❌ kalau tidak ada yang cocok
    if (matchedFiles.length === 0) {
      setLoading(false);
      return alert("❌ Tidak ada foto yang cocok dengan NISN siswa!");
    }

    // ⚠️ info saja (bukan error)
    if (matchedFiles.length < validFiles.length) {
      console.warn("Beberapa file tidak cocok dengan NISN siswa");
    }

    let updatedStudents = [...students];
    let failed = [];

    for (let i = 0; i < matchedFiles.length; i++) {
      const file = matchedFiles[i];
      const fileName = file.name;
      const nisn = fileName.split(".")[0];

      let success = false;
      let attempt = 0;

      // 🔁 retry max 3x
      while (!success && attempt < 3) {
        try {
          attempt++;

          // 🔥 resize image
          const compressed = await resizeImage(file);

          const storageRef = ref(storage, `students/${fileName}`);
          await uploadBytes(storageRef, compressed);

          const url = await getDownloadURL(storageRef);

          await updateDoc(doc(db, "students", studentsMap[nisn]), {
            foto: url,
          });

          updatedStudents = updatedStudents.map((s) =>
            s.nisn === nisn ? { ...s, foto: url } : s,
          );

          success = true;
        } catch (err) {
          console.error(`Retry ${attempt} gagal:`, fileName);

          if (attempt === 3) {
            failed.push(fileName);
          }
        }
      }

      // 🔥 update progress
      setUploadedCount((prev) => prev + 1);
      setUploadProgress(Math.round(((i + 1) / matchedFiles.length) * 100));
    }

    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    setLoading(false);
    setShowModal(null);
    setFailedUploads(failed);

    if (failed.length > 0) {
      alert(`⚠️ ${failed.length} file gagal upload`);
    } else {
      alert("✅ Upload foto berhasil!");
    }
  };

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 500;

        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/jpeg",
          0.7, // compress 70%
        );
      };

      reader.readAsDataURL(file);
    });
  };

  // pilih 1
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // pilih semua
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map((s) => s.id));
    }
    setSelectAll(!selectAll);
  };
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return alert("Pilih data dulu!");

    if (!window.confirm("Yakin ingin menghapus data terpilih?")) return;
    setLoading(true);

    for (const id of selectedIds) {
      await deleteDoc(doc(db, "students", id));
    }

    const filtered = students.filter((s) => !selectedIds.includes(s.id));

    setStudents(filtered);
    localStorage.setItem("students", JSON.stringify(filtered));

    setSelectedIds([]);
    setSelectAll(false);
    setLoading(false);
  };
  const handleDeleteAll = async () => {
    if (!window.confirm("Hapus SEMUA data? Ini tidak bisa dibatalkan!")) return;

    setLoading(true);

    for (const s of students) {
      await deleteDoc(doc(db, "students", s.id));
    }

    setStudents([]);
    localStorage.removeItem("students");

    setSelectedIds([]);
    setSelectAll(false);
    setLoading(false);
  };
  const filteredStudents = students
    .filter((s) => s.nama.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const order = { AKL: 1, TJKT: 2 };

      // urutkan berdasarkan jurusan dulu
      if (order[a.jurusan] !== order[b.jurusan]) {
        return (order[a.jurusan] || 99) - (order[b.jurusan] || 99);
      }

      // kalau jurusan sama, baru urut nama A-Z
      return a.nama.localeCompare(b.nama);
    });

  const primary = "#2563eb"; // biru elegan
  const danger = "#dc2626"; // merah clean
  const neutral = "#334155"; // abu modern

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Dashboard Admin {loading && "⏳"}</h2>

        <div style={styles.actions}>
          <button
            style={{ ...styles.btn, background: neutral, color: "white" }}
            onClick={() => setShowModal("add")}
          >
            + Tambah
          </button>

          <button
            style={{ ...styles.btn, background: neutral, color: "white" }}
            onClick={() => setShowModal("excel")}
          >
            Upload Excel
          </button>

          <button
            style={{ ...styles.btn, background: neutral, color: "white" }}
            onClick={() => setShowModal("foto")}
          >
            Upload Foto
          </button>
          <button
            style={{ ...styles.btn, background: primary, color: "white" }}
            onClick={handleSelectAll}
          >
            {selectAll ? "Batal Pilih" : "Pilih Semua"}
          </button>

          <button
            style={{ ...styles.btn, background: danger, color: "white" }}
            onClick={handleDeleteSelected}
          >
            Hapus Terpilih ({selectedIds.length})
          </button>

          <button
            style={{ ...styles.btn, background: danger, color: "white" }}
            onClick={handleDeleteAll}
          >
            Hapus Semua
          </button>
        </div>
      </div>

      <div style={styles.table}>
        {filteredStudents.map((s) => (
          <div key={s.id} style={styles.row}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* CHECKBOX */}
              <input
                type="checkbox"
                checked={selectedIds.includes(s.id)}
                onChange={() => toggleSelect(s.id)}
              />

              <div style={styles.userInfo}>
                <img
                  src={s.foto || "https://via.placeholder.com/50"}
                  style={styles.img}
                />
                <div>
                  <div style={styles.name}>{s.nama}</div>
                  <div style={styles.subText}>
                    {s.nisn} • {s.jurusan || "-"}
                  </div>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>
                    ID: {s.id}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              {/* STATUS BADGE */}
              <span
                style={{
                  fontSize: "11px",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  marginRight: "8px",
                  background: s.status === "LULUS" ? "#14532D" : "#7F1D1D",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                {s.status || "LULUS"}
              </span>

              {/* TOGGLE STATUS */}
              <button
                style={{
                  ...styles.actionBtn,
                  background: s.status === "LULUS" ? "#f59e0b" : "#22c55e",
                }}
                onClick={() => toggleStatus(s)}
              >
                {s.status === "LULUS" ? "Tahan" : "Luluskan"}
              </button>

              <button
                style={{ ...styles.actionBtn, background: "#2563eb" }}
                onClick={() => handleEdit(s)}
              >
                Edit
              </button>

              <button
                style={{
                  ...styles.actionBtn,
                  background: "#dc2626",
                  color: "white",
                }}
                onClick={() => handleDelete(s.id)}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            {showModal === "add" && (
              <>
                <h3>Tambah / Edit Siswa</h3>
                <input
                  style={styles.input}
                  placeholder="Nama"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                />
                <input
                  style={styles.input}
                  placeholder="NISN"
                  value={form.nisn}
                  onChange={(e) => setForm({ ...form, nisn: e.target.value })}
                />
                <input
                  style={styles.input}
                  placeholder="Jurusan"
                  value={form.jurusan}
                  onChange={(e) =>
                    setForm({ ...form, jurusan: e.target.value })
                  }
                />
                <select
                  style={styles.input}
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="LULUS">LULUS</option>
                  <option value="DITAHAN">DITAHAN</option>
                </select>
                <button onClick={handleSubmit}>Simpan</button>
              </>
            )}

            {showModal === "excel" && (
              <div>
                <h3 style={{ marginBottom: "10px" }}>Upload Data Siswa</h3>

                {/* DROPDOWN JURUSAN */}
                <select
                  style={styles.input}
                  value={selectedJurusan}
                  onChange={(e) => setSelectedJurusan(e.target.value)}
                >
                  <option value="">Pilih Jurusan</option>
                  <option value="TJKT">TJKT</option>
                  <option value="AKL">AKL</option>
                </select>

                {/* UPLOAD FILE */}
                <div style={styles.dropZone}>
                  <input
                    type="file"
                    accept=".xlsx"
                    onChange={(e) => handleExcel(e.target.files[0])}
                  />
                  <p style={{ marginTop: "10px", fontSize: "12px" }}>
                    Upload file Excel berisi nama & NISN
                  </p>
                </div>
              </div>
            )}

            {showModal === "foto" && (
              <div
                style={styles.dropZone}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFoto(e.dataTransfer.files);
                }}
              >
                <p>📂 Drag & Drop Folder Foto di sini</p>
                <p>atau klik untuk pilih folder</p>

                <input
                  type="file"
                  webkitdirectory="true"
                  directory=""
                  multiple
                  style={{ marginTop: "10px" }}
                  onChange={(e) => handleFoto(e.target.files)}
                />
              </div>
            )}

            <button onClick={() => setShowModal(null)}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}
