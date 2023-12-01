import { Clipboard } from '@phosphor-icons/react';
import UiButton from '../ui/UiButton';

interface Props {
  name: string;
  priority: string;
  taskId: string;
  updateTask: () => void;
}
export default function TaskDetails({
  name,
  taskId,
  priority,
  updateTask,
}: Props) {
  function copyToClipboard(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    navigator.clipboard.writeText(name).then(() => {
      alert('copied to clipboard');
    });
  }

  function startDrag(event: React.DragEvent<HTMLDivElement>) {
    if (!event.dataTransfer) return;
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('taskId', taskId);
  }

  return (
    <div
      className="bg-white grid gap-2 cursor-pointer  p-2 rounded text-gray-900 text-sm capitalize"
      draggable="true"
      onDragStart={startDrag}
      onClick={updateTask}
    >
      <div className="flex justify-between items-center">
        {name}

        <UiButton onClick={copyToClipboard} variant="transparent">
          <Clipboard />
        </UiButton>
      </div>
      <div className="bg-gray-25 rounded-sm px-2 py-1 w-fit text-xs">
        {priority}
      </div>
    </div>
  );
}
