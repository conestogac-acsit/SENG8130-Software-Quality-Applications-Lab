import { Student } from "./studentTypes";

export interface StudentDataSource {
  getAllStudents(): Student[];
}