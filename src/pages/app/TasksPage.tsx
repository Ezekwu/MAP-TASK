import { Plus } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import TheTopNav from '../../components/layout/TheTopNav';
import TaskList from '../../components/tasks/TaskList';
import UiButton from '../../components/ui/UiButton';
import TaskGroup from '../../types/TaskGroup';
import { uuidv4 } from '@firebase/util';
import {
  useCreateTaskGroupQuery,
  useCreateTaskQuery,
  useGetTaskGroupOfUserQuery,
  useGetTasksOfUserQuery,
} from '../../api/queries';
import UiModal from '../../components/ui/UiModal';
import CreateTask from '../../components/tasks/CreateTask';
import Task from '../../types/Task';
import UiInput from '../../components/ui/UiInput';
import { useQueryClient } from '@tanstack/react-query';
import { TASKS_QUERY_KEY } from '../../api/queryKeys';
import UiSelect from '../../components/ui/UiSelect';
import { priorities } from '../../config/constants';

export default function TasksPage() {
  const uid = localStorage.getItem('uid')!;
  const { request } = useCreateTaskGroupQuery();
  const { data: remoteTaskGroups } = useGetTaskGroupOfUserQuery(uid);
  const [localTaskGroups, setLocalTaskGroups] = useState<TaskGroup[]>([]);
  const { request: createTaskRequest } = useCreateTaskQuery();
  const { data: remoteTasks } = useGetTasksOfUserQuery(uid);
  const [createTaskIsVisible, setCreateTaskIsVisible] = useState(false);
  const [activeTaskGroupId, setActiveTaskGroupId] = useState('');
  const [activeTaskId, setActiveTaskId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriorityQuery, setFilterPriorityQuery] = useState('');

  const queryClient = useQueryClient();

  const priorityOptions = [
    {
      label: 'All',
      value: '',
    },
  ].concat(
    priorities.map((priority) => ({
      label: priority,
      value: priority,
    })),
  );

  const taskGroups = useMemo<TaskGroup[]>(
    () => [
      ...(remoteTaskGroups?.length ? remoteTaskGroups : []),
      ...localTaskGroups,
    ],
    [localTaskGroups, remoteTaskGroups],
  );

  const tasks = useMemo<Task[]>(() => {
    let taskArr = remoteTasks || [];

    if (searchQuery) taskArr = searchTasks(taskArr);

    if (filterPriorityQuery)
      taskArr = taskArr.filter(
        ({ priority }) => priority === filterPriorityQuery,
      );

    return taskArr;
  }, [remoteTasks, searchQuery, filterPriorityQuery]);

  const taskToUpdate = useMemo<Task | null>(() => {
    return tasks.find(({ _id }) => _id === activeTaskId) || null;
  }, [activeTaskId]);

  function searchTasks(unfilteredTasks: Task[]): Task[] {
    if (!searchQuery) {
      return unfilteredTasks;
    }

    return unfilteredTasks.filter((task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  function filterTasksByGroupId(groupId: string) {
    return tasks.filter(({ taskGroupId }) => taskGroupId === groupId);
  }

  function addTaskGroup() {
    const newTaskGroup: TaskGroup = {
      name: '',
      _id: uuidv4(),
      userId: uid!,
    };

    setLocalTaskGroups((curr) => [...curr, newTaskGroup]);
  }

  function removeUnsavedTaskGroup(id: string) {
    setLocalTaskGroups((curr) =>
      curr.filter((taskGroup) => taskGroup._id !== id),
    );
  }

  function changeGroupOfTask(taskId: string, taskGroupId: string) {
    const task = tasks.find(({ _id }) => taskId === _id);
    if (!task) {
      alert('Task does not exist');
      return;
    }
    createTaskRequest({ ...task, taskGroupId }).then(() => {
      queryClient.invalidateQueries([TASKS_QUERY_KEY]);
    });
  }

  function saveTaskGroup(newTaskGroup: TaskGroup) {
    request(newTaskGroup).then(() => {
      setLocalTaskGroups((curr) =>
        curr.map((taskGroup) =>
          taskGroup._id === newTaskGroup._id
            ? { ...taskGroup, ...newTaskGroup }
            : taskGroup,
        ),
      );
    });
  }

  function initCreateTask(taskGroupId: string) {
    setActiveTaskGroupId(taskGroupId);
    setCreateTaskIsVisible(true);
  }
  function initUpdateTask(taskId: string) {
    setActiveTaskId(taskId);
    setCreateTaskIsVisible(true);
  }

  function closeCreateTask() {
    setCreateTaskIsVisible(false);
    setActiveTaskId('');
  }

  function setNewTaskAndCloseCreateTask() {
    queryClient.invalidateQueries([TASKS_QUERY_KEY]);
    closeCreateTask();
  }

  return (
    <div className="overflow-hidden">
      <TheTopNav
        pageTitle="Tasks"
        subtitle="Add personal tasks for your to-do list"
      >
        <div className="flex gap-2">
          <div className="w-full">
            <UiInput
              value={searchQuery}
              name="searchQuery"
              placeholder="Search for tasks"
              onChange={({ value }) => setSearchQuery(value! as string)}
            />
          </div>
          <div className="w-32">
            <UiSelect
              value={filterPriorityQuery}
              options={priorityOptions}
              name="filterPriorityQuery"
              placeholder="All"
              onChange={({ value }) => setFilterPriorityQuery(value! as string)}
            />
          </div>
        </div>
      </TheTopNav>
      <div className="p-4 flex gap-4 overflow-auto">
        {taskGroups.map((taskGroup, index) => (
          <TaskList
            key={index}
            tasks={filterTasksByGroupId(taskGroup._id)}
            taskGroup={taskGroup}
            createTask={initCreateTask}
            updateTask={initUpdateTask}
            changeGroupOfTask={changeGroupOfTask}
            removeUnsavedTaskGroup={removeUnsavedTaskGroup}
            saveTaskGroup={saveTaskGroup}
          />
        ))}
        {taskGroups.length < 3 && (
          <UiButton variant="neutral" onClick={addTaskGroup}>
            <Plus size={24} />
          </UiButton>
        )}
      </div>
      <UiModal
        onClose={closeCreateTask}
        isOpen={createTaskIsVisible}
        title="Create Task"
      >
        <CreateTask
          taskGroupId={activeTaskGroupId}
          task={taskToUpdate}
          taskRequestCompleted={setNewTaskAndCloseCreateTask}
        />
      </UiModal>
    </div>
  );
}
