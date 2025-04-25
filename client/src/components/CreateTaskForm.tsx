import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const createTask = async (task: {
  title: string;
  description?: string;
  status: string;
  due_date: string;
}) => {
  const response = await fetch('http://localhost:8080/create-task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  return response.json();
};

const CreateTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [dueDate, setDueDate] = useState('');

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      setTitle(''),
        setDescription(''),
        setStatus('todo'),
        setDueDate(''),
        queryClient.invalidateQueries({ queryKey: ['tasks'] }),
        navigate('/');
    },
    onError: (error) => {
      console.error('Mutation failed:', error);
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
      className='max-w-2xl mx-auto space-y-4 flex flex-col'
      onSubmit={handleSubmit}
    >
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        id='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor='description'>Description</label>
      <textarea
        id='description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
      />

      <label htmlFor='status'>Status</label>
      <select
        id='status'
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value='todo' className='text-black'>
          To Do
        </option>
        <option value='in-progress' className='text-black'>
          In Progress
        </option>
        <option value='done' className='text-black'>
          Done
        </option>
      </select>

      <label htmlFor='dueDate'>Due Date</label>
      <input
        type='date'
        id='dueDate'
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button
        type='submit'
        className='bg-blue-500 text-white p-2 rounded-md disabled:opacity-50'
        disabled={isPending}
      >
        {isPending ? 'Submitting...' : 'Create Task'}
      </button>

      {isError && <p className='text-red-500'>Something went wrong!</p>}
    </form>
  );
};

export default CreateTaskForm;
