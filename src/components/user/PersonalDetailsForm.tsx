import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
import UiAvatar from '../ui/UiAvatar';

interface Props {
  forceLoadOff?: boolean;
  onSubmitDetails: (userDetails: User) => void;
}
export default function PersonalDetailsForm({
  forceLoadOff,
  onSubmitDetails,
}: Props) {
  const { t } = useTranslation();

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

  async function submitDetails() {
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

    onSubmitDetails(userDetails);
  }

  useEffect(() => {
    loading.set(false);
  }, [forceLoadOff]);

  return (
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
            prefixNode='+234'
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
            <UiAvatar avatar={imgSrc} />
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
  );
}
