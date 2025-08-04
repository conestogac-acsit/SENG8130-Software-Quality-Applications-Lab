import type { StorageService } from '../../localStorageService';
import type { Evaluation } from './type';

const EVALUATION_DATA_STORAGE_KEY = 'Evaluation_Data_Storage';

export function loadEvaluations(
  storageService: StorageService
): Evaluation[] {
  try {
    const data = storageService.load<Evaluation[]>(EVALUATION_DATA_STORAGE_KEY);
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
