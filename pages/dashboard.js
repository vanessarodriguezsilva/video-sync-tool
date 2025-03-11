import useAuth from '@/hooks/useAuth';
import DashboardLayout from '@/components/DashboardLayout';

export default function Dashboard() {
  const user = useAuth();

  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">Bienvenido, {user.username}</h1>
      <p className="text-gray-700 mt-2">Rol: {user.role}</p>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
