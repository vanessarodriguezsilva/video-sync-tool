import DashboardLayout from '../../components/DashboardLayout';

export default function Elai() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">🤖 Elai</h1>
      <p className="text-gray-700 mt-2">Aquí puedes gestionar tus videos generados con Elai.</p>
    </div>
  );
}

Elai.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
