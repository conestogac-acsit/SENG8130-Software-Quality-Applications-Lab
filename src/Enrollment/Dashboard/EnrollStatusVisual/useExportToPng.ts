import { toPng } from 'html-to-image';
import download from 'downloadjs';

export const useExportToPng = (elementId: string) => {
  const exportImage = () => {
    const element = document.getElementById(elementId);
    if (element) {
      toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      })
        .then(dataUrl => download(dataUrl, `${elementId}.png`))
        .catch(err => {
          console.error('Export failed:', err);
          alert('Export failed. Please try again.');
        });
    } else {
      console.error('Element not found:', elementId);
      alert('Target element not found.');
    }
  };

  return exportImage;
};
