import { Student } from "../models/StudentModel";
import LoadingSpinner from "./LoadingSpinner";

// Define the form data type
type FormDataType = {
  name: string;
  nic: string;
  course: string;
  contact: string;
};

interface FormField {
  name: keyof FormDataType; // Fix: Use FormDataType instead of initialFormData
  label: string;
  required: boolean;
  pattern?: string;
  title?: string;
}

const formFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    required: true,
  },
  {
    name: "nic",
    label: "NIC",
    required: true,
    pattern: "^[0-9]{9}[vVxX]|[0-9]{12}$",
    title: "Please enter a valid NIC number",
  },
  {
    name: "course",
    label: "Course",
    required: true,
  },
  {
    name: "contact",
    label: "Contact",
    required: true,
    pattern: "^[0-9]{10}$",
    title: "Please enter a valid 10-digit phone number",
  },
];

interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  title: string;
  formData: FormDataType; // Fix: Use the same type here
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  submitLabel: string;
}

export default function StudentFormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  formData,
  onChange,
  isLoading,
  submitLabel,
}: StudentFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-lg">
            <LoadingSpinner />
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          {formFields.map((field) => (
            <div key={field.name} className="space-y-1">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                id={field.name}
                type="text"
                name={field.name}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData[field.name]}
                onChange={onChange}
                disabled={isLoading}
                required={field.required}
                pattern={field.pattern}
                title={field.title}
              />
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isLoading}
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
