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
    refetchInterval: 5000,
  });

  if (isPending) return <p>Loading...</p>;

  return (
    <div className='animate-fade-in w-[90%] mx-auto md:w-[50%] m-16'>
      {tasks?.length ? (
        tasks?.map((task) => <Task key={task.id} task={task} />)
      ) : (
        <p>No tasks, go and create one</p>
      )}
    </div>
  );
};

export default TaskList;
