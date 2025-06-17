import type { Doo } from './saveUploadedEvaluationService'; 

const EVALUATION_DATA_STORAGE_KEY = 'evaluationData';
const EVALUATION_FILENAME_STORAGE_KEY = 'evaluationFilename';

let storage: Record<string, any> = {};
let csvOutput: { fileName: string; data: Doo[] } | null = null;

function saveToStorage(key: string, value: any) {
  storage[key] = value;
}

const CsvHandler = {
  saveDataToFile(fileName: string, data: Doo[]) {
    csvOutput = { fileName, data };
  }
};
