import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { SingleTask } from '../App';
import { fetchTask } from '../utils/api';

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
      <p> Status: {task?.status}</p>
      <p>Due Date: {task?.due_date}</p>
    </div>
  );
};

export default TaskPage;
