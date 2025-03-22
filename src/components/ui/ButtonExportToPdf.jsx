import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "flowbite-react";

export default function ButtonExportToPdf({ elementId, filename = "document" }) {
  const handleDownload = async () => {
    const targetElement = document.getElementById(elementId);

    if (!targetElement) {
      console.error("Target element not found");
      return;
    }

    try {
      // Create canvas from the target element
      const canvas = await html2canvas(targetElement, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? "portrait" : "landscape",
        unit: "mm",
      });

      // Add image to PDF
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // Download PDF
      pdf.save(`${filename}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
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
