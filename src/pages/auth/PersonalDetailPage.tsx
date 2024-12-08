import { getAuth } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { Api } from '@/api';

import PersonalDetailsForm from '@/components/user/PersonalDetailsForm';

import useToggle from '@/hooks/useToggle';

import User from '@/types/User';

import Cloudinary from '@/utils/Cloudinary';
import TokenHandler from '@/utils/TokenHandler';

// --

export default function PersonalDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const loading = useToggle();
  const auth = getAuth();

  const user = auth.currentUser;

  async function submitDetails(data: User) {
    if (!user) return;

    loading.on();

    let userDetails = {
      ...data,
      id: user.uid,
      email: user.email as string,
      createdAt: Date.now(),
    };

    if (data.profile_img) {
      const imgUrl = await Cloudinary.upload(data.profile_img as File);

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
      <PersonalDetailsForm onSubmitDetails={submitDetails} />
      <p className="text-gray-500 text-center mt-20 text-xs font-medium">
        Already have an account?{' '}
        <Link to="/auth/login" className="text-primary font-bold text-gray-950">
          Log in
        </Link>
      </p>
    </div>
  );
}
