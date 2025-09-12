import { Evaluation, EvaluationService } from '../Evaluation/EvaluationService';
import { StorageService } from '../localStorageService/StorageService';

const EVALUATION_FILENAME_STORAGE_KEY = 'evaluationFilename';

export class CsvHandler {
  static saveDataToFile(fileName: string, data: Evaluation[]): void {
    console.log(`Saving CSV Data: ${fileName}`, data);
  }
}

export function createSaveUploadedEvaluationData(
  evaluationService: EvaluationService,
  storageService: StorageService,
  csvHandler: typeof CsvHandler
) {
  return (data: Evaluation[], fileName: string): void => {
    try {
      evaluationService.saveEvaluations(data); // Save evaluations to service
      storageService.save(EVALUATION_FILENAME_STORAGE_KEY, fileName); // Store filename
      csvHandler.saveDataToFile(fileName, data); // Handle CSV persistence
    } catch (error) {
      console.error('Failed to save uploaded evaluation data:', error);
    }
  };
}

export { EvaluationService, Evaluation };
