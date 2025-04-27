// import { useEffect, useState } from 'react';
import { SingleTask } from '../App';
import { fetchTasks } from '../utils/api';
import Task from './Task';
import { useQuery } from '@tanstack/react-query';

const TaskList = () => {
  const { data: tasks, isPending } = useQuery<SingleTask[]>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 3000,
  });

  if (isPending) return <p>Loading...</p>;

  return (
    <div className='animate-fade-in'>
      {tasks?.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
