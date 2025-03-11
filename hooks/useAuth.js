import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));

      if (!decoded.username || !decoded.role) {
        throw new Error('Token inválido');
      }

      setUser(decoded);
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [router]);

  return user;
}
