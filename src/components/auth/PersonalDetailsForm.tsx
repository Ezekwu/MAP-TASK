import UiForm from "../ui/UiForm";
import UiButton from "../ui/UiButton";
import UiInput from "../ui/UiInput";
import { useState } from "react";

export default function PersonalDetailsForm () {
  const [formData, setFormData] = useState({
    email: '',
  });

  function submitDetails() {}

  function onChange() {}
  return (
    <div className="w-full">
      <h2 className="font-semibold text-[32px] text-left leading-10 mb-10">
        Let’s get to know you
      </h2>
      <UiForm formData={formData} onSubmit={submitDetails}>
        {({ errors }) => (
          <div className="grid gap-5 w-full">
            <div className="flex items-center gap-5">
              <UiInput
                placeholder="Enter email address"
                label="First name"
                value={formData.email}
                name="first_name"
                error={errors.email}
                onChange={onChange}
              />
              <UiInput
                placeholder="Enter your password"
                label="Last name"
                type="password"
                value={formData.email}
                name="last_name"
                error={errors.email}
                onChange={onChange}
              />
            </div>
            <UiInput
              label="Phone number"
              value={formData.email}
              name="phone_numner"
              error={errors.email}
              onChange={onChange}
            />
            <UiInput
              placeholder="Enter your home address"
              label="Home address"
              type="password"
              value={formData.email}
              name="home_adress"
              error={errors.email}
              onChange={onChange}
            />

            <UiButton injectedClasses="mt-5" variant="primary" block>
              Submit
            </UiButton>
          </div>
        )}
      </UiForm>
    </div>
  );
}