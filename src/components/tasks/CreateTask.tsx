import { uuidv4 } from '@firebase/util';
import { useState } from 'react';
import { useCreateTaskQuery } from '../../api/queries';
import { priorities } from '../../config/constants';
import OnChangeParams from '../../types/OnChangeParams';
import Task from '../../types/Task';
import CreateTaskSchema from '../../utils/schemas/CreateTaskSchema';
import UiButton from '../ui/UiButton';
import UiForm from '../ui/UiForm';
import UiInput from '../ui/UiInput';
import UiSelect from '../ui/UiSelect';
import UiTextarea from '../ui/UiTextarea';

interface Props {
  taskGroupId: string;
  task: Task | null;
  taskRequestCompleted: (newlyAddedTask: Task) => void;
}
export default function CreateTask({
  taskGroupId,
  task,
  taskRequestCompleted,
}: Props) {
  const userId = localStorage.getItem('uid')!;
  const { request, isLoading } = useCreateTaskQuery();
  const [formData, setFormData] = useState<Task>(
    task || {
      name: '',
      taskGroupId,
      _id: '',
      userId,
      description: '',
      priority: '',
    },
  );

  const priorityOptions = priorities.map((priority) => ({
    label: priority,
    value: priority,
  }));
  function createTask() {
    const data = { ...formData, _id: formData._id || uuidv4() };
    request(data).then(() => {
      taskRequestCompleted(data);
    });
  }

  function onChange({ name, value }: OnChangeParams) {
    setFormData((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  }

  return (
    <UiForm formData={formData} schema={CreateTaskSchema} onSubmit={createTask}>
      {({ errors }) => (
        <div className="grid gap-4">
          <UiInput
            name="name"
            value={formData.name}
            label="Task Name"
            placeholder="Enter the task name"
            onChange={onChange}
            error={errors.name}
          />
          <UiSelect
            name="priority"
            value={formData.priority}
            options={priorityOptions}
            label="Priority"
            placeholder="Select Priority"
            onChange={onChange}
            error={errors.priority}
          />
          <UiTextarea
            name="description"
            value={formData.description}
            label="Task Description"
            placeholder="Describe Task"
            onChange={onChange}
            error={errors.description}
          />

          <UiButton loading={isLoading}>Create Task</UiButton>
        </div>
      )}
    </UiForm>
  );
}
