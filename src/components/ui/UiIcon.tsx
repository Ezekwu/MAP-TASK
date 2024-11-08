import { useMemo } from 'react';
import Calendar from './icons/Calendar';
import CalendarNoDots from './icons/CalendarNoDots';
import Checkmark from './icons/Checkmark';
import Cog from './icons/Cog';
import CustomerSupport from './icons/CustomerSupport';
import Logout from './icons/Logout';
import Meal from './icons/Meal';
import Minus from './icons/Minus';
import Notification from './icons/Notification';
import Overview from './icons/Overview';
import Plate from './icons/Plate';
import Plus from './icons/Plus';
import Trash from './icons/Trash';
import Tray from './icons/Tray';
import Warning from './icons/Warning';

// These icons are arranged alphabetically for easy sorting
const icons = {
  Calendar: <Calendar />,
  CalendarNoDots: <CalendarNoDots />,
  Checkmark: <Checkmark />,
  Cog: <Cog />,
  CustomerSupport: <CustomerSupport />,
  Logout: <Logout />,
  Meal: <Meal />,
  Minus: <Minus />,
  Notification: <Notification />,
  Overview: <Overview />,
  Plate: <Plate />,
  Plus: <Plus />,
  Trash: <Trash />,
  Tray: <Tray />,
  Warning: <Warning />,
};

export type Icons = keyof typeof icons;

interface Props {
  /** Name of the icon as stored in the icons object */
  icon: Icons;
  size?: string;
}

export default function UiIcon({ icon, size = '16' }: Props) {
  const element = useMemo(() => {
    return icons[icon];
  }, [icon]);

  return <span>{element}</span>;
}
