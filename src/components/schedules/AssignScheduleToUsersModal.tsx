import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Api } from '@/api';
import { useUsersQuery } from '@/api/query/useUsersQuery';

import useToggle from '@/hooks/useToggle';

import Plans from '@/types/enums/Plans';

import { getUserFullName } from '@/utils/helpers';
import { Toast } from '@/utils/toast';

import UiAvatar from '../ui/UiAvatar';
import UiButton from '../ui/UiButton';
import UiIconCheckMark from '../ui/UiIconCheckmark';
import UiModal from '../ui/UiModal';
import UiScrollableTabs from '../ui/UiScrollableTabs';
import UiSearchInput from '../ui/UiSearchInput';

// ---

interface Props {
  scheduleId: string;
  isOpen: boolean;
  onClose: () => void;
}
export default function AssignScheduleToUsersModal({
  scheduleId,
  isOpen,
  onClose,
}: Props) {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState<string | null>('');
  const [selectedCategory, setSelectedCategory] = useState<Plans | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const loading = useToggle();

  const { filteredData: data } = useUsersQuery({
    filter: {
      key: 'plan',
      value: selectedCategory,
    },
    query: searchQuery,
  });

  const planOptions = useMemo(() => {
    return Object.values(Plans).map((plan) => ({
      label: (
        <div className="flex gap-3">
          <span>{t(`plans.${plan}`)}</span>
          <UiIconCheckMark value={plan === selectedCategory} />
        </div>
      ),
      value: plan,
    }));
  }, [selectedCategory]);

  function handleUserSelection(userId: string) {
    setSelectedUsers((ids) => {
      const indexOfUserId = ids.findIndex((id) => id === userId);

      if (indexOfUserId === -1) {
        return [...ids, userId];
      }

      return ids.filter((id) => id !== userId);
    });
  }

  async function assignSchedule() {
    try {
      loading.on();

      const today = dayjs();

      const startOfWeek = today.startOf('week');
      const startDate = startOfWeek.add(7, 'days').valueOf();

      const endDate = startOfWeek.add(13, 'days').endOf('day').valueOf();

      const requests = selectedUsers.map((userId) => {
        const assignment = {
          scheduleId,
          userId,
          id: `${userId}-${startDate}-${endDate}`,
          startDate,
          endDate,
          createdAt: Date.now(),
        };

        return Api.assignSchedule(assignment);
      });

      await Promise.all(requests);

      Toast.success({ msg: t('messages.schedules-assigned-to-users') });

      onClose();
    } catch (err) {
      console.error(err);
      Toast.error({ msg: t('errors.default') });
    } finally {
      loading.off();
    }
  }

  return (
    <UiModal
      isOpen={isOpen}
      title={t('modals.assign-users-to-schedule.title')}
      onClose={onClose}
    >
      <div className="p-4 border-b border-[#E3E3E8]">
        <UiSearchInput
          placeholder={t('placeholders.search-users')}
          onSearch={setSearchQuery}
        />
      </div>
      <div className="p-4">
        <h2 className="text-sm text-[#585B5A] mb-4">
          {t('titles.user-groups')}
        </h2>
        <UiScrollableTabs
          items={planOptions}
          onSelect={(selected) => setSelectedCategory(selected as Plans)}
        />
      </div>
      <div>
        {data.map((user) => (
          <button
            key={user.id}
            className="flex items-center justify-between border-b-dashed p-4 w-full"
            onClick={() => handleUserSelection(user.id)}
          >
            <div className="flex items-center gap-2">
              <UiAvatar avatar={user.profile_img as string} size="sm" />
              <span className="text-sm font-medium text-typography-base">
                {getUserFullName(user)}
              </span>
            </div>
            <UiIconCheckMark value={selectedUsers.includes(user.id)} />
          </button>
        ))}
      </div>
      <div className="p-4 border-t border-tertiary-700">
        <UiButton
          block
          size="lg"
          loading={loading.value}
          disabled={!selectedUsers.length}
          onClick={assignSchedule}
        >
          {t('actions.assign-users')}
        </UiButton>
      </div>
    </UiModal>
  );
}
