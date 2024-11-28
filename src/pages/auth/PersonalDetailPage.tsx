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
      <UiForm
        schema={PersonalDetailsSchema}
        formData={formData.value}
        onSubmit={submitDetails}
      >
        {({ errors }) => (
          <div className="grid gap-5 w-full">
            <div className="grid grid-cols-2 gap-5">
              <UiInput
                placeholder={t('placeholders.first-name')}
                label={t('fields.first-name')}
                value={formData.value.first_name}
                name="first_name"
                error={errors.first_name}
                onChange={formData.set}
              />
              <UiInput
                placeholder={t('placeholders.last-name')}
                label={t('fields.last-name')}
                value={formData.value.last_name}
                name="last_name"
                error={errors.last_name}
                onChange={formData.set}
              />
            </div>
            <UiInput
              label={t('fields.phone-number')}
              type="phone"
              value={formData.value.phone_number}
              name="phone_number"
              error={errors.phone_number}
              onChange={formData.set}
            />
            <UiInput
              placeholder={t('placeholders.home-address')}
              label={t('fields.home-address')}
              value={formData.value.location.home_address}
              name="location.home_address"
              error={homeAddressNotSetMessage}
              onChange={formData.setDeep}
            />
            <UiSelect
              name="location.local_government"
              label={t('fields.local-government')}
              placeholder={t('placeholders.local-government')}
              error={lgaNotSetMessage}
              onChange={formData.setDeep}
              options={localGovernmentAreaOptions}
              value={formData.value.location.local_government}
            />
            <UiInput
              placeholder={t('placeholders.allergies')}
              label={t('fields.allergies')}
              optional
              value={formData.value.allergies}
              name="allergies"
              error={errors.allergies}
              onChange={formData.set}
            />
            <UiSelect
              name="goals"
              label={t('fields.goals')}
              placeholder={t('placeholders.goals')}
              onChange={formData.set}
              error={errors.goals}
              options={goalOptions}
              value={formData.value.goals}
            />
            {/* TODO: when I merge my admin add meals, use the display/update component to handle this */}
            <div className="flex items-center gap-4">
              <div>
                {imgSrc ? (
                  <img
                    className="w-20 h-20 rounded-full object-cover"
                    src={imgSrc}
                    alt="profile image"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-primary-500"></div>
                )}
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <UiImageUploader
                  name="profile_img"
                  onSetPreviewUrl={setImgSrc}
                  onChange={formData.set}
                  value={formData.value.profile_img as File}
                />
                <p className="text-xs text-gray-450 font-medium">
                  *jpg, *jpeg, *png files up to 10MB max.{' '}
                </p>
              </div>
            </div>
            {/* TODO: when I merge my admin add meals, use the display/update component to handle this */}
            <div className="mt-5">
              <UiButton
                loading={loading.value}
                size="lg"
                rounded="md"
                variant="primary"
                block
              >
                Submit
              </UiButton>
            </div>
          </div>
        )}
      </UiForm>
      <p className="text-gray-500 text-center mt-20 text-xs font-medium">
        Already have an account?{' '}
        <Link to="/auth/login" className="text-primary font-bold text-gray-950">
          Log in
        </Link>
      </p>
    </div>
  );
}
