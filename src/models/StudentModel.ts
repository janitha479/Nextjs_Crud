export interface Student {
  id: number;
  name: string;
  nic: string;
  course: string;
  contact: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  0: string;
  1: Student[];
}
