import Link from "next/link";

export default function Sidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ),
      href: "/dashboard",
    },
    {
      title: "Students",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      href: "/students",
      active: true,
    },
    {
      title: "Courses",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      href: "/courses",
    },
  ];

  return (
    <div className="bg-white w-64 min-h-screen border-r border-gray-200">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">Student MS</h2>
      </div>
      <nav className="mt-2">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors ${
              item.active
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                : ""
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
