import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { SingleTask } from '../App';

const fetchTask = async (id: string | undefined): Promise<SingleTask> => {
  const response = await fetch(`http://localhost:8080/tasks/${id}`);
  const data = await response.json();
  return data;
};

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
