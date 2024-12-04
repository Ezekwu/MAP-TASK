import { Outlet } from 'react-router-dom';

import TheSidebar from '@/components/layout/TheSidebar';
import { Icons } from '@/components/ui/UiIcon';
import OverviewIcon from '@/components/icons/OverviewIcon';
import MealIcon from '@/components/icons/MealIcon';
import CalendarIcon from '@/components/icons/CalendarIcon';

export interface Group {
  name: string;
  routes: Array<{
    path: string;
    name: string;
    icon: Icons;
  }>;
}

export default function AdminLayout() {
  const routeGroups = [
    {
      name: 'MAIN MENU',
      routes: [
        {
          path: '/admin',
          icon: OverviewIcon,
          name: 'Overview',
        },
        {
          path: '/admin/meals',
          icon: MealIcon,
          name: 'Meals',
        },
        {
          path: '/admin/payments',
          icon: MealIcon,
          name: 'Payments',
        },
        {
          path: '/admin/schedules',
          icon: CalendarIcon,
          name: 'Schedules',
        },
      ],
    },
  ];

  return (
    <div className="flex">
      <div className="hidden md:block">
        <TheSidebar isAdmin routeGroups={routeGroups} />
      </div>
      <div className="w-full  h-screen overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
