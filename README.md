# Student Management System

A modern web application built with Next.js and TypeScript for managing student information, integrated with a Laravel backend API.

## Overview

This Student Management System (SMS) provides an intuitive interface for managing student data, including their personal information, course enrollments, and contact details.

## Tech Stack

### Frontend
- **Next.js 15.3** - React framework with TypeScript support
- **TypeScript** - For type-safe code
- **Tailwind CSS** - For styling and responsive design
- **React Components** - Modular and reusable UI components

### Backend
- **Laravel API** ([janitha479/API_crud](https://github.com/janitha479/API_crud))
- RESTful API endpoints for CRUD operations
- MySQL database

## Features

- 📚 Student Management (CRUD operations)
- 🎓 Course Management
- 🔍 Real-time search and filtering
- 📱 Responsive design
- 🔒 Form validation
- ⚡ Fast and optimized performance

## Project Structure

```
src/
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── students/        # Student routes
├── components/          # Reusable UI components
├── controllers/         # Business logic
├── models/             # Data models
├── services/           # API services
└── views/              # Page components
```

## Getting Started

1. Clone the repository:
```bash
git clone gh repo clone janitha479/Nextjs_Crud
```

2. Install dependencies:
```bash
npm install
```

3. Clone and set up the backend API:
```bash
gh repo clone janitha479/API_crud
```

4. Configure environment variables:
Create a `.env.local` file with:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

5. Run the development server:
```bash
npm run dev
```

## API Integration

The frontend connects to a Laravel backend API that provides the following endpoints:

- `GET /api/show-std` - Fetch all students
- `POST /api/store-std` - Create new student
- `PUT /api/update-std/{id}` - Update student
- `DELETE /api/delete-std/{id}` - Delete student
- `GET /api/show-std-byID/{id}` - Fetch single student

## Components

- **StudentTable** - Main dashboard for student management
- **StudentFormModal** - Form for adding/editing students
- **ConfirmationModal** - For delete confirmations
- **Alert** - Toast notifications
- **Sidebar** - Navigation component
- **LoadingSpinner** - Loading state indicator

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[MIT License](LICENSE)
