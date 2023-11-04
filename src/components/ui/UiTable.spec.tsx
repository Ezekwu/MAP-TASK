import { expect, describe, it } from 'vitest';
import { render } from '@testing-library/react';

import UiTable from './UiTable';

const tableHeaders = [
    {
      title: 'User',
      query: 'user',
    },
    {
      title: 'Email',
      query: 'email',
    },
    {
      title: 'Role',
      query: 'role',
    },
  ];

const tableData = [
    {
        _id: '',
        user: <p>test</p>,
        email: 'henryeze019@gmail.com',
        role: 'applicant'
    }
]
describe('src/components/ui/UiTable.tsx', () => {
  it('UiTable renders applicable react nodes', async () => {
    const tableComponent = render(<UiTable data={tableData} headers={tableHeaders} />);

    const userHeader = tableComponent.getByTestId('ui-table-header-user');

    expect(userHeader.textContent).toBe('User');

    const userData = tableComponent.getByTestId('ui-table-data-user');

    expect(userData.innerHTML).toBe('<p>test</p>')

  });
});
