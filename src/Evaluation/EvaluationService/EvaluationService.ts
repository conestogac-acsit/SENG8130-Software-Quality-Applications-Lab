import { StorageService } from '../../localStorageService';

export interface IEvaluationService {
  saveEvaluations(data: Evaluation[]): void;
  loadEvaluations(): Evaluation[];
}

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

export class EvaluationService implements IEvaluationService {
  storageService: StorageService;
  
  constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  saveEvaluations(data: Evaluation[]): void {
    try {
      this.storageService.save(EVALUATION_DATA_STORAGE_KEY, data);
    } catch (error) {
      console.error('Error saving student data:', error);
      throw new Error('Failed to save evaluations');
    }
  }
  
  loadEvaluations(): Evaluation[] {
    try {
      const data = this.storageService.load<Evaluation[]>(EVALUATION_DATA_STORAGE_KEY);
      if (data) {
        return data;
      } else {
        console.warn('No evaluations found in storage');
        return [];
      }
    } catch (error) {
      console.error('Failed to load evaluations:', error);
      throw new Error('Failed to load evaluations');
    }
    
  }
   deleteEvaluation(target: Evaluation): Evaluation[] {
    try {
      const data = this.loadEvaluations();
      const targetDate = new Date(target.dueDate).toDateString();

      const updated = data.filter(ev =>
        !(
          ev.title === target.title &&
          ev.course === target.course &&
          ev.type === target.type &&
          new Date(ev.dueDate).toDateString() === targetDate &&
          ev.instructor === target.instructor &&
          ev.campus === target.campus &&
          ev.weight === target.weight
        )
      );

      this.saveEvaluations(updated);
      return updated;
    } catch (error) {
      console.error('Failed to delete evaluation:', error);
      throw new Error('Failed to delete evaluation');
    }
  }
}