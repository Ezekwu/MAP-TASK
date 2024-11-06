import { useGetUserProfile } from '../../api/queries';
import TheTopNav from '../../components/layout/TheTopNav';
import UiInput from '../../components/ui/UiInput';

export default function DashboardPage() {
  const uid = localStorage.getItem('uid')!;

  const { data: user } = useGetUserProfile(uid);

  return <></>;
}
