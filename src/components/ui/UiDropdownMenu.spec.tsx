import { expect, describe, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import UiDropdownMenu from './UiDropdownMenu';
import OnChangeParams from '../../types/OnChangeParams';

describe('src/components/ui/UiDropdownMenu.tsx', () => {
  it('UiDropdownMenu sends data to parent component.', async () => {
    const func = vi.fn();
    const label= 'test'

    const dropdownComponent = render(
      <UiDropdownMenu
        options={[{ label, func }]}
      />,
    );

    const dropdownTrigger =
      await dropdownComponent.getByTestId('ui-dropdown-trigger');

    fireEvent.click(dropdownTrigger);
    const dropdownOptions =
      await dropdownComponent.getByTestId('ui-dropdown-options');

    expect(dropdownOptions).toBeTruthy();
    const dropdownOption = await dropdownComponent.getByTestId('ui-dropdown-option-test');
    fireEvent.click(dropdownOption);

    expect(func).toBeCalled()
    dropdownComponent.unmount();
  });
});
