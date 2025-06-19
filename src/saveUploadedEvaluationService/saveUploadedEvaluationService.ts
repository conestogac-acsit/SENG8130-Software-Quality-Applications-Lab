import type { Evaluation } from '../Evaluation/Service/EvaluationService';

const EVALUATION_DATA_STORAGE_KEY = 'evaluationData';
const EVALUATION_FILENAME_STORAGE_KEY = 'evaluationFilename';

function saveToStorage(key: string, value: any): void {
  console.log(Saved key "${key}" with value:, value);
}


const CsvHandler = {
  saveDataToFile(fileName: string, data: Evaluation[]): void {
    console.log(Saving data to CSV file "${fileName}", data);
  },
};


export const saveUploadedEvaluationData = (data: Evaluation[], fileName: string): void => {
  saveToStorage(EVALUATION_DATA_STORAGE_KEY, data);
  saveToStorage(EVALUATION_FILENAME_STORAGE_KEY, fileName);
  CsvHandler.saveDataToFile(fileName, data);
}; 