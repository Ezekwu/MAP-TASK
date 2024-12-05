import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Api } from '@/api';
import { useUsersQuery } from '@/api/query/useUsersQuery';

import useToggle from '@/hooks/useToggle';
import Plans from '@/types/enums/Plans';
import User from '@/types/User';
import { formatTimestampToDateTime } from '@/utils/helpers';

import BasePage from '@/components/layout/BasePage';
import UiDropDownMenu from '@/components/ui/UiDropdownMenu';
import UiTable from '@/components/ui/UiTable';
import ManageUserPlanModal from '@/components/user/ManageUserPlanModal';
import ViewUserModal from '@/components/user/ViewUserModal';
import UiFilter from '@/components/ui/UiFilter';
import FilterData from '@/types/FilterData';
import UiButton from '@/components/ui/UiButton';
import AddUserModal from '@/components/user/AddUserModal';

export default function UsersPage() {
  const { t } = useTranslation();

  const [selectedFilter, setSelectedFilter] = useState<FilterData>({
    key: '',
    value: null,
  });

  const { filteredData: data, setData: setUser } =
    useUsersQuery(selectedFilter);

  const [activeUserId, setActiveUserId] = useState('');

  const viewUserIsVisible = useToggle();
  const addUserIsVisible = useToggle();
  const manageUserPlanIsVisible = useToggle();
  const manageUserPlanIsLoading = useToggle();

  const userOptions = [
    {
      label: t('actions.view'),
      func: viewUser,
    },
    {
      label: t('actions.manage-plan'),
      func: manageUserPlan,
    },
  ];

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
      title: t('titles.plan'),
      query: 'plan',
    },
    {
      title: t('titles.date-joined'),
      query: 'createdAt',
    },
    {
      title: t('titles.actions'),
      query: 'actions',
    },
  ];

  const filterData = [
    {
      title: t('general.by-plan'),
      key: 'plan',
      options: [
        ...Object.values(Plans).map((plan) => ({
          label: t(`plans.${plan}`),
          value: plan,
        })),
      ],
    },
  ];

  const activeUser = useMemo(() => {
    return data?.find(({ id }) => id === activeUserId) || null;
  }, [activeUserId, data]);

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
      actions: <UiDropDownMenu options={userOptions} itemId={user.id} />,
      plan: t(`plans.${user.plan?.plan || 'no-active-plan'}`),
    }));
  }, [data]);

  const navDetails = {
    title: t('pages.users'),
    edgeNode: (
      <UiButton
        variant="secondary"
        size="lg"
        rounded="md"
        onClick={addUserIsVisible.on}
      >
        {t('actions.add-user')}
      </UiButton>
    ),
  };

  function manageUserPlan(userId: string) {
    setActiveUserId(userId);

    manageUserPlanIsVisible.on();
  }

  function viewUser(userId: string) {
    setActiveUserId(userId);

    viewUserIsVisible.on();
  }

  async function onChangeUserPlan(plan: Plans) {
    if (!data) return;

    if (!plan || !activeUserId) {
      console.error('plan and id are required fields');

      return;
    }

    if (!activeUser) {
      console.error('user not found');

      return;
    }

    manageUserPlanIsLoading.on();

    try {
      const startDate = Date.now();

      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      const newUser: User = {
        ...activeUser,
        plan: { plan, startDate, endDate: endDate.getTime() },
      };

      await Api.setUser(newUser);

      setUser(newUser);

      manageUserPlanIsVisible.off();
    } catch (err) {
      console.error(err);
    } finally {
      manageUserPlanIsLoading.off();
    }
  }

  function handleFilterChange(params: FilterData) {
    setSelectedFilter(params);
  }

  return (
    <BasePage navDetails={navDetails}>
      <UiTable
        data={usersData}
        headers={headers}
        controlsNode={
          <UiFilter
            data={selectedFilter}
            optionSections={filterData}
            onFilterChange={handleFilterChange}
          />
        }
      />
      <ManageUserPlanModal
        isOpen={manageUserPlanIsVisible.value}
        loading={manageUserPlanIsLoading.value}
        onClose={manageUserPlanIsVisible.off}
        onChangePlan={onChangeUserPlan}
      />

      {activeUser && (
        <ViewUserModal
          isOpen={viewUserIsVisible.value}
          user={activeUser}
          onClose={viewUserIsVisible.off}
        />
      )}
      <AddUserModal
        isOpen={addUserIsVisible.value}
        onClose={addUserIsVisible.off}
      />
    </BasePage>
  );
}
