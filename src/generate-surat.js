import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit"; // ✅ WAJIB

export const generateSurat = async (data) => {
  try {
    const existingPdfBytes = await fetch("/surat-lulus-v3.pdf").then((res) =>
      res.arrayBuffer(),
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // ✅ REGISTER FONTKIT
    pdfDoc.registerFontkit(fontkit);

    const page = pdfDoc.getPages()[0];

    // ambil font
    const fontBytes = await fetch("/times.ttf").then((res) =>
      res.arrayBuffer(),
    );

    const font = await pdfDoc.embedFont(fontBytes);

    // page.drawText("bahwa peserta didik dibawah ini:", {
    //   x: 110,
    //   y: 495, // ⬆️ sedikit di atas Nama
    //   size: 12,
    //   font,
    //   color: rgb(0, 0, 0),
    // });
    page.drawText(`Nama     : ${data.nama}`, {
      x: 107,
      y: 480,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText(`NISN     : ${data.nisn}`, {
      x: 107,
      y: 455,
      size: 12,
      font,
    });

    page.drawText(`Jurusan  : ${data.jurusan}`, {
      x: 107,
      y: 430,
      size: 12,
      font,
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    window.open(url);
  } catch (err) {
    console.error("Gagal generate surat:", err);
    alert("Gagal membuka surat");
  }
};
