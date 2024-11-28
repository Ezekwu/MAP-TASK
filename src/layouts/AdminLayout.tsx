import { Outlet } from 'react-router-dom';

import TheSidebar, { Group } from '@/components/layout/TheSidebar';

export default function AdminLayout() {
  const routeGroups: Group[] = [
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
          path: '/admin/users',
          icon: 'Users',
          name: 'Users',
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
      <div className="w-full h-screen overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
