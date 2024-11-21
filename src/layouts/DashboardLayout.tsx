import { Outlet } from 'react-router-dom';
import { useUserQuery } from '../api/query/useUserQuery';
import TheSidebar, { Group } from '../components/layout/TheSidebar';
import UiLoader from '../components/ui/UiLoader';

export default function DashboardLayout() {
  const uid = localStorage.getItem('uid')!;

  const {
    query: { isLoading },
  } = useUserQuery(uid);

  const routeGroups: Group[] = [
    {
      name: 'MAIN MENU',
      routes: [
        {
          path: '/',
          name: 'Overview',
          icon: 'Overview',
        },
        {
          path: '/calendar',
          name: 'Calendar',
          icon: 'Calendar',
        },
        {
          path: '/plans',
          name: 'Meal plans',
          icon: 'Meal',
        },
      ],
    },
    {
      name: 'MORE',
      routes: [
        {
          path: '/support',
          name: 'Support',
          icon: 'CustomerSupport',
        },
        {
          path: '/settings',
          name: 'Settings',
          icon: 'Cog',
        },
      ],
    },
  ];

  return (
    <div className="flex">
      <div className="hidden md:block">
        <TheSidebar routeGroups={routeGroups} />
      </div>
      <div className="w-full  h-screen overflow-auto">
        {isLoading ? <UiLoader /> : <Outlet />}
      </div>
    </div>
  );
}
