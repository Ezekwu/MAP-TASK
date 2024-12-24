import FemaleAvater from '@/assets/avatar-female.png';

import UiDropDownMenu from "../ui/UiDropdownMenu";
import UiIcon from "../ui/UiIcon";

//--

interface Props {
  startNode?: React.ReactNode 
}

export default function TheTopNav({ startNode }: Props) {
  return (
    <nav className="px-6 py-3 border-b  flex w-full justify-between items-center sticky ">
      <div className="">{startNode}</div>
      <div className="ml-auto flex items-center gap-10">
        <div className="relative flex items-center w-full focus-within:stroke-primary-500 ">
          <span className="absolute ml-2 top-[10px]">
            <UiIcon icon="Search" />
          </span>
          <input
            style={{
              boxShadow: '0px 2px 4px -2px #0000000A',
            }}
            className="w-[450px] outline-none focus:border-primary-500 md:rounded-md border border-tertiary-300 placeholder:text-tertiary-400 placeholder:text-sm text-sm font-normal h-10 text-md py-4 px-6 pl-8"
            type="text"
            placeholder="Search here..."
          />
        </div>
        <div className="flex gap-4">
          <UiIcon icon="Bell" size="31" />
          <UiIcon icon="ChatsSolid" size="31" />

          <UiDropDownMenu
            trigger={(areOptionsVisible) => (
              <div className="flex items-center w-full fill-tertiary-400">
                <img
                  width={32}
                  className="bg-[#FFE7CC] min-w-8 h-8 rounded-full object-cover"
                  src={FemaleAvater}
                  alt=""
                />
                <UiIcon icon={areOptionsVisible ? 'CaretDown' : 'CaretUp'} />
              </div>
            )}
            options={[]}
          />
        </div>
      </div>
    </nav>
  );
}
