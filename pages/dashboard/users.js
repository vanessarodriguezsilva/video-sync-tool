import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/DashboardLayout';

export default function Users() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const decoded = JSON.parse(atob(token.split('.')[1]));
    setCurrentUser(decoded);

    if (decoded.role !== 'admin' && decoded.role !== 'superadmin') {
      router.push('/dashboard');
      return;
    }

    // ✅ Usar variable global para el endpoint
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [router]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(users.filter((user) => user._id !== id));
  };

  const handleRoleChange = async (id, role) => {
    const token = localStorage.getItem('token');
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });

    setUsers(
      users.map((user) =>
        user._id === id ? { ...user, role } : user
      )
    );
  };

  if (!currentUser) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">👥 Users</h1>
      <table className="w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-secondary text-white">
            <th className="py-2 px-4">Username</th>
            {currentUser.role === 'superadmin' && (
              <th className="py-2 px-4">Password</th>
            )}
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="py-2 px-4">{user.username}</td>
              {currentUser.role === 'superadmin' && (
                <td className="py-2 px-4">
                  {user.password ? '********' : 'No disponible'}
                </td>
              )}
              <td className="py-2 px-4">
                {currentUser.role === 'superadmin' && user._id !== currentUser.id ? (
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="lector">Lector</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Superadmin</option>
                  </select>
                ) : currentUser.role === 'admin' && user.role !== 'superadmin' ? (
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="lector">Lector</option>
                    <option value="editor">Editor</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className="py-2 px-4">
                {currentUser.role === 'superadmin' && user._id !== currentUser.id && (
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Users.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
