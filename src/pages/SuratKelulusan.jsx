import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
  },

  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },

  section: {
    marginTop: 20,
    lineHeight: 1.6,
  },

  field: {
    marginTop: 10,
  },

  footer: {
    marginTop: 60,
    textAlign: "right",
  },
});

export default function SuratKelulusan() {
  const { nisn } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // ambil data dari localStorage (login siswa)
    const student = JSON.parse(localStorage.getItem("student"));

    // validasi biar sesuai nisn di URL
    if (student && student.nisn === nisn) {
      setData(student);
    }
  }, [nisn]);

  if (!data) return <div>Memuat surat...</div>;

  return (
    <PDFViewer width="100%" height="1000">
      <Document>
        <Page size="A4" style={styles.page}>
          {/* JUDUL */}
          <Text style={styles.title}>SURAT KETERANGAN LULUS</Text>

          {/* ISI */}
          <View style={styles.section}>
            <Text>
              Yang bertanda tangan di bawah ini, Kepala Sekolah SMK Diponegoro
              Cipari, menerangkan bahwa:
            </Text>

            <Text style={styles.field}>Nama : {data.nama}</Text>

            <Text style={styles.field}>NISN : {data.nisn}</Text>

            <Text style={styles.field}>Jurusan : {data.jurusan}</Text>

            <Text style={{ marginTop: 20 }}>
              Telah dinyatakan <strong>LULUS</strong> pada Tahun Pelajaran
              2025/2026.
            </Text>

            <Text style={{ marginTop: 20 }}>
              Demikian surat ini dibuat agar dapat dipergunakan sebagaimana
              mestinya.
            </Text>
          </View>

          {/* TTD */}
          <View style={styles.footer}>
            <Text>Kepala Sekolah</Text>
            <Text style={{ marginTop: 60 }}>_______________________</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
