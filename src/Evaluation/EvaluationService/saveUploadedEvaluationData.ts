import { EvaluationService, Evaluation } from '../EvaluationService';
import { LocalStorage } from '../../localStorageService';

const EVALUATION_FILENAME_STORAGE_KEY = 'evaluationFilename';

export class CsvHandler {
  static saveDataToFile(fileName: string, data: Evaluation[]): void {
    console.log ('Saving data to CSV file "${fileName}"', data);
  }
}

export function createSaveUploadedEvaluationData(
  evaluationService = new EvaluationService(new LocalStorage()),
  storageService = new LocalStorage(),
  csvHandler = CsvHandler
) {
  return (data: Evaluation[], fileName: string): void => {
    try {
      evaluationService.saveEvaluations(data);
      storageService.save(EVALUATION_FILENAME_STORAGE_KEY, fileName);
      csvHandler.saveDataToFile(fileName, data);
    } catch (error) {
      console.error('Failed to save uploaded evaluation data:', error);
    }
  };
}