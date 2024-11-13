import Api from '@/Api';

import UiButton from '@/components/ui/UiButton';
import UiForm from '@/components/ui/UiForm';
import UiInput from '@/components/ui/UiInput';

import useBooleanState from '@/hooks/useBooleanState';
import useObjectState from '@/hooks/useObjectState';

import EmailAndPasswordSchema from '@/utils/schemas/EmailAndPasswordSchema';

import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const formData = useObjectState({
    email: '',
    password: '',
  });

  const loading = useBooleanState(false);

  async function loginUser() {
    try {
      loading.on();

      await Api.signInWithEmailAndPassword(formData.value);

      navigate('/admin');
    } catch (err) {
      console.error(err);
    } finally {
      loading.off();
    }
  }

  return (
    <div className="w-full">
      <h2 className="font-semibold text-2xl sm:text-[32px] leading-10 sm:text-center mb-8 sm:mb-10">
        Eatrite Manager
      </h2>
      <UiForm
        formData={formData.value}
        schema={EmailAndPasswordSchema}
        onSubmit={loginUser}
      >
        {({ errors }) => (
          <div className="grid gap-2">
            <UiInput
              placeholder="Enter email address"
              value={formData.value.email}
              label="Email"
              name="email"
              error={errors.email}
              onChange={formData.set}
            />
            <UiInput
              placeholder="Enter your password"
              type="password"
              value={formData.value.password}
              name="password"
              label="Password"
              error={errors.password}
              onChange={formData.set}
            />
            <div className="mt-5">
              <UiButton size="lg" rounded="xs" block loading={loading.value}>
                Submit
              </UiButton>
            </div>
          </div>
        )}
      </UiForm>
    </div>
  );
}
