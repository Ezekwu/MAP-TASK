import { uuidv4 } from '@firebase/util';
import UiModal from '../ui/UiModal';
import UiForm from '../ui/UiForm';
import { useMemo, useState } from 'react';
import UiInput from '../ui/UiInput';
import { Dayjs } from 'dayjs';
import UiButton from '../ui/UiButton';
import UiDatePicker from '../ui/UiDatePicker';
import UiSelect from '../ui/UiSelect';
import {
  useCreateScheduleQuery,
  useGetCandidatesQuery,
} from '../../api/queries';
import UserProfile from '../user/UserProfile';
import OnChangeParams from '../../types/OnChangeParams';
import { useQueryClient } from '@tanstack/react-query';
import { GET_SCHEDULE_QUERY_KEY } from '../../api/queryKeys';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Dayjs;
}
export default function AddSchedule({ isOpen, selectedDate, onClose }: Props) {
  const queryClient = useQueryClient();
  const uid = localStorage.getItem('uid')!;
  const { data: candidates } = useGetCandidatesQuery();
  const { request: createScheduleRequest, isLoading } =
    useCreateScheduleQuery();
  const [formData, setFormData] = useState({
    name: '',
    userToInvite: '',
    date: selectedDate,
    userId: uid,
  });

  const invitableCandidates = useMemo(() => {
    return (
      candidates?.map((candidate) => ({
        value: candidate._id,
        label: (
          <UserProfile
            key={candidate._id}
            name={candidate.name}
            subtitle={candidate.email}
          />
        ),
      })) || []
    );
  }, [candidates]);

  function handleChange({ name, value }: OnChangeParams) {
    setFormData((data) => ({ ...data, [name]: value }));
  }

  function createSchedule() {
    createScheduleRequest({
      ...formData,
      date: formData.date.format('YYYY-MM-DD'),
      _id: uuidv4(),
    }).then(() => {
      queryClient.invalidateQueries([GET_SCHEDULE_QUERY_KEY]);
      onClose();
    });
  }

  return (
    <UiModal isOpen={isOpen} onClose={onClose} title="Add new Schedule">
      <UiForm formData={formData} onSubmit={createSchedule}>
        {() => (
          <div className="grid gap-4">
            <UiInput
              name="name"
              onChange={handleChange}
              value={formData.name}
              label="What's this meeting for?"
            />
            <UiDatePicker
              name="date"
              onChange={handleChange}
              value={formData.date}
              label="When is it scheduled for?"
            />
            <UiSelect
              name="userToInvite"
              onChange={handleChange}
              options={invitableCandidates}
              value={formData.userToInvite}
              label="Who's invited?"
            />
            <UiButton loading={isLoading}>Create Schedule</UiButton>
          </div>
        )}
      </UiForm>
    </UiModal>
  );
}
