import AppLogo from '../assets/images/logo.png';
import SignUpImg from '../assets/images/sign-up-image.png';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="flex overflow-y-auto h-screen">
      <div className="w-full h-screen md:w-[50%] lg:w-[55%] box-border">
        <div className="flex items-center gap-2 py-4 sm:py-7 px-4 sm:px-5 mb-5 md:mb-10 2xl:mb-20">
          <span className="text-2xl">🥦</span>
          <h2 className="text-xl leading-10 font-semibold text-gray-1000">
            Eatrite
          </h2>{' '}
        </div>
        <div className="sm:max-w-[450px] px-4 box-border mx-auto pb-5">
          <Outlet />
        </div>
      </div>
      <div className="hidden md:block md:w-[50%] lg:w-[45%] h-screen p-3 fixed -z-10 right-0">
        {/* TODO: this should be a slideshow of some of our foods/reviews */}
        <div
          className="relative w-full h-full bg-no-repeat bg-center bg-cover rounded-2xl"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(${SignUpImg})`,
          }}
        >
          <p className="absolute bottom-6 right-0 left-0 mx-auto w-[80%] max-w-[320px] text-white text-center text-xs leading-5">
            Garden Harvest Platter, Golden Grain Salad, Orchard Bounty Bowl,
            Spring Green Salad, Berry Delight
          </p>
        </div>
      </div>
    </div>
  );
}
