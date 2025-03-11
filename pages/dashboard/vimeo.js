import DashboardLayout from '../../components/DashboardLayout';

export default function Vimeo() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">📹 Vimeo</h1>
      <p className="text-gray-700 mt-2">Aquí puedes gestionar tus videos de Vimeo.</p>
    </div>
  );
}

Vimeo.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
