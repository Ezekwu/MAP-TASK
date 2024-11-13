import { Outlet } from 'react-router-dom';

import TheSidebar, { Group } from '@/components/layout/TheSidebar';

export default function AdminLayout() {
  const routeGroups: Group[] = [
    {
      name: 'Main Menu',
      routes: [
        {
          path: '/',
          icon: 'Overview',
          name: 'Overview',
        },
        {
          path: '/meals',
          icon: 'Meal',
          name: 'Meals',
        },
        {
          path: '/payments',
          icon: 'Meal',
          name: 'Payments',
        },
        {
          path: '/schedules',
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
