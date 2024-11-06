import { Outlet } from 'react-router-dom';
import { useGetUserProfile } from '../api/queries';
import ActivityPanel from '../components/layout/ActivityPanel';
import TheSidebar from '../components/layout/TheSidebar';
import UiLoader from '../components/ui/UiLoader';

export default function DashboardLayout() {
  const uid = localStorage.getItem('uid')!;
  const { isLoading } = useGetUserProfile(uid);

  return (
    <div className="flex">
      <div className="hidden md:block">
        <TheSidebar />
      </div>
      <div className="w-full md:w-5/6 h-screen overflow-auto bg-primary-05">
        {isLoading ? <UiLoader /> : <Outlet />}
      </div>
    </div>
  );
}
