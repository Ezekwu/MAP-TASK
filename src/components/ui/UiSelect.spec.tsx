import { expect, describe, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import UiSelect from './UiSelect';
import OnChangeParams from '../../types/OnChangeParams';

describe('src/components/ui/UiSelect.tsx', () => {
  it('UiSelect sends data to parent component.', async () => {
    let parentData: OnChangeParams | null = null;
    // What's the best way to receive data emitted from a component in a test
    function receiveData(data: OnChangeParams) {
      parentData = data;
    }

    const selectComponent = render(
      <UiSelect
        name="test"
        value=""
        options={[{ label: 'test', value: 'TestValue' }]}
        onChange={receiveData}
      />,
    );

    const selectTrigger =
      await selectComponent.getByTestId('ui-select-trigger');

    fireEvent.click(selectTrigger);
    const selectOptions =
      await selectComponent.getByTestId('ui-select-options');

    expect(selectOptions).toBeTruthy();
    const selectOption = await selectComponent.getByTestId('ui-select-option');
    fireEvent.click(selectOption);

    expect(parentData).toEqual({ name: 'test', value: 'TestValue' });
    selectComponent.unmount();
  });
});
