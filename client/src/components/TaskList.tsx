// import { useEffect, useState } from 'react';
import { SingleTask } from '../App';
import Task from './Task';
import { useQuery } from '@tanstack/react-query';

const fetchTasks = async () => {
  const response = await fetch('http://localhost:8080/tasks');
  const data = await response.json();
  return data;
};

const TaskList = () => {
  const { data: tasks, isPending } = useQuery<SingleTask[]>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 5000,
  });

  if (isPending) return <p>Loading...</p>;

  return (
    <div>
      {tasks?.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
