import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SingleTask } from '../App';
import { deleteTask } from '../utils/api';
import { toast } from 'react-toastify';

const Task = ({ task }: { task: SingleTask }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] }),
        toast.success('Task deleted successfully! 🎉', {
          position: 'bottom-right',
          autoClose: 1000,
        });
    },
    onError: () => {
      toast.error('Failed to delete task', {
        position: 'bottom-right',
        autoClose: 1000,
      });
    },
  });

  return (
    <div className='m-6'>
      <p className='text-2xl'>{task.title}</p>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {task.due_date}</p>
      <button
        onClick={() => mutate(task.id)}
        className='cursor-pointer bg-red-600 px-2 py-1 rounded-md'
      >
        Delete
      </button>
    </div>
  );
};

export default Task;
