import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
// import { useGetScheduleOfUserQuery } from '../../api/queries';
import CalendarWidget from '../../components/calendar/CalendarWidget';
import TheTopNav from '../../components/layout/TheTopNav';
import UiButton from '../../components/ui/UiButton';

export default function CalendarPage() {
  const uid = localStorage.getItem('uid')!;
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [addScheduleIsVisible, setAddScheduleIsVisible] = useState(false);
  // const { data: schedule } = useGetScheduleOfUserQuery(uid);

  function openAddSchedule() {
    setAddScheduleIsVisible(true);
  }
  function selectDate(day: Dayjs) {
    setSelectedDate(day);
    openAddSchedule();
  }

  function resetAndCloseAddSchedule() {
    setSelectedDate(dayjs());
    setAddScheduleIsVisible(false);
  }

  function getScheduleNodeOfParticularDate(day: Dayjs) {
    return (
      <div className="grid gap-1">
        {/* {schedule
          ?.filter(({ date }) => date === day.format('YYYY-MM-DD'))
          .slice(0, 4)
          .map((s) => (
            <div className="bg-primary-10 text-xs p-1 truncate">{s.name}</div>
          ))} */}
      </div>
    );
  }

  return (
    <div>
      <TheTopNav
        pageTitle="Calendar"
        subtitle="View your schedule, view your booking, book meetings"
      >
        <div className="flex justify-end">
          <UiButton onClick={openAddSchedule}>Add Schedule</UiButton>
        </div>
      </TheTopNav>
      <div className="m-5 bg-white rounded-md pb-4">
        <CalendarWidget
          value={selectedDate}
          itemNode={getScheduleNodeOfParticularDate}
          selectDate={selectDate}
        />
      </div>
    </div>
  );
}
