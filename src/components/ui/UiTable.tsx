import UiCheckbox from './UiCheckbox';

export interface Header {
  title: string;
  query: string;
  alignText?: 'left' | 'right' | 'center';
}
export interface Row extends Record<string, any> {
  _id: string;
  isCheckable?: boolean;
}
interface Props {
  data: Row[];
  headers: Header[];
  checkable?: boolean;
  checkedIds?: string[];
  link?: string;
  simplified?: boolean;
  onCheckboxChange?: (id: string) => void;
  checkAllIds?: () => void;
  actionTriggers?: (id: string) => React.ReactNode;
  onRowClick?: (id: string) => void;
}
export default function UiTable({
  headers,
  checkable,
  checkedIds,
  link,
  simplified = false,
  checkAllIds,
  onCheckboxChange,
  data,
  actionTriggers,
}: Props) {
  return (
    <>
      <div
        className={`bg-white ${simplified ? 'border-none' : 'border  border-tertiary-300'}  rounded-lg hidden md:block`}
      >
        <table className="w-full text-left">
          <thead className="">
            <tr
              className={` rounded-md  ${simplified ? 'border-none bg-tertiary-50' : 'border-b border-tertiary-300'} bg-[#F9FAFB] overflow-hidden`}
            >
              {checkable && (
                <th className="pl-6 hidden md:table-cell rounded-tl-md rounded-bl-md">
                  <UiCheckbox
                    onChange={checkAllIds!}
                    value={checkedIds?.length === data.length}
                    name="check"
                    variant="light"
                  />
                </th>
              )}
              {headers.map((header, index) => (
                <th
                  key={`table-headers-second ${index}`}
                  className={`text-sm font-normal text-tertiary-700  max-w-fit ${simplified ? 'px-2 py-2' : 'px-6 py-[14px]'}`}
                >
                  {header.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((item, index) => (
              <tr
                className={`${index + 1 < data.length && !simplified && 'border-b  border-tertiary-300 '}`}
                key={item._id || `table- ${index}`}
              >
                {checkable && (
                  <td className={`pl-6 w-fit text-sm`}>
                    <UiCheckbox
                      onChange={() => {
                        onCheckboxChange!(item._id);
                        console.log(item._id);
                      }}
                      value={checkedIds?.includes(item._id)!}
                      name="check"
                      variant="light"
                    />
                  </td>
                )}
                {headers.map((header, index) => (
                  <td
                    data-testid={`ui-table-data-${header.query}`}
                    key={`table-header${index}`}
                    style={{
                      textAlign: header.alignText,
                    }}
                    className={`text-sm  text-gray-1000 font-ceraRegular capitalize ${simplified ? 'pt-4 pr-4' : 'px-6 py-4 '}`}
                  >
                    {item[header.query]}
                  </td>
                ))}
                {actionTriggers && (
                  <td className="relative overflow-visible">
                    <div className="flex items-center gap-6 justify-end px-2 ">
                      {actionTriggers?.(item._id)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
