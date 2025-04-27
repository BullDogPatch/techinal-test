import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { SingleTask } from '../App';
import { fetchTask } from '../utils/api';

const TASKS_STATUS = ['todo', 'in-progress', 'done'];

const TaskPage = () => {
  const { id } = useParams();
  const { data: task, isPending } = useQuery<SingleTask>({
    queryKey: ['task', id],
    queryFn: () => fetchTask(id),
  });

  if (isPending) return <p>Loading...</p>;

  return (
    <div>
      <p className='text-2xl'>{task?.title}</p>
      <p>{task?.description}</p>
      <span>{task?.status}</span>
      <select name='' id=''>
        <option value=''>--choose status--</option>
        {TASKS_STATUS.map((status) => (
          <option>{status}</option>
        ))}
      </select>
      <p>Due Date: {task?.due_date}</p>
    </div>
  );
};

export default TaskPage;
