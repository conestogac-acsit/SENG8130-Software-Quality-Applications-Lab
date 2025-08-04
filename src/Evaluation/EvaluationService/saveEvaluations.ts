import type { StorageService } from '../../localStorageService';
import type { Evaluation } from './type';

const EVALUATION_DATA_STORAGE_KEY = 'Evaluation_Data_Storage';

export function saveEvaluations(
  storageService: StorageService,
  data: Evaluation[]
): void {
  try {
    storageService.save(EVALUATION_DATA_STORAGE_KEY, data);
  } catch (error) {
    console.error('Error saving evaluations:', error);
    throw new Error('Failed to save evaluations');
  }
}
