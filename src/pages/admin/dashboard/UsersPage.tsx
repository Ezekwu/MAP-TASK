import { useTranslation } from 'react-i18next';

import BasePage from '@/components/layout/BasePage';
import UiTable from '@/components/ui/UiTable';
import { useUsersQuery } from '@/api/query/useUsersQuery';
import { useMemo } from 'react';
import UiAvatar from '@/components/ui/UiAvatar';
import UiImagePreview from '@/components/ui/UiImageView';
import { formatTimestampToDateTime } from '@/utils/helpers';

export default function UsersPage() {
  const { t } = useTranslation();

  const {
    query: { data },
  } = useUsersQuery();

  const headers = [
    {
      title: t('titles.name'),
      query: 'name',
    },
    {
      title: t('titles.email'),
      query: 'email',
    },
    {
      title: t('titles.phone-number'),
      query: 'phone_number',
    },
    {
      title: t('titles.address'),
      query: 'address',
    },
    {
      title: t('titles.status'),
      query: 'status',
    },
    {
      title: t('titles.plan'),
      query: 'plan',
    },
    {
      title: t('titles.createdAt'),
      query: 'createdAt',
    },
    {
      title: t('titles.actions'),
      query: 'actions',
    },
  ];

  const usersData = useMemo(() => {
    if (!data) return [];

    return data.map((user) => ({
      ...user,
      email: <span className="lowercase">{user.email}</span>,
      name: (
        <div className="flex items-center gap-1.5">
          {user.profile_img ? (
            <img
              src={user.profile_img as string}
              alt="Eatrite user"
              className="w-7 h-7 rounded-full"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-primary-500" />
          )}
          <span>{`${user.first_name} ${user.last_name}`}</span>
        </div>
      ),
      address: `${user.location.home_address}, ${user.location.local_government}`,
      createdAt: `${formatTimestampToDateTime(user.createdAt)}`,
    }));
  }, [data]);

  return (
    <BasePage navDetails={{ title: t('pages.users') }}>
      <UiTable data={usersData} headers={headers} />
    </BasePage>
  );
}
