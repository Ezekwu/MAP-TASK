import { Question, Bell } from '@phosphor-icons/react';
import { useGetUserProfile } from '../../api/queries';
import UiAvatar from '../ui/UiAvatar';

export default function ActivityPanel() {
  const uid = localStorage.getItem('uid')!;
  const { data: user } = useGetUserProfile(uid);

  const messages = [
    {
      title: 'Cameron Williamson',
      subtitle: 'Have you sent out the test?',
    },
    {
      title: 'Jacob Jones',
      subtitle: 'The candidate has been shortlisted for the frontend role',
    },
  ];
  const jobs = [
    {
      title: 'Cameron Williamson',
      subtitle: 'Have you sent out the test?',
    },
    {
      title: 'Jacob Jones',
      subtitle: 'The candidate has been shortlisted for the frontend role',
    },
    {
      title: 'Jacob Jones',
      subtitle: 'The candidate has been shortlisted for the frontend role',
    },
  ];

  // Only been used in this component hence the local definition
  function InfoCard(props: { title: string; subtitle: string }) {
    return (
      <div className="bg-primary-10 p-4 rounded-md flex gap-2">
        <div>
          <UiAvatar />
        </div>
        <div className="w-3/5">
          <div className="text-sm font-semibold text-gray-500">
            {props.title}
          </div>
          <div className="line-clamp-1 truncate text-ellipsis text-xs text-gray-300">
            {props.subtitle}
          </div>
        </div>
      </div>
    );
  }
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
        <div className="grid gap-2 pt-6">
          {messages.map((message) => (
            <InfoCard title={message.title} subtitle={message.subtitle} />
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-gray-500 text-md font-semibold">
          Recently Added Jobs
        </h3>
        <div className="grid gap-2 pt-6">
          {jobs.map((job) => (
            <InfoCard title={job.title} subtitle={job.subtitle} />
          ))}
        </div>
      </div>
    </div>
  );
}
