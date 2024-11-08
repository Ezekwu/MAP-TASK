import { Outlet } from 'react-router-dom';
import { useGetUserQuery } from '../api/query/useGetUserQuery';
import TheSidebar from '../components/layout/TheSidebar';
import UiLoader from '../components/ui/UiLoader';

export default function DashboardLayout() {
  const uid = localStorage.getItem('uid')!;
  const {
    query: { isLoading },
  } = useGetUserQuery(uid);

  return (
    <div className="flex">
      <div className="hidden md:block">
        <TheSidebar />
      </div>
      <div className="w-full  h-screen overflow-auto bg-primary-05">
        {isLoading ? <UiLoader /> : <Outlet />}
      </div>
    </div>
  );
}
