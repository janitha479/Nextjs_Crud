"use client";
import { useState, useEffect } from "react";
import { Student } from "../models/StudentModel";
import { StudentController } from "../controllers/StudentController";
import LoadingSpinner from "../components/LoadingSpinner";
import Alert from "@/components/Alert";
import ConfirmationModal from "@/components/ConfirmationModal";
import StudentFormModal from "@/components/StudentFormModal";
import Sidebar from "@/components/Sidebar";

type StudentFormData = {
  name: string;
  nic: string;
  course: string;
  contact: string;
};

const initialFormState: StudentFormData = {
  name: "",
  nic: "",
  course: "",
  contact: "",
};

export default function StudentDashboard() {
  // UI State
  const [students, setStudents] = useState<Student[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<StudentFormData>(initialFormState);
  const [alert, setAlert] = useState<{
    show: boolean;
    type: "success" | "error" | "info";
    message: string;
    subMessage?: string;
  }>({
    show: false,
    type: "success",
    message: "",
    subMessage: "",
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    show: boolean;
    studentId: number | null;
  }>({
    show: false,
    studentId: null,
  });

  // Data Fetching
  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const data = await StudentController.getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error loading students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Form Handlers
  const resetForm = () => {
    setFormData(initialFormState);
    setCurrentStudent(null);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    resetForm();
  };

  // Action Handlers
  const showAlert = (
    type: "success" | "error" | "info",
    message: string,
    subMessage?: string
  ) => {
    setAlert({ show: true, type, message, subMessage });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await StudentController.createStudent(formData);
      closeModals();
      await fetchStudents();
      showAlert(
        "success",
        "Student Added",
        "New student has been successfully added."
      );
    } catch (error) {
      showAlert("error", "Error", "Failed to add student.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStudent?.id) return;

    try {
      setIsLoading(true);
      await StudentController.updateStudent(currentStudent.id, formData);
      closeModals();
      await fetchStudents();
      showAlert(
        "success",
        "Student Updated",
        "Student details have been successfully updated."
      );
    } catch (error) {
      showAlert("error", "Error", "Failed to update student.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (student: Student) => {
    setCurrentStudent(student);
    setFormData({
      name: student.name,
      nic: student.nic,
      course: student.course,
      contact: student.contact,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteConfirmation.studentId) return;

    try {
      setIsLoading(true);
      await StudentController.deleteStudent(deleteConfirmation.studentId);
      await fetchStudents();
      showAlert(
        "success",
        "Student Deleted",
        "Student has been successfully removed."
      );
    } catch (error) {
      showAlert("error", "Error", "Failed to delete student.");
    } finally {
      setIsLoading(false);
      setDeleteConfirmation({ show: false, studentId: null });
    }
  };

  // Form Input Handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        {alert.show && (
          <Alert
            type={alert.type}
            message={alert.message}
            subMessage={alert.subMessage}
            onClose={() => setAlert({ ...alert, show: false })}
          />
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={deleteConfirmation.show}
          onClose={() =>
            setDeleteConfirmation({ show: false, studentId: null })
          }
          onConfirm={handleDelete}
          title="Delete Student"
          message="Are you sure you want to delete this student? This action cannot be undone."
          isLoading={isLoading}
        />

        {/* Student Form Modals */}
        <StudentFormModal
          isOpen={isAddModalOpen}
          onClose={closeModals}
          onSubmit={handleAddSubmit}
          title="Add New Student"
          formData={formData}
          onChange={handleInputChange}
          isLoading={isLoading}
          submitLabel="Save"
        />

        <StudentFormModal
          isOpen={isEditModalOpen}
          onClose={closeModals}
          onSubmit={handleEditSubmit}
          title="Edit Student"
          formData={formData}
          onChange={handleInputChange}
          isLoading={isLoading}
          submitLabel="Update"
        />

        {/* Dashboard Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Student Management
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage and track student information
                </p>
              </div>
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center gap-2 shadow-sm transition-colors"
                onClick={() => setIsAddModalOpen(true)}
                disabled={isLoading}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Student
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Students Table Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Student Directory
                </h2>
                {isLoading && <LoadingSpinner />}
              </div>
            </div>

            {/* Table with Loading State */}
            <div className="relative">
              {isLoading && students.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                  <LoadingSpinner />
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        NIC
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.length === 0 && !isLoading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center">
                            <svg
                              className="w-12 h-12 text-gray-400 mb-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                              />
                            </svg>
                            <p className="text-gray-500 text-lg mb-2">
                              No students found
                            </p>
                            <p className="text-gray-400 text-sm">
                              Get started by adding your first student
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      students.map((student) => (
                        <tr
                          key={student.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{student.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <span className="text-blue-600 font-medium text-sm">
                                  {student.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {student.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.nic}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              {student.course}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.contact}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              className="text-blue-600 hover:text-blue-900 disabled:text-blue-300 mr-4 transition-colors"
                              onClick={() => handleEdit(student)}
                              disabled={isLoading}
                            >
                              Edit
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900 disabled:text-red-300 transition-colors"
                              onClick={() =>
                                setDeleteConfirmation({
                                  show: true,
                                  studentId: student.id,
                                })
                              }
                              disabled={isLoading}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
