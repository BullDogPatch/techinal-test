import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { SingleTask } from '../App';
import { fetchTask, updateTaskStatus } from '../utils/api';

const TASKS_STATUS = ['todo', 'in-progress', 'done'];

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
    <div>
      <p className='text-2xl'>{task?.title}</p>
      <p>{task?.description}</p>
      <span>{task?.status}</span>
      <select
        name=''
        id=''
        onChange={(e) => mutate({ id: task?.id, status: e.target.value })}
      >
        <option className='text-gray-900' value=''>
          --choose status--
        </option>
        {TASKS_STATUS.map((status) => (
          <option className='text-gray-900'>{status}</option>
        ))}
      </select>
      <p>Due Date: {task?.due_date}</p>
    </div>
  );
};

export default TaskPage;
