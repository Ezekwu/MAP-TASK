import { Link, useLocation } from 'react-router-dom';

import EatriteLogo from '../../assets/EatriteLogo.svg';
import UiButton from '../ui/UiButton';
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

  const activeRoute = location.pathname;

  function logUserOut() {
    localStorage.removeItem('uid');
    window.location.reload();
  }

  return (
    <nav className="hidden md:flex h-screen bg-navigation-background w-60 pr-4  flex-col">
      {/* Logo section (fixed at the top) */}
      <div className="py-8 px-6">
        <img src={EatriteLogo} alt="Eatrite logo" />
      </div>

      {/* Navigation routes (takes up remaining space) */}
      <div className="flex-1 overflow-y-auto">
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
                      } h-12 py-2 px-6 flex items-center gap-4 rounded-r-lg text-sm border-l-[5px] font-semibold`}
                    >
                      <UiIcon icon={route.icon} />
                      <span>{route.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full mb-12 flex items-center justify-between text-typography-base text-sm pl-6">
        <div className="flex gap-2 items-center">
          <div className="rounded-full w-8 h-8 bg-neutral-600" />
          <span className="text-sm text-typography-base font-medium">
            Henry Eze
          </span>
        </div>
        <UiButton
          rounded="sm"
          variant="neutral"
          size="icon"
          onClick={logUserOut}
        >
          <UiIcon icon="Logout" size="12" />
        </UiButton>
      </div>
    </nav>
  );
}
