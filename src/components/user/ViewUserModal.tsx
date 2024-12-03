import User from '@/types/User';
import UiModal from '../ui/UiModal';

interface Props {
  isOpen: boolean;
  user: User;
  onClose: () => void;
}
export default function ViewUserModal({ user, isOpen, onClose }: Props) {
  return (
    <UiModal
      title={`${user.first_name} ${user.last_name}'s profile`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="flex items-center gap-1.5">
          {user.profile_img ? (
            <img
              src={user.profile_img as string}
              alt="Eatrite user"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-primary-500" />
          )}
          <span>{`${user.first_name} ${user.last_name}`}</span>
        </div>
      </div>
    </UiModal>
  );
}
