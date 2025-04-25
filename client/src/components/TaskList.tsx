import { useEffect, useState } from 'react';
import { SingleTask } from '../App';
import Task from './Task';

const TaskList = () => {
  const [tasks, setTasks] = useState<SingleTask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:8080/tasks');
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
