import { useEffect, useState } from 'react';
import './App.css';

interface Task {
  id: number;
  description?: string;
  status: boolean;
  due_date: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:8080/tasks');
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <>
      {tasks.map((task) => (
        <div>{task.description}</div>
      ))}
    </>
  );
}

export default App;
