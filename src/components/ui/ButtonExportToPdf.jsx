import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "flowbite-react";

export default function ButtonExportToPdf({ elementId, filename = "document" }) {
  const handleDownload = () => {
    const targetElement = document.getElementById(elementId);
    if (!targetElement) {
      alert("No table found in export area.");
      return;
    }

    // Get the table element
    const table = targetElement.querySelector("table");
    if (!table) {
      alert("No table found in export area.");
      return;
    }

    // Get the title (e.g. Hasil Perhitungan)
    const title = targetElement.querySelector("h2")?.innerText || "Exported Table";
    // Get the periode info (assume in a <p> under the <h2>)
    const periode = targetElement.querySelector("h2 + p")?.innerText || "";

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Add title
    doc.setFontSize(16);
    doc.text(title, 15, 20);

    // Add periode info below the title if available
    if (periode) {
      doc.setFontSize(12);
      doc.text(`Periode ${periode}`, 15, 28);
    }

    // Add table, adjust startY if periode info exists
    autoTable(doc, {
      html: table,
      startY: periode ? 36 : 28, // below the periode or title
      margin: { left: 15, right: 15 },
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
      didDrawPage: () => {
        // Optional: Add page number or other footer here
      },
    });

    doc.save(`${filename}.pdf`);
  };

  return (
    <Button
      onClick={handleDownload}
      className="bg-red-500 hover:bg-red-700 text-white"
    >
      Export to PDF
    </Button>
  );
}
