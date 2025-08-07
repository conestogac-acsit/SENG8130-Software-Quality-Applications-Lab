import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Exports the contents of a DOM element as a PDF file.
 *
 * @param elementId - The ID of the HTML element to convert to PDF
 * @param filename - The name of the resulting PDF file
 */
export async function exportEvaluationReportToPDF(
  elementId: string,
  filename: string = "evaluation-report.pdf"
): Promise<void> {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element with id "${elementId}" not found.`);
    return;
  }

  try {
    const canvas = await html2canvas(element as HTMLElement, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  } catch (error) {
    console.error("Failed to generate PDF:", error);
  }
}