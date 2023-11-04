import UiAvatar from '../ui/UiAvatar';

interface Props {
  name: string;
  subtitle?: string;
}
export default function UserProfile({ name, subtitle }: Props) {
  return (
    <div className="flex items-center gap-2">
      <div>
        <UiAvatar />
      </div>
      <div className="w-3/5">
        <div className="text-sm font-semibold text-gray-500">{name}</div>
        <div className="line-clamp-1 truncate text-ellipsis text-xs text-gray-300">
          {subtitle}
        </div>
      </div>
    </div>
  );
}
