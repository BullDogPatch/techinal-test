import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { SingleTask, TASK_STATUS } from '../App';
import { deleteTask, fetchTask, updateTaskStatus } from '../utils/api';
import { FaTrash, FaEdit } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

export const dateFormatter = (date: string): string => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

const TaskPage = () => {
  const [isEditable, setIsEditable] = useState(false);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: task, isPending } = useQuery<SingleTask>({
    queryKey: ['task', id],
    queryFn: () => fetchTask(id),
  });

  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    if (task?.description) {
      setEditedDescription(task.description);
    }
  }, [task]);

  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteTask,
    // https://tanstack.com/query/v4/docs/framework/react/guides/optimistic-updates#updating-a-list-of-todos-when-adding-a-new-todo
    onMutate: async (taskId: number) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      queryClient.setQueryData<SingleTask[]>(['tasks'], (tasks) =>
        tasks?.filter((task) => task.id !== taskId)
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      navigate('/');
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

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task', id] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  if (isPending) return <p>Loading...</p>;

  return (
    <div className='w-[90%] md:w-[50%] mx-auto mt-28 p-6 rounded-lg shadow-lg border-2 border-blue-200'>
      <h2 className='text-3xl font-bold m-4'>{task?.title}</h2>

      {isEditable ? (
        <input
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className='p-1 bg-gray-700'
        />
      ) : (
        <p className='text-xl p-4'>
          {task?.description || 'No description provided.'}
        </p>
      )}
      <FaEdit
        onClick={() => setIsEditable((prev) => !prev)}
        className='cursor-pointer'
      />
      <div className='mb-4'>
        <p className='mb-2 font-semibold'>Status:</p>
        <select
          className='w-full p-2 border border-gray-300 rounded-md  focus:outline-none focus:border-blue-400'
          value={task?.status || ''}
          onChange={(e) =>
            updateMutate({ id: task?.id, status: e.target.value })
          }
        >
          <option disabled value='' className='text-black'>
            -- Choose status --
          </option>
          {TASK_STATUS.map((status) => (
            <option key={status} value={status} className='text-gray-900'>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className='mb-2 font-semibold'></p>
        <p className='italic p-4'>
          Due Date:{' '}
          {task?.due_date ? dateFormatter(task.due_date) : 'No due date'}
        </p>
      </div>
      <button
        disabled={isDeleting}
        onClick={() => mutate(task!.id)}
        className='cursor-pointer mt-2 bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 disabled:cursor-not-allowed'
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default TaskPage;
