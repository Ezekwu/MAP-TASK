const sizeClasses = {
  md: 'text-sm',
  sm: 'text-[10px]',
};

interface Props {
  name: string;
  size?: keyof typeof sizeClasses;
}

export default function UiInitialsAvatar({ name, size = 'md' }: Props) {
  function getFirstLetters() {
    const names = name.split(' ');

    return names.map((name) => name.charAt(0).toUpperCase()).join('');
  }
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center  text-primary-1000 bg-neutral-100 font-bold ${sizeClasses[size]}`}
    >
      {getFirstLetters()}
    </div>
  );
}
