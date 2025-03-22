import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "flowbite-react";

export default function ButtonExportToPdf({ elementId, filename = "document", onBeforePrint, onAfterPrint }) {
  const handleDownload = async () => {
    const targetElement = document.getElementById(elementId);

    if (!targetElement) {
      console.error("Target element not found");
      return;
    }

    try {
      // Call before print callback to prepare print view
      onBeforePrint?.();

      // Wait for DOM to update with print view
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Create canvas from the target element
      const canvas = await html2canvas(targetElement, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: targetElement.scrollWidth,
        windowHeight: targetElement.scrollHeight,
      });

      // Calculate dimensions
      const imgWidth = 190; // Slightly smaller than A4 width for margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF with proper orientation
      const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? "portrait" : "landscape",
        unit: "mm",
      });

      // Calculate center position
      const xPosition = (pdf.internal.pageSize.width - imgWidth) / 2;
      const yPosition = 10; // Add some top margin

      // Add image to PDF at centered position with high quality
      const imgData = canvas.toDataURL("image/png", 1.0);
      pdf.addImage(imgData, "PNG", xPosition, yPosition, imgWidth, imgHeight);

      // Download PDF
      pdf.save(`${filename}.pdf`);

      // Call after print callback to restore view
      onAfterPrint?.();
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      // Ensure we restore view even if there's an error
      onAfterPrint?.();
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
