import {shouldDisplayAlerts} from './AlertUtils';
import type { Evaluation } from '../../Evaluation/EvaluationService';


const makeEval = (dueDate: Date, instructor = 'Instructor A'): Evaluation => ({
  course: 'Course 1',
  title: 'Test Eval',
  type: 'Quiz',
  dueDate,
  instructor,
});