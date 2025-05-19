import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { SingleTask, TASK_STATUS } from '../App';
import {
  deleteTask,
  fetchTask,
  updateTaskDescription,
  updateTaskStatus,
} from '../utils/api';
import { FaTrash, FaEdit } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { TiTick } from 'react-icons/ti';

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

  const { mutate: updateDescription } = useMutation({
    mutationFn: updateTaskDescription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', id] });
      setIsEditable(false);
      toast.success('Task deleted successfully! 🎉', {
        position: 'bottom-right',
        autoClose: 1000,
      });
    },
    onError: () => {
      toast.error('Failed to update task descrtipion', {
        position: 'bottom-right',
        autoClose: 1000,
      });
    },
  });

  if (isPending)
    return (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
        <circle
          fill='#FF156D'
          stroke='#FF156D'
          stroke-width='2'
          r='15'
          cx='40'
          cy='65'
        >
          <animate
            attributeName='cy'
            calcMode='spline'
            dur='2'
            values='65;135;65;'
            keySplines='.5 0 .5 1;.5 0 .5 1'
            repeatCount='indefinite'
            begin='-.4'
          ></animate>
        </circle>
        <circle
          fill='#FF156D'
          stroke='#FF156D'
          stroke-width='2'
          r='15'
          cx='100'
          cy='65'
        >
          <animate
            attributeName='cy'
            calcMode='spline'
            dur='2'
            values='65;135;65;'
            keySplines='.5 0 .5 1;.5 0 .5 1'
            repeatCount='indefinite'
            begin='-.2'
          ></animate>
        </circle>
        <circle
          fill='#FF156D'
          stroke='#FF156D'
          stroke-width='2'
          r='15'
          cx='160'
          cy='65'
        >
          <animate
            attributeName='cy'
            calcMode='spline'
            dur='2'
            values='65;135;65;'
            keySplines='.5 0 .5 1;.5 0 .5 1'
            repeatCount='indefinite'
            begin='0'
          ></animate>
        </circle>
      </svg>
    );

  return (
    <div className='w-[90%] md:w-[50%] mx-auto mt-28 p-6 rounded-lg shadow-lg border-2 border-blue-200'>
      <h2 className='text-3xl font-bold m-4'>{task?.title}</h2>

      {isEditable ? (
        <div className='flex items-center'>
          <input
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className='m-auto text-xl py-1 px-6 rounded-sm bg-gray-900 border-2 border-transparent focus:border-red-500 focus:outline-none'
            autoFocus
          />
          <TiTick
            color='green'
            className='text-3xl cursor-pointer'
            title='Save'
            onClick={() =>
              updateDescription({
                id: task?.id,
                description: editedDescription,
              })
            }
          />
        </div>
      ) : (
        <div className='m-auto flex justify-center items-center gap-2'>
          <p className='text-xl p-4'>
            {task?.description || 'No description provided.'}
          </p>
          <FaEdit
            onClick={() => setIsEditable(true)}
            className='cursor-pointer text-blue-500'
            title='Edit description'
          />
        </div>
      )}

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
