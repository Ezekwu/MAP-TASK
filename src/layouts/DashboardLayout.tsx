import { Outlet } from 'react-router-dom';
import { useUserQuery } from '../api/query/useUserQuery';
import TheSidebar, { Group } from '../components/layout/TheSidebar';
import UiLoader from '../components/ui/UiLoader';
import SupportIcon from '@/components/icons/SupportIcon';
import CogIcon from '@/components/icons/CogIcon';
import OverviewIcon from '@/components/icons/OverviewIcon';
import CalendarIcon from '@/components/icons/CalendarIcon';
import MealIcon from '@/components/icons/MealIcon';

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
          icon: OverviewIcon,
        },
        {
          path: '/calendar',
          name: 'Calendar',
          icon: CalendarIcon,
        },
        {
          path: '/plans',
          name: 'Meal plans',
          icon: MealIcon,
        },
      ],
    },
    {
      name: 'MORE',
      routes: [
        {
          path: '/support',
          name: 'Support',
          icon: SupportIcon,
        },
        {
          path: '/settings',
          name: 'Settings',
          icon: CogIcon,
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
