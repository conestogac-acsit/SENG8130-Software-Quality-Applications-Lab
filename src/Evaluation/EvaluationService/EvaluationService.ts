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

  getEvaluationByCourseAndTitle(course: string, title: string): Evaluation | undefined {
    const evaluations = this.loadEvaluations();
    return evaluations.find(e => e.course === course && e.title === title);
  }

  rescheduleEvaluation(course: string, title: string, newDate: Date): boolean {
    const evaluations = this.loadEvaluations();
    const index = evaluations.findIndex(e => e.course === course && e.title === title);

    if (index === -1) {
      console.error(`Evaluation not found for course ${course}, title ${title}`);
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newDateCopy = new Date(newDate);
    newDateCopy.setHours(0, 0, 0, 0);

    if (isNaN(newDateCopy.getTime()) || newDateCopy < today) {
      console.warn('New due date is invalid or in the past.');
      return false;
    }

    evaluations[index].dueDate = newDateCopy;
    this.saveEvaluations(evaluations);
    return true;
  }

  clearAllEvaluations(): void {
    this.saveEvaluations([]);
  }
}