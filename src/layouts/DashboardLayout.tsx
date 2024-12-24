import { Outlet } from 'react-router-dom';
import TheSidebar from '../components/layout/TheSidebar';
import UiLoader from '../components/ui/UiLoader';

export default function DashboardLayout() {
  const uid = localStorage.getItem('uid')!;

  return (
    <div className="flex">
      <div className="hidden md:block">
        <TheSidebar />
      </div>
      <div className="w-full  h-screen overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
