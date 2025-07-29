import { Student } from '../ParseCsvService/ParseCsv'
import { LocalStorage } from '../localStorageService/LocalStorage'

const STUDENT_FILENAME_STORAGE_KEY = 'studentFilename';
const STUDENT_DATA_STORAGE_KEY = 'studentData';

export class StudentCsvHandler {
  static saveDataToFile(fileName: string, data: Student[]): void {
    console.log(`Saving student data to CSV file ${fileName}`, data);
  }
}
export function createSaveUploadedStudentData(
  storageService = new LocalStorage(),
  csvHandler = StudentCsvHandler
) {
  return (data: Student[], fileName: string): void => {
    try {
      storageService.save(STUDENT_DATA_STORAGE_KEY, data);
      storageService.save(STUDENT_FILENAME_STORAGE_KEY, fileName);
      csvHandler.saveDataToFile(fileName, data);
    } catch (error) {
      console.error('Failed to save uploaded student data:', error);
    }
  };
}