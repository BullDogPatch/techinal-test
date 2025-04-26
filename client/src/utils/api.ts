import { SingleTask } from '../App';

export const fetchTasks = async () => {
  const response = await fetch('http://localhost:8080/tasks');
  const data = await response.json();
  return data;
};

export const fetchTask = async (
  id: string | undefined
): Promise<SingleTask> => {
  const response = await fetch(`http://localhost:8080/tasks/${id}`);
  const data = await response.json();
  return data;
};

export const createTask = async (task: {
  title: string;
  description?: string;
  status: string;
  due_date: string;
}) => {
  const response = await fetch('http://localhost:8080/create-task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  return response.json();
};

export const deleteTask = async (id: number) => {
  const response = await fetch(`http://localhost:8080/delete-task/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('failed to delete task ☹️');
  }
  return true;
};
