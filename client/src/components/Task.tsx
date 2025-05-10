import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SingleTask } from '../App';
import { deleteTask } from '../utils/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Task = ({ task }: { task: SingleTask }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
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
    <div className='m-6 p-6 rounded-md border-2 border-blue-200'>
      <Link to={`/task/${task.id}`}>
        <div className='hover:shadow-md hover:bg-gray-800 transition-all p-4 rounded-md'>
          <p className='text-2xl font-bold'>{task.title}</p>
          <p className='text-xl text-gray-400 my-2'>{task.description}</p>
          <p
            className={` ${
              task.status === 'done'
                ? 'my-1 text-lg text-green-500'
                : task.status === 'todo'
                ? 'my-1 text-lg text-red-500'
                : 'my-1 text-lg text-blue-500'
            }`}
          >
            Status: {task.status}
          </p>
          <p className='text-sm text-gray-500 italic font-semibold'>
            Due Date: {task.due_date}
          </p>
        </div>
      </Link>

      <button
        disabled={isPending}
        onClick={() => mutate(task.id)}
        className='cursor-pointer mt-2 bg-red-600 text-white px-5 py-1 rounded-md hover:bg-red-700 disabled:cursor-not-allowed'
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default Task;
