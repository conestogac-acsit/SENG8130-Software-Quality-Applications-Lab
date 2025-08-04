import type { StorageService } from '../../localStorageService';
import type { IEvaluationService, Evaluation } from '../EvaluationService/type';
import { saveEvaluations } from './saveEvaluations';
import { loadEvaluations } from './loadEvaluations';

export class EvaluationService implements IEvaluationService {
  storageService: StorageService;

  constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  saveEvaluations(data: Evaluation[]): void {
    saveEvaluations(this.storageService, data);
  }

  loadEvaluations(): Evaluation[] {
    return loadEvaluations(this.storageService);
  }
}

export type { Evaluation };
