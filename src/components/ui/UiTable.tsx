import { ReactNode } from 'react';
import UidropdownMenu, { DropDownData } from './UiDropdownMenu';

interface Header {
  title: string;
  /** This field would be used to query the data object for how the data should be displayed.
   * It should be the same as the key of the key-value pair in the array.
   */
  query: string;
}
interface Row extends Record<string, any> {
  id: string;
}
interface Props {
  // Any is forbidden in this codebase. However, for the sake of the flexibility this component needs,
  // it's required that we disable the type checks to make it truly dynamic.
  /**
   * This field is used to pass in data that would be displayed by the custom table.
   * This field would be queried through the query parameter placed in the header of the table column.
   * Hence, it needs to be the same as the
   */
  data: Row[];
  headers: Header[];
  controlsNode?: ReactNode;
  /** This prop accepts a function in case there is a need to filter options available for rows based on data available */
  options?: DropDownData[] | ((row: Row) => DropDownData[]);
  onRowClick?: (id: string) => void;
}
export default function UiTable({
  headers,
  data,
  controlsNode,
  options,
}: Props) {
  return (
    <div className="border border-tertiary-700 rounded-2xl">
      {controlsNode && (
        <header className="p-4 border-b border-tertiary-700">
          {controlsNode}
        </header>
      )}
      <table className="w-full text-left rounded overflow-hidden ">
        <thead className="bg-primary-10 rounded-md bg-secondary-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={`header-${index}`}
                data-testid={`ui-table-header-${header.query}`}
                className="py-2.5 px-2.5 text-xs capitalize font-medium text-typography-disabled"
              >
                {header.title}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((item) => (
            <tr
              key={`data-item-${item._id}`}
              className="border-b last:border-b-0 border-tertiary-700"
            >
              {headers.map((header, index) => (
                <td
                  data-testid={`ui-table-data-${header.query}`}
                  key={`${header.query}-${index}`}
                  className="p-4 text-xs text-secondary-1500 capitalize"
                >
                  {item[header.query]}
                </td>
              ))}
              {options && (
                <td>
                  <UidropdownMenu
                    options={
                      typeof options === 'function' ? options(item) : options
                    }
                    itemId={item._id}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
