import { useMemo } from 'react';

import { Link, useLocation } from 'react-router-dom';

import AvatarMale from '@/assets/avatar-male.jpeg';
import MapLogo from '@/assets/map-logo-full.svg';

import RouteType from '@/types/enum/RouteType';

import UiAvatar from '../ui/UiAvatar';
import UiRouteDropdownMenu from '../ui/UiRouteDropdownMenu';
import UiIcon, { Icons } from '../ui/UiIcon';

//--

interface BaseRoute {
  path: string;
  label: string;
  icon?: Icons;
  notifications?: number;
}

interface NormalRoute extends BaseRoute {
  type: RouteType.NORMAL;
}

interface DropdownRoute extends BaseRoute {
  type: RouteType.DROPDOWN;
  subRoutes: BaseRoute[];
}

type SidebarRoute = NormalRoute | DropdownRoute;

//--

export default function TheSidebar() {
  const location = useLocation();

  const currentRoute = location.pathname;

  const routes: SidebarRoute[] = [
    {
      label: 'Dashboard',
      path: '',
      type: RouteType.NORMAL,
      icon: 'DashboardIcon',
    },
    {
      label: 'Inventory',
      path: '',
      type: RouteType.NORMAL,
      icon: 'Box',
    },
    {
      label: 'Procurement',
      path: '/procurement',
      type: RouteType.DROPDOWN,
      icon: 'Cart',
      subRoutes: [
        {
          label: 'Quotes',
          path: '/procurement/quotes',
        },
        {
          label: 'Orders',
          path: '/procurement/orders',
        },
      ],
    },
    {
      label: 'Finance',
      path: '/finance',
      type: RouteType.DROPDOWN,
      icon: 'Money',
      subRoutes: [
        {
          label: 'Overview',
          path: '/finance/overview',
        },
        {
          label: 'Reports',
          path: '/finance/reports',
        },
      ],
    },
    {
      label: 'Communication',
      path: '',
      type: RouteType.NORMAL,
      icon: 'Chats',
      notifications: 10,
    },
    {
      label: 'Calendar',
      path: '',
      type: RouteType.NORMAL,
      icon: 'CalendarAlt',
      notifications: 10,
    },
    {
      label: 'Contracts',
      path: '',
      type: RouteType.NORMAL,
      icon: 'SignDoc',
    },
  ];

  const linkStyles = useMemo(() => {
    return `h-10 rounded-[4px] flex items-center justify-between py-3 px-4 fill-tertiary-400 hover:bg-primary-300`;
  }, []);

  function isActiveRoute(route: string) {
    return currentRoute === route;
  }

  return (
    <nav className="hidden md:flex h-screen bg-primary-100 w-[272px] px-6 pt-8 flex-col ">
      <div className="mb-6 flex justify-center">
        <img src={MapLogo} width={193} alt="Eatrite logo" />
      </div>
      <section className="custom-sidebar flex-1 overflow-y-auto flex flex-col justify-between">
        <ul className="flex flex-col gap-1">
          {routes.map((route, index) => {
            if (route.type === RouteType.NORMAL) {
              return (
                <li key={index}>
                  <Link className={linkStyles} to={route.path}>
                    <div className="flex items-center gap-3">
                      <UiIcon icon={route.icon!} />
                      <span className="text-tertiary-700 text-sm">
                        {route.label}
                      </span>
                    </div>
                    {route.notifications && route.notifications > 0 && (
                      <span className="bg-primary-500 text-white text-xs leading-none w-7 h-4 rounded-lg flex items-center justify-center font-medium">
                        {route.notifications}
                      </span>
                    )}
                  </Link>
                </li>
              );
            } else {
              return (
                <UiRouteDropdownMenu
                  icon={route.icon!}
                  label={route.label}
                  subRoutes={route.subRoutes}
                  currentRoute={currentRoute}
                />
              );
            }
          })}
        </ul>
      </section>
      <section className="w-full pt-8">
        <ul className="mb-[30px]">
          <li>
            <Link className={linkStyles} to="">
              <div className="flex items-center gap-3">
                <UiIcon icon="QuestionCircle" />
                <span className="text-tertiary-700">Support</span>
              </div>
            </Link>
          </li>
          <li>
            <Link className={linkStyles} to="">
              <div className="flex items-center gap-3">
                <UiIcon icon="QuestionCircle" />
                <span className="text-tertiary-700">Settings</span>
              </div>
            </Link>
          </li>
        </ul>
        <div className="flex pb-11 gap-2 items-center">
          <UiAvatar size="md" avatar={AvatarMale} />
          <div className="flex flex-col">
            <span className="text-sm text-tertiary-900 font-bold">
              Mark Benson
            </span>
            <span className="text-sm text-tertiary-600 w-[132px] truncate overflow-hidden">
              markbenson@coremed.com
            </span>
          </div>
        </div>
      </section>
    </nav>
  );
}
