import { useState } from "react";
import UiButton from "../ui/UiButton";
import UiForm from "../ui/UiForm";
import UiIcon from "../ui/UiIcon";
import UiInput from "../ui/UiInput";
import { Link } from "react-router-dom";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    email: '',
  });

  function registerUser() {}

  function onChange() {}

  return (
    <div className="w-full">
      <h2 className="font-semibold text-[32px] leading-10 text-center mb-10">
        Ready to Eatrite?
      </h2>
      <div className="flex flex-col gap-5">
        <UiButton variant="transparent" block>
          <UiIcon size="20" icon="Google" />
          <p className="text-sm">Sign in with Google</p>
        </UiButton>
        <div className="or-border relative text-white -mb-1">
          <p className="text-gray-600 w-fit py-0 mx-auto absolute bg-white px-2 top-[-12px] right-0 left-0">
            or
          </p>
        </div>
        <UiForm formData={formData} onSubmit={registerUser}>
          {({ errors }) => (
            <div className="grid gap-5">
              <UiInput
                placeholder="Enter email address"
                label="Email"
                value={formData.email}
                name="email"
                error={errors.email}
                hideLabel
                onChange={onChange}
              />
              <UiInput
                placeholder="Enter your password"
                label="Email"
                type="password"
                value={formData.email}
                name="email"
                error={errors.email}
                hideLabel
                onChange={onChange}
              />

              <UiButton injectedClasses="mt-5" variant="primary" block>
                Submit
              </UiButton>
            </div>
          )}
        </UiForm>
      </div>
      <p className="text-base text-center mt-[22px] text-gray-1000 font-medium">
        Already have an account?{' '}
        <Link to="/auth/login" className="text-primary font-bold">
          Log in
        </Link>
      </p>
      <p className="mt-24 text-xs text-center text-gray-700">
        By clicking “Sign in with Google” or “Continue with email” you agree to
        our{' '}
        <Link to="" className="text-gray-1000 font-bold">
          Terms of Use
        </Link>{' '}
        and{' '}
        <Link to="" className="text-gray-1000 font-bold">
          Privacy policy
        </Link>
      </p>
    </div>
  );
}