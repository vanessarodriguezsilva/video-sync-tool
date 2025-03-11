import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Guardar el token en el localStorage
        localStorage.setItem('token', data.token);

        // ✅ Redirigir al dashboard
        router.push('/dashboard');
      } else {
        alert(data.message || 'Error en el login');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Error en el servidor');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-primary text-center">Iniciar Sesión</h2>
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
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
