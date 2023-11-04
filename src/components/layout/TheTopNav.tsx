import { useGetUserProfile } from '../../api/queries';

interface Props {
  children?: React.ReactNode;
}

export default function TheTopNav({ children }: Props) {
  return (
    <nav
      className={`p-5 border-b-2 border-gray-25 flex w-full ${
        children ? 'justify-between' : 'justify-end'
      }`}
    >
      {children}
    </nav>
  );
}
