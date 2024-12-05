import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

import { Api } from '@/api';

import UiButton from '@/components/ui/UiButton';
import UiForm from '@/components/ui/UiForm';
import UiImageUploader from '@/components/ui/UiImageUploader';
import UiInput from '@/components/ui/UiInput';
import UiSelect from '@/components/ui/UiSelect';

import { goalOptions, localGovernmentAreaOptions } from '@/config/constants';
import useObjectState from '@/hooks/useObjectState';
import useToggle from '@/hooks/useToggle';

import User from '@/types/User';

import Cloudinary from '@/utils/Cloudinary';
import PersonalDetailsSchema from '@/utils/schemas/PersonalDetailsSchema';
import TokenHandler from '@/utils/TokenHandler';
import { useTranslation } from 'react-i18next';

// --

export default function PersonalDetailsForm() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [homeAddressNotSetMessage, setHomeAddressNotSetMessage] = useState('');
  const [lgaNotSetMessage, setLgaNotSetMessage] = useState('');

  const formData = useObjectState({
    id: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    location: { home_address: '', local_government: '' },
    profile_img: null,
    goals: '',
    allergies: '',
  } as User);

  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const loading = useToggle();
  const auth = getAuth();

  const user = auth.currentUser;

  async function submitDetails() {
    if (!user) return;

    if (!formData.value.location.home_address) {
      setHomeAddressNotSetMessage(t('errors.home-address'));

      return;
    } else {
      setHomeAddressNotSetMessage('');
    }

    if (!formData.value.location.local_government) {
      setLgaNotSetMessage(t('errors.lga'));

      return;
    } else {
      setLgaNotSetMessage('');
    }

    loading.on();

    let userDetails = {
      ...formData.value,
      id: user.uid,
      email: user.email as string,
      createdAt: Date.now(),
    };

    if (formData.value.profile_img) {
      const imgUrl = await Cloudinary.upload(
        formData.value.profile_img as File,
      );

      userDetails = {
        ...userDetails,
        profile_img: imgUrl,
      };
    }

    Api.setUser(userDetails)
      .then(() => {
        TokenHandler.setToken(user.uid);

        navigate('/');
      })
      .finally(() => loading.off());
  }

  return (
    <div className="w-full pb-3">
      <h2 className="font-semibold text-[32px] text-left leading-10 mb-10">
        Let’s get to know you
      </h2>
      <PersonalDetailsForm />
      <p className="text-gray-500 text-center mt-20 text-xs font-medium">
        Already have an account?{' '}
        <Link to="/auth/login" className="text-primary font-bold text-gray-950">
          Log in
        </Link>
      </p>
    </div>
  );
}
