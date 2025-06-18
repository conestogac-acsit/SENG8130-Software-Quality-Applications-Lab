export interface Doo {
  evaluationId: string;
  courseCode: string;
  evaluationType: string;
  dueDay: string;
}

const EVALUATION_DATA_STORAGE_KEY = 'evaluationData';
const EVALUATION_FILENAME_STORAGE_KEY = 'evaluationFilename';

function saveToStorage(key: string, value: any): void {
  console.log(Saved key "${key}" with value:, value);
}


const CsvHandler = {
  saveDataToFile(fileName: string, data: Doo[]): void {
    console.log(Saving data to CSV file "${fileName}", data);
  },
};


export const saveUploadedEvaluationData = (data: Doo[], fileName: string): void => {
  saveToStorage(EVALUATION_DATA_STORAGE_KEY, data);
  saveToStorage(EVALUATION_FILENAME_STORAGE_KEY, fileName);
  CsvHandler.saveDataToFile(fileName, data);
};