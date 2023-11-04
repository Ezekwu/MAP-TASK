import { Question, Bell } from '@phosphor-icons/react';
import { useGetUserProfile } from '../../api/queries';
import UiAvatar from '../ui/UiAvatar';

export default function ActivityPanel() {
  const uid = localStorage.getItem('uid')!;
  const { data: user } = useGetUserProfile(uid);
  return (
    <div className="w-full h-full pt-4">
      <div className="flex justify-end gap-4 items-center">
        <Question size={20} />
        <Bell size={20} />
        <UiAvatar />
      </div>

      <div className="flex w-full items-center text-center flex-col mt-16">
        <UiAvatar size="lg" />
        <div className="text-md mt-4 text-gray-500 font-semibold">
          {user?.name}
        </div>
        <div className="text-sm text-gray-300 capitalize">{user?.role}</div>
      </div>

      <div className="mt-12">
        <h3 className="text-gray-500 text-md font-semibold">Messages</h3>
      </div>
    </div>
  );
}
