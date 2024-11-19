import { expect, describe, it, beforeEach, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';

import UiForm from './UiForm';
import { FormikErrors } from 'formik';
import SignUpSchema from '../../utils/schemas/SignUpSchema';

const defaultData = {
  email: '',
  password: '',
};
const filledData = {
  email: 'henryeze019@gmail.com',
  password: "it don't matter to me",
};

describe('src/components/ui/UiButton.tsx', () => {
  let formErrors: FormikErrors<Record<string, string>> = {};

  function setFormErrors(errors: FormikErrors<Record<string, string>>) {
    formErrors = errors;
  }

  beforeEach(() => {
    formErrors = {};
  });

  it('Form sends errors when needed.', async () => {
    let handleSubmit = vi.fn();
    const formComponent = render(
      <UiForm
        formData={defaultData}
        schema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        {({ errors }) => {
          setFormErrors(errors);
          return <></>;
        }}
      </UiForm>,
    );

    const form = await formComponent.getByTestId('ui-form');

    fireEvent.submit(form);

    await waitFor(() => {
      expect(formErrors).toEqual({
        name: 'This field is required',
        email: 'This field is required',
        role: 'This field is required',
        password: 'password must be at least 8 characters',
      });
      expect(handleSubmit).not.toHaveBeenCalled();
    });
    formComponent.unmount();
  });

  it('Form sends errors when needed.', async () => {
    let handleSubmit = vi.fn();
    const formComponent = render(
      <UiForm
        formData={filledData}
        schema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        {({ errors }) => {
          setFormErrors(errors);
          return <></>;
        }}
      </UiForm>,
    );

    const form = await formComponent.getByTestId('ui-form');

    fireEvent.submit(form);

    await waitFor(() => {
      expect(formErrors).not.toEqual({
        name: 'This field is required',
        email: 'This field is required',
        password: 'password must be at least 8 characters',
        role: 'This field is required',
      });
      expect(handleSubmit).toHaveBeenCalled();
    });
    formComponent.unmount();
  });
});
