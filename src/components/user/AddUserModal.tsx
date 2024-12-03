import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FirebaseError } from 'firebase/app';

import { Api } from '@/api';
import { useUsersQuery } from '@/api/query/useUsersQuery';

import useToggle from '@/hooks/useToggle';

import User from '@/types/User';

import { Toast } from '@/utils/toast';

import UiInput from '../ui/UiInput';
import UiModal from '../ui/UiModal';

import PersonalDetailsForm from './PersonalDetailsForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export default function AddUserModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation();

  const { setData } = useUsersQuery();

  const offLoading = useToggle();

  const [email, setEmail] = useState<string | null>('');

  const [emailRequiredError, setEmailRequiredError] = useState('');

  async function createUser(userDetails: User) {
    if (!email) {
      setEmailRequiredError('This is a required field');

      return;
    }
    try {
      const userAuthProfile = await Api.createUserWithEmailAndPassword({
        email,
        password: '12345678',
      });

      const user = {
        ...userDetails,
        id: userAuthProfile.uid,
        email,
        createdAt: Date.now(),
      };

      Api.setUser(user);

      setData(user);

      onClose();
    } catch (err) {
      const firebaseError = err as FirebaseError;

      const msg = t(`errors.${firebaseError.code}`, t('errors.default'));

      Toast.error({ msg });

      offLoading.on();
    }
  }

  return (
    <UiModal
      title={t('modals.add-user.title')}
      alignRight
      isOpen={isOpen}
      onClose={onClose}
    >
      <UiInput
        value={email}
        name="email"
        error={emailRequiredError}
        onChange={({ value }) => setEmail(value)}
        label={t('fields.email')}
      />
      <PersonalDetailsForm
        forceLoadOff={offLoading.value}
        onSubmitDetails={createUser}
      />
    </UiModal>
  );
}
