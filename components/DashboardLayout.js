import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ Obtener datos del usuario desde el token
  const user = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`w-64 bg-primary text-white min-h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block fixed md:relative z-50`}>
        <div className="flex items-center justify-center h-16 bg-secondary">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>

        {/* Sidebar Items */}
        <nav className="mt-4">
          <a href="/dashboard" className={`block py-3 px-6 hover:bg-secondary transition ${router.pathname === '/dashboard' ? 'bg-secondary' : ''}`}>
            🏠 Home
          </a>
          <a href="/dashboard/vimeo" className={`block py-3 px-6 hover:bg-secondary transition ${router.pathname === '/dashboard/vimeo' ? 'bg-secondary' : ''}`}>
            📹 Vimeo
          </a>
          <a href="/dashboard/elai" className={`block py-3 px-6 hover:bg-secondary transition ${router.pathname === '/dashboard/elai' ? 'bg-secondary' : ''}`}>
            🤖 Elai
          </a>

          {/* ✅ Mostrar Users solo para admin y superadmin */}
          {user?.role === 'admin' || user?.role === 'superadmin' ? (
            <a href="/dashboard/users" className={`block py-3 px-6 hover:bg-secondary transition ${router.pathname === '/dashboard/users' ? 'bg-secondary' : ''}`}>
              👥 Users
            </a>
          ) : null}
        </nav>

        {/* ✅ Mostrar Nombre y Rol sobre el botón de Logout */}
        <div className="absolute bottom-16 left-0 w-full px-6">
          {user && (
            <>
              <p className="text-white-300 text-md uppercase">
                <strong>{user.username}</strong>
              </p>
              <p className="text-gray-100 text-sm">
                <strong>{user.role}</strong>
              </p>
            </>
          )}
        </div>

        {/* Logout */}
        <div className="absolute bottom-4 left-0 w-full">
          <button
            onClick={handleLogout}
            className="block w-full text-left py-3 px-6 hover:bg-red-600 transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-white shadow-md h-16 flex items-center px-4 justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden text-primary"
          >
            {isSidebarOpen ? '✖' : '☰'}
          </button>
          <h2 className="text-lg font-semibold text-text">Dashboard</h2>
          <button
            onClick={handleLogout}
            className="hidden md:block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
