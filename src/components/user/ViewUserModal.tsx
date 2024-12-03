import { useTranslation } from 'react-i18next';

import { formatTimestampToDateTime } from '@/utils/helpers';

import User from '@/types/User';

import UiInput from '../ui/UiInput';
import UiModal from '../ui/UiModal';

interface Props {
  isOpen: boolean;
  user: User;
  onClose: () => void;
}
export default function ViewUserModal({ user, isOpen, onClose }: Props) {
  const { t } = useTranslation();

  return (
    <UiModal
      title={`${user.first_name} ${user.last_name}'s profile`}
      isOpen={isOpen}
      alignRight
      onClose={onClose}
    >
      <div className="flex items-center gap-1.5">
        {user.profile_img ? (
          <img
            src={user.profile_img as string}
            alt="Eatrite user"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-primary-500" />
        )}
        <div>
          <div className="text-sm font-medium">{`${user.first_name} ${user.last_name}`}</div>
          <div className="text-xs text-typography-inactive">
            {t(`plans.${user.plan?.plan || 'no-active-plan'}`)}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-6 gap-4">
        <UiInput
          name="first_name"
          label={t('fields.first-name')}
          disabled
          onChange={() => {}}
          value={user.first_name}
        />
        <UiInput
          name="last_name"
          label={t('fields.last-name')}
          disabled
          onChange={() => {}}
          value={user.last_name}
        />
        <UiInput
          name="email"
          label={t('fields.email')}
          disabled
          onChange={() => {}}
          value={user.email}
        />
        <UiInput
          name="phone_number"
          label={t('fields.phone-number')}
          disabled
          onChange={() => {}}
          value={user.phone_number}
        />
        <UiInput
          name="email"
          label={t('fields.plan-start-date')}
          disabled
          onChange={() => {}}
          value={
            user.plan?.startDate
              ? formatTimestampToDateTime(user.plan?.startDate)
              : t('plans.no-active-plan')
          }
        />
        <UiInput
          name="phone_number"
          label={t('fields.plan-end-date')}
          disabled
          onChange={() => {}}
          value={
            user.plan?.endDate
              ? formatTimestampToDateTime(user.plan?.endDate)
              : t('plans.no-active-plan')
          }
        />
        <UiInput
          name="home_address"
          label={t('fields.home-address')}
          disabled
          onChange={() => {}}
          value={user.location.home_address}
        />
        <UiInput
          name="local_government"
          label={t('fields.local-government')}
          disabled
          onChange={() => {}}
          value={user.location.local_government}
        />
        <UiInput
          name="allergies"
          label={t('fields.allergies')}
          disabled
          onChange={() => {}}
          value={user.allergies || 'None'}
        />
        <UiInput
          name="goals"
          label={t('fields.goals')}
          disabled
          onChange={() => {}}
          value={user.goals}
        />
      </div>
    </UiModal>
  );
}
