import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SingleTask } from '../App';
import { deleteTask } from '../utils/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

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
      <Link to={`/task/${task.id}`}>
        <div className='hover:shadow-md hover:bg-gray-800 transition-all p-4 rounded-md'>
          <p className='text-2xl font-bold'>{task.title}</p>
          <p className='text-gray-600'>{task.description}</p>
          <p className='text-sm text-gray-500'>Status: {task.status}</p>
          <p className='text-sm text-gray-500'>Due Date: {task.due_date}</p>
        </div>
      </Link>

      <button
        onClick={() => mutate(task.id)}
        className='cursor-pointer mt-2 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700'
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default Task;
