import {
  SquaresFour,
  ListBullets,
  UserList,
  SignOut,
  Calendar,
  Suitcase,
  Users,
  Chat,
} from '@phosphor-icons/react';
import { Link, useLocation } from 'react-router-dom';

import AppLogo from '../../assets/app-logo.svg';

export default function TheSidebar() {
  const location = useLocation();
  const routeGroups = [
    {
      name: 'Menu',
      routes: [
        {
          path: '/',
          name: 'Dashboard',
          icon: <SquaresFour size={20} />,
        },
        {
          path: '/calendar?',
          name: 'Message',
          icon: <Chat size={20} />,
        },
        {
          path: '/calendar',
          name: 'Calendar',
          icon: <Calendar size={20} />,
        },
      ],
    },
    {
      name: 'Recruitment',
      routes: [
        {
          path: '/tasks?',
          name: 'Jobs',
          icon: <Suitcase size={20} />,
        },
        {
          path: '/candidates',
          name: 'Candidates',
          icon: <Users size={20} />,
        },
        {
          path: '/candidates?',
          name: 'My Referrals',
          icon: <UserList size={20} />,
        },
        {
          path: '/tasks',
          name: 'Tasks',
          icon: <ListBullets size={20} />,
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
    <nav className="hidden relative md:block h-screen border-r-2 border-gray-25 w-64">
      <div className="flex items-center justify-center mb-16 gap-2 py-4">
        <img src={AppLogo} alt="school logo" />
        <span className="text-2xl text-gray-500 font-bold">Human R.</span>
      </div>

      <ul>
        {routeGroups.map((group, index) => (
          <li key={index}>
            <div className="w-4/5 mx-auto p-2 text-sm text-gray-500">
              {group.name}
            </div>
            <ul>
              {group.routes.map((route, index) => (
                <li className="my-2 " key={index}>
                  <Link
                    to={route.path}
                    className={`${
                      activeRoute === route.path
                        ? 'bg-primary text-white'
                        : 'text-gray-300 hover:bg-primary hover:text-white'
                    }  h-12 p-2 flex items-center gap-4 w-4/5 mx-auto rounded-lg text-sm `}
                  >
                    {route.icon}
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
