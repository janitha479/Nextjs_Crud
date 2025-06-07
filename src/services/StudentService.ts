import { Student, ApiResponse } from '../models/StudentModel';

const API_BASE = 'http://127.0.0.1:8000/api';

export class StudentService {
  static async getAllStudents(): Promise<Student[]> {
    const res = await fetch(`${API_BASE}/show-std`, {
      next: { revalidate: 10 },
    });
    const data: ApiResponse = await res.json();
    return data[1];
  }

  static async addStudent(student: Omit<Student, 'id' | 'created_at' | 'updated_at'>) {
    return await fetch(`${API_BASE}/store-std`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
  }

  static async updateStudent(id: number, data: Partial<Student>) {
    return await fetch(`${API_BASE}/update-std/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  static async deleteStudent(id: number) {
    return await fetch(`${API_BASE}/delete-std/${id}`, {
      method: 'DELETE',
    });
  }
    static async getStudentById(id: number): Promise<Student> {
        const res = await fetch(`${API_BASE}/show-std-byID/${id}`);
        const data: ApiResponse = await res.json();
        return data[1][0];
    }
}