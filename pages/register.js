import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, role: 'editor' }),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      alert('Error en el registro');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-primary text-center">Registro</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-text mb-2">Usuario</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-text mb-2">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition"
          >
            Registrarse
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="text-primary hover:underline">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
}
