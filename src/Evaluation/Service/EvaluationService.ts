import { StorageService, LocalStorage } from '../../localStorageService';

export type EvaluationType =
  | "Assignment"
  | "Mid Exam"
  | "Quiz"
  | "Project"
  | "Practical Lab"
  | "Final Exam";

export interface Evaluation {
  course: string;
  title: string;
  type: EvaluationType;
  weight: number;
  dueDate: Date;
  instructor: string;
  campus: string;
}

const EVALUATION_DATA_STORAGE_KEY = 'Evaluation_Data_Storage';

export class EvaluationService {
  constructor(
    private storageService: StorageService
  ) {}

  static createDefault(): EvaluationService {
    const storage = new LocalStorage();
    return new EvaluationService(storage);
  }

  saveEvaluations(data: Evaluation[]): boolean {
    try {
      this.storageService.save(EVALUATION_DATA_STORAGE_KEY, data);
    } catch (error) {
      console.error('Error saving student data:', error);
      return false;
    }
    return true;
  }
  
  async loadEvaluations(): Promise<Evaluation[]> {
    try {
      const data = this.storageService.load<Evaluation[]>(EVALUATION_DATA_STORAGE_KEY);
      if (data) {
        return data;
      }
    } catch (error) {
      console.error('Failed to load evaluations:', error);
    }

    return [];
  }
}