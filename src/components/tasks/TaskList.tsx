import { Plus } from '@phosphor-icons/react';
import React from 'react';
import Task from '../../types/Task';
import TaskGroup from '../../types/TaskGroup';
import UiButton from '../ui/UiButton';
import TaskDetails from './TaskDetails';
import TasksHeader from './TasksHeader';

interface Props {
  taskGroup: TaskGroup;
  tasks: Task[];
  removeUnsavedTaskGroup: (taskId: string) => void;
  saveTaskGroup: (taskGrup: TaskGroup) => void;
  createTask: (taskGroupId: string) => void;
  updateTask: (taskId: string) => void;
  changeGroupOfTask: (taskId: string, taskGroupId: string) => void;
}
export default function Tasks({
  taskGroup,
  tasks,
  removeUnsavedTaskGroup,
  createTask,
  saveTaskGroup,
  updateTask,
  changeGroupOfTask,
}: Props) {
  function acceptTask(e: React.DragEvent) {
    const taskId = e.dataTransfer?.getData('taskId');
    changeGroupOfTask(taskId, taskGroup._id);
  }
  return (
    <div
      className="bg-gray-50 p-2 rounded-lg min-h-screen w-80"
      onDrop={acceptTask}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault()}
    >
      <TasksHeader
        taskGroupDetails={taskGroup}
        removeUnsavedTaskGroup={removeUnsavedTaskGroup}
        saveTaskGroup={saveTaskGroup}
      />
      <div className="grid gap-2 mt-4">
        {tasks.map((task) => (
          <TaskDetails
            name={task.name}
            taskId={task._id}
            priority={task.priority}
            key={task._id}
            updateTask={() => updateTask(task._id)}
          />
        ))}
      </div>
      <div className="my-12">
        <UiButton
          block
          variant="neutral"
          size="sm"
          onClick={() => createTask(taskGroup._id)}
        >
          <Plus size={20} /> Create new task
        </UiButton>
      </div>
    </div>
  );
}
