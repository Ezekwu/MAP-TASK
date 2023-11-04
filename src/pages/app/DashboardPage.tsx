import { useGetUserProfile } from '../../api/queries';
import TheTopNav from '../../components/layout/TheTopNav';
import UiInput from '../../components/ui/UiInput';

export default function DashboardPage() {
  const uid = localStorage.getItem('uid')!;
  const { data: user } = useGetUserProfile(uid);

  const metricsArr = Array.from({ length: 3 }, (_, i) => i + 1);
  return (
    <>
      <TheTopNav
        pageTitle="Dashboard"
        subtitle={`Hello, ${user?.name}. Welcome to Human R`}
      >
        <UiInput
          name="search"
          value="search"
          onChange={() => {}}
          placeholder="Search anything"
        />
      </TheTopNav>
      <div className="grid gap-4 p-5">
        <div className="grid grid-cols-3 gap-2">
          {metricsArr.map((metric) => (
            <div key={metric} className="bg-white p-16 rounded-md flex items-center justify-center">Coming soon</div>
          ))}
        </div>
        <div className="bg-white p-52 rounded-md flex items-center justify-center">Coming soon</div>
        <div className="grid grid-cols-3 gap-2">
        <div className="bg-white p-16 rounded-md flex items-center justify-center col-span-2">Coming soon</div>
        <div className="bg-white p-16 rounded-md flex items-center justify-center">Coming soon</div>
        </div>
      </div>
    </>
  );
}
