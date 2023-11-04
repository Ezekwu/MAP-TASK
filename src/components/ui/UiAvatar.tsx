import Avatar1 from '../../assets/avatar-1.svg';
import Avatar2 from '../../assets/avatar-2.svg';
import Avatar3 from '../../assets/avatar-3.svg';
import Avatar4 from '../../assets/avatar-4.svg';
import Avatar5 from '../../assets/avatar-5.svg';
import Avatar6 from '../../assets/avatar-6.svg';
import Avatar7 from '../../assets/avatar-7.svg';
import Avatar8 from '../../assets/avatar-8.svg';

interface Props {
  size?: 'sm' | 'md' | 'lg';
}
export default function UiAvatar({ size = 'sm' }: Props) {
  const avatars = [
    Avatar1,
    Avatar2,
    Avatar3,
    Avatar4,
    Avatar5,
    Avatar6,
    Avatar7,
    Avatar8,
  ];
  const avatarWidths = {
    sm: '50',
    md: '75',
    lg: '100',
  };

  const avatarIndex = Math.floor(Math.random() * avatars.length);
  const avatar = avatars[avatarIndex];

  return (
    <img
      src={avatar}
      className="rounded-full"
      width={avatarWidths[size]}
      alt="avatar"
    />
  );
}
