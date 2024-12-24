import Bell from '@/assets/icons/bell.svg?react';
import Bin from '@/assets/icons/bin.svg?react';
import Box from '@/assets/icons/box.svg?react';
import Building from '@/assets/icons/building.svg?react';
import Calendar from '@/assets/icons/calendar.svg?react';
import CalendarAlt from '@/assets/icons/calendar-alt.svg?react';
import CaretDown from '@/assets/icons/caret-down.svg?react';
import CaretLeft from '@/assets/icons/caret-left.svg?react';
import CaretUp from '@/assets/icons/caret-up.svg?react';
import Cart from '@/assets/icons/cart.svg?react';
import Chats from '@/assets/icons/chats.svg?react';
import ChatsSolid from '@/assets/icons/chats-solid.svg?react';
import Check from '@/assets/icons/CheckMark.svg?react';
import CloudUpLoad from '@/assets/icons/cloud-upload.svg?react';
import DashboardIcon from '@/assets/icons/dashboard-icon.svg?react';
import Dollar from '@/assets/icons/dollar.svg?react';
import Edit from '@/assets/icons/pencil-edit.svg?react';
import Money from '@/assets/icons/money.svg?react';
import Multiply from '@/assets/icons/multiply.svg?react';
import QuestionCircle from '@/assets/icons/question-circle.svg?react';
import Search from '@/assets/icons/search.svg?react';
import Settings from '@/assets/icons/settings.svg?react';
import SignDoc from '@/assets/icons/sign-doc.svg?react';
import SignDocEmpt from '@/assets/icons/sign-doc-empt.svg?react';

const icons = {
  Bell,
  Bin,
  Box,
  Building,
  Calendar,
  CalendarAlt,
  CaretDown,
  CaretUp,
  CaretLeft,
  Cart,
  Chats,
  ChatsSolid,
  Check,
  CloudUpLoad,
  DashboardIcon,
  Dollar,
  Edit,
  Money,
  Multiply,
  QuestionCircle,
  Search,
  Settings,
  SignDoc,
  SignDocEmpt,
};

export type Icons = keyof typeof icons;

interface Props {
  icon: Icons;
  size?: string;
}

export default function UiIcon({ icon, size = '20' }: Props) {
  const LazyLoadedIcon = icons[icon];
  return (
    <span>
      {LazyLoadedIcon && (
        <LazyLoadedIcon style={{ width: size, height: size }} />
      )}
    </span>
  );
}
