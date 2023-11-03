import { expect, describe, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import UiSelect from './UiSelect';
import OnChangeParams from '../../types/OnChangeParams';

describe('src/components/ui/UiSelect.tsx', () => {
  it('UiSelect sends data to parent component.', async () => {
    let parentData: OnChangeParams | null = null;
    function receiveData(data: OnChangeParams) {
      parentData = data;
    }

    const SelectComponent = render(
      <UiSelect name="test" value="" options={[]} onChange={receiveData} />,
    );

    const Select = await SelectComponent.getByTestId('ui-Select');

    fireEvent.change(Select, { target: { value: 'TestValue' } });
    expect(parentData).toEqual({ name: 'test', value: 'TestValue' });
    SelectComponent.unmount();
  });
});
