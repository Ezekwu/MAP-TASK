const sizes = {
  sm: 'w-8 h-8',
  md: '',
  lg: 'w-20 h-20 ',
};
interface Props {
  avatar?: string | null;
  size?: keyof typeof sizes;
}
export default function UiAvatar({ avatar, size = 'lg' }: Props) {
  return (
    <>
      {avatar ? (
        <img
          className={`${sizes[size]} rounded-full object-cover`}
          src={avatar}
          alt="user avatar"
        />
      ) : (
        <div className={`${sizes[size]} rounded-full bg-primary-500`} />
      )}
    </>
  );
}
