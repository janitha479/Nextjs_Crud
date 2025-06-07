import { StudentService } from '../services/StudentService';
import { Student } from '../models/StudentModel';

export class StudentController {
  static async getStudents() {
    try {
      return await StudentService.getAllStudents();
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  }

  static async createStudent(studentData: Omit<Student, 'id' | 'created_at' | 'updated_at'>) {
    try {
      return await StudentService.addStudent(studentData);
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  }

  static async updateStudent(id: number, studentData: Partial<Student>) {
    try {
      return await StudentService.updateStudent(id, studentData);
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  }

  static async deleteStudent(id: number) {
    try {
      return await StudentService.deleteStudent(id);
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  }
}