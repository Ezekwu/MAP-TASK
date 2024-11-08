import Eye from '../../assets/icons/eye.svg?react';
import EyeSlash from '../../assets/icons/eye-slash.svg?react';
import Google from '../../assets/icons/google.svg?react';

// These icons should be arranged alphabetically for easy sorting
const icons = {
  Eye,
  EyeSlash,
  Google,
};

export type Icons = keyof typeof icons;
interface Props {
  /** Name of the icon as stored in the icons object */
  icon: Icons;
  size?: string;
}
export default function UiIcon({ icon, size = '16' }: Props) {
  const LazyLoadedIcon = icons[icon];
  return (
    <span>
      {LazyLoadedIcon && (
        <LazyLoadedIcon style={{ width: size, height: size }} />
      )}
    </span>
  );
}
