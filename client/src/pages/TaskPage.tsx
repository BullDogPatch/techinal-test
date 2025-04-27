import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { SingleTask, TASK_STATUS } from '../App';
import { fetchTask, updateTaskStatus } from '../utils/api';

const TaskPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: task, isPending } = useQuery<SingleTask>({
    queryKey: ['task', id],
    queryFn: () => fetchTask(id),
  });

  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task', id] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  if (isPending) return <p>Loading...</p>;

  return (
    <div className='max-w-2xl mx-auto mt-10 p-6 rounded-lg shadow-lg'>
      <h2 className='text-3xl font-bold mb-4'>{task?.title}</h2>

      <div className='mb-4'>
        <p className='mb-2 font-semibold'>Description:</p>
        <p className=''>{task?.description || 'No description provided.'}</p>
      </div>

      <div className='mb-4'>
        <p className='mb-2 font-semibold'>Status:</p>
        <select
          className='w-full p-2 border border-gray-300 rounded-md  focus:outline-none focus:border-blue-400'
          value={task?.status || ''}
          onChange={(e) => mutate({ id: task?.id, status: e.target.value })}
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
        <p className='mb-2 font-semibold'>Due Date:</p>
        <p>{task?.due_date}</p>
      </div>
    </div>
  );
};

export default TaskPage;
