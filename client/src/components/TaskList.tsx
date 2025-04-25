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
  // const [tasks, setTasks] = useState<SingleTask[]>([]);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     const response = await fetch('http://localhost:8080/tasks');
  //     const data = await response.json();
  //     setTasks(data);
  //   };
  //   fetchTasks();
  // }, []);

  const { data: tasks } = useQuery<SingleTask[]>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  return (
    <div>
      {tasks?.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
