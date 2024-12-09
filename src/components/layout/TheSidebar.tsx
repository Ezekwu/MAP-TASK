import { Link, useLocation } from 'react-router-dom';

import { useUserQuery } from '@/api/query/useUserQuery';

import EatriteLogo from '@/assets/EatriteLogo.svg';

import IconProps from '@/types/IconProps';

import TokenHandler from '@/utils/TokenHandler';
import { getUserFullName } from '@/utils/helpers';

import UiAvatar from '../ui/UiAvatar';
import UiButton from '../ui/UiButton';
import UiIcon from '../ui/UiIcon';

//--

export interface Group {
  name: string;
  routes: Array<{
    path: string;
    name: string;
    icon: React.ComponentType<IconProps>;
  }>;
}

interface Props {
  routeGroups: Group[];
  isAdmin?: boolean;
}
export default function TheSidebar(props: Props) {
  const location = useLocation();

  const activeRoute = location.pathname;

  const {
    query: { data: user },
  } = useUserQuery(TokenHandler.getToken());

  function isActiveRoute(route: string) {
    return activeRoute === route;
  }

  function logUserOut() {
    localStorage.removeItem('uid');
    window.location.reload();
  }

  return (
    <nav className="hidden md:flex h-screen bg-navigation-background w-60 pr-4 flex-col">
      <div className="py-8 px-6 flex justify-center">
        <img src={EatriteLogo} width={110} alt="Eatrite logo" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul>
          {props.routeGroups.map((group, index) => (
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
                        isActiveRoute(route.path)
                          ? 'bg-navigation-active text-typography-base border-l-navigation-active-border stroke-secondary-1500'
                          : 'text-typography-inactive hover:text-typography-base'
                      } h-12 py-2 px-6 flex items-center gap-4 rounded-r-lg text-sm border-l-[5px] font-semibold`}
                    >
                      <route.icon
                        fillColor={
                          isActiveRoute(route.path) ? '#E2AC64' : '#DBD7D1'
                        }
                        strokeColor={
                          isActiveRoute(route.path) ? '#101413' : '#585755'
                        }
                      />
                      <span>{route.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full mb-12 flex items-center  justify-between text-typography-base text-sm pl-6">
        <div className="flex gap-2 items-center">
          <UiAvatar size="sm" avatar={user?.profile_img as string} />
          <span className="text-sm text-typography-base font-medium">
            {props.isAdmin ? 'Eatrite Admin' : `${getUserFullName(user)}`}
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
