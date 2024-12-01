import { Outlet } from 'react-router-dom';

import TheSidebar from '@/components/layout/TheSidebar';
import { Icons } from '@/components/ui/UiIcon';

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
          icon: 'Overview',
          name: 'Overview',
        },
        {
          path: '/admin/meals',
          icon: 'Meal',
          name: 'Meals',
        },
        {
          path: '/admin/payments',
          icon: 'Meal',
          name: 'Payments',
        },
        {
          path: '/admin/schedules',
          icon: 'Calendar',
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
