import UiForm from '../ui/UiForm';
import UiButton from '../ui/UiButton';
import UiInput from '../ui/UiInput';
import { useState } from 'react';
import UiImageUploader from '../ui/UiImageUploader';
import PersonalDetailsSchema from '../../utils/schemas/PersonalDetailsSchema';
import { Link } from 'react-router-dom';
import useObjectState from '@/hooks/useObjectState';

export default function PersonalDetailsForm() {
  const formData = useObjectState({
    first_name: '',
    last_name: '',
    phone_numner: '',
    home_adress: '',
    profile_img: null,
  });
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  function submitDetails() {
    console.log(formData);
  }

  function getImgSrc(src: string | null) {
    setImgSrc(src);
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
            <div className="flex gap-5">
              <UiInput
                placeholder="Enter your first name"
                label="First name"
                value={formData.value.first_name}
                name="first_name"
                error={errors.first_name}
                onChange={formData.set}
              />
              <UiInput
                placeholder="Enter your last name"
                label="Last name"
                value={formData.value.last_name}
                name="last_name"
                error={errors.last_name}
                onChange={formData.set}
              />
            </div>
            <UiInput
              label="Phone number"
              type="phone"
              value={formData.value.phone_numner}
              name="phone_numner"
              error={errors.phone_numner}
              onChange={formData.set}
            />
            <UiInput
              placeholder="Enter your home address"
              label="Home address"
              value={formData.value.home_adress}
              name="home_adress"
              error={errors.home_adress}
              onChange={formData.set}
            />
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
                  getImgSrc={getImgSrc}
                  onChange={formData.set}
                  value={formData.value.profile_img}
                />
                <p className="text-xs text-gray-450 font-medium">
                  *jpg, *jpeg, *png files up to 10MB max.{' '}
                </p>
              </div>
            </div>
            <div className="mt-5">
              <UiButton size="lg" rounded="md" variant="primary" block>
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
