import { Calendar, SignOut, SquaresFour } from '@phosphor-icons/react';
import { Link, useLocation } from 'react-router-dom';

import EatriteLogo from '../../assets/EatriteLogo.svg';
import UiIcon, { Icons } from '../ui/UiIcon';

interface Group {
  name: string;
  routes: Array<{
    path: string;
    name: string;
    icon: Icons;
  }>;
}

export default function TheSidebar() {
  const location = useLocation();

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
          path: '/calendar',
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

  const activeRoute = location.pathname;

  function logUserOut() {
    localStorage.removeItem('uid');
    window.location.reload();
  }

  return (
    <nav className="hidden relative md:block h-screen bg-navigation-background w-60 pr-4">
      <div className="py-8 px-6 mb-6">
        <img src={EatriteLogo} alt="Eatrite logo" />
      </div>

      <ul>
        {routeGroups.map((group, index) => (
          <li key={index} className="mb-4">
            <div className="w-4/5 mx-auto p-2 text-[10px] text-typography-muted font-semibold">
              {group.name}
            </div>
            <ul>
              {group.routes.map((route, index) => (
                <li key={index}>
                  <Link
                    to={route.path}
                    className={`${
                      activeRoute === route.path
                        ? 'bg-navigation-active text-typography-base border-l-navigation-active-border'
                        : 'text-typography-inactive hover:text-typography-base'
                    }  h-12 py-2 px-6 flex items-center gap-4 rounded-r-lg text-sm border-l-[5px] font-semibold`}
                  >
                    <UiIcon icon={route.icon} />
                    <span>{route.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
        <li
          className="h-12 p-0 cursor-pointer w-full mb-12 absolute bottom-0 flex border-l-4 text-gray-900 text-sm border-transparent hover:text-danger hover:border-danger hover:bg-danger-10 items-start mt-1"
          onClick={logUserOut}
        >
          <div className="h-12 flex items-center gap-4 w-4/5 mx-auto">
            <SignOut size={20} />
            <span>Log out</span>
          </div>
        </li>
      </ul>
    </nav>
  );
}
