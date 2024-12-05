import Bell from '@/assets/icons/bell.svg?react';
import Calendar from '@/assets/icons/calendar.svg?react';
import CalendarNoDots from '@/assets/icons/calandar-no-dot.svg?react';
import CaretLeft from '@/assets/icons/caret-left.svg?react';
import CaretRight from '@/assets/icons/caret-right.svg?react';
import Checkmark from '@/assets/icons/check-mark.svg?react';
import CheckMarkDouble from '@/assets/icons/check-mark-double.svg?react';
import Cog from '@/assets/icons/cog.svg?react';
import CustomerSupport from '@/assets/icons/customer-support.svg?react';
import Dish from '@/assets/icons/dish.svg?react';
import Eye from '@/assets/icons/eye.svg?react';
import EyeSlash from '@/assets/icons/eye-slash.svg?react';
import Filter from '@/assets/icons/filter.svg?react';
import Google from '@/assets/icons/google.svg?react';
import Info from '@/assets/icons/info.svg?react';
import HorizontalThreeDots from '@/assets/icons/horizontal-three-dots.svg?react';
import Logout from '@/assets/icons/logout.svg?react';
import Meal from '@/assets/icons/meal.svg?react';
import Minus from '@/assets/icons/minus.svg?react';
import Notification from '@/assets/icons/notification.svg?react';
import Overview from '@/assets/icons/overview.svg?react';
import Plate from '@/assets/icons/plate.svg?react';
import Plus from '@/assets/icons/plus.svg?react';
import Spaghetti from '@/assets/icons/spaghetti.svg?react';
import Trash from '@/assets/icons/trash.svg?react';
import TrashX from '@/assets/icons/trash-x.svg?react';
import Tray from '@/assets/icons/tray.svg?react';
import Users from '@/assets/icons/users.svg?react';
import Warning from '@/assets/icons/warning.svg?react';
import X from '@/assets/icons/x.svg?react';

// These icons are arranged alphabetically for easy sorting
const icons = {
  Bell,
  Calendar,
  CalendarNoDots,
  CaretLeft,
  CaretRight,
  Checkmark,
  CheckMarkDouble,
  Cog,
  CustomerSupport,
  Dish,
  Eye,
  EyeSlash,
  Filter,
  Google,
  Info,
  HorizontalThreeDots,
  Logout,
  Meal,
  Minus,
  Notification,
  Overview,
  Plate,
  Plus,
  Spaghetti,
  Trash,
  TrashX,
  Tray,
  Users,
  Warning,
  X,
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
