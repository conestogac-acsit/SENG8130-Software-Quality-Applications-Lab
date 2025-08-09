import { exportEvaluationReportToPDF } from "./PdfGenerator";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

jest.mock("jspdf", () => {
  return jest.fn().mockImplementation(() => ({
    addImage: jest.fn(),
    save: jest.fn(),
    internal: { pageSize: { getWidth: () => 210 } },
  }));
});

jest.mock("html2canvas", () =>
  jest.fn(() =>
    Promise.resolve({
      toDataURL: () => "mock-image-data",
      width: 1000,
      height: 1400,
    })
  )
);

describe("exportEvaluationReportToPDF", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="pdf-container">
        <p>Mock Report</p>
      </div>
    `;
  });

  it("should call html2canvas and jsPDF to save PDF", async () => {
    await exportEvaluationReportToPDF("pdf-container", "test-report.pdf");

    expect(html2canvas).toHaveBeenCalled();
    expect(jsPDF).toHaveBeenCalled();

    const pdfInstance = (jsPDF as unknown as jest.Mock).mock.results[0].value;
    expect(pdfInstance.addImage).toHaveBeenCalledWith(
      "mock-image-data",
      "PNG",
      0,
      0,
      210,
      expect.any(Number)
    );
    expect(pdfInstance.save).toHaveBeenCalledWith("test-report.pdf");
  });

  it("should log an error if element is not found", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    await exportEvaluationReportToPDF("missing-id", "nope.pdf");
    expect(consoleSpy).toHaveBeenCalledWith('Element with id "missing-id" not found.');
    consoleSpy.mockRestore();
  });
});