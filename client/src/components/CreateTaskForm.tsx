import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../utils/api';
import { toast } from 'react-toastify';
import { TASK_STATUS } from '../App';

const CreateTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      toast.success('Task created successfully! 🎉', {
        position: 'bottom-right',
        autoClose: 1000,
      });
      setTitle('');
      setDescription('');
      setStatus('');
      setDueDate('');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      navigate('/');
    },
    onError: (error) => {
      console.error('Mutation failed:', error);
      toast.error('Failed to create task', {
        position: 'bottom-right',
        autoClose: 1000,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      title,
      description,
      status,
      due_date: dueDate,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-xl mx-auto p-6 rounded-lg shadow-md space-y-5'
    >
      <h2 className='text-2xl font-bold mb-4 text-center'>Create a New Task</h2>

      <div className='flex flex-col'>
        <label htmlFor='title' className='mb-1 font-semibold'>
          Title
        </label>
        <input
          id='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-400'
        />
      </div>

      <div className='flex flex-col'>
        <label htmlFor='description' className='mb-1 font-semibold'>
          Description
        </label>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          minLength={10}
          required
          className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-400'
        />
      </div>

      <div className='flex flex-col'>
        <label htmlFor='status' className='mb-1 font-semibold'>
          Status
        </label>
        <select
          id='status'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-400'
        >
          <option value=''>-- Pick Status --</option>
          {TASK_STATUS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col'>
        <label htmlFor='dueDate' className='mb-1 font-semibold'>
          Due Date
        </label>
        <input
          id='dueDate'
          type='date'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-400'
        />
      </div>

      <button
        type='submit'
        disabled={isPending}
        className='w-full py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer'
      >
        {isPending ? 'Submitting...' : 'Create Task'}
      </button>

      {isError && (
        <p className='text-red-500 text-center'>Something went wrong!</p>
      )}
    </form>
  );
};

export default CreateTaskForm;
