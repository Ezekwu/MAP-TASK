import AppLogo from '../assets/app-logo.svg';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="flex items-center h-screen bg-gray-50">
      <div className="max-w-lg mx-auto md:w-3/6 px-16 py-12 bg-white h-fit rounded-md">
        <div className="flex items-center mb-12 gap-2">
          <img src={AppLogo} alt="app logo" />
          <span className="text-lg text-gray-900 font-bold">Human R</span>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
