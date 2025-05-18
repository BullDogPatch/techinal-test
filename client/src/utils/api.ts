import { SingleTask } from '../App';

const BASE_URL = 'http://localhost:8080';
// const BASE_URL = 'https://techinal-test.onrender.com';

export const fetchTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`);
  const data = await response.json();
  return data;
};

export const fetchTask = async (
  id: string | undefined
): Promise<SingleTask> => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`);
  const data = await response.json();
  return data;
};

export const createTask = async (task: {
  title: string;
  description?: string;
  status: string;
  due_date: string;
}) => {
  const response = await fetch(`${BASE_URL}/create-task`, {
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
  const response = await fetch(`${BASE_URL}/delete-task/${id}`, {
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

export const updateTaskStatus = async ({
  id,
  status,
}: {
  id: number | undefined;
  status: string;
}) => {
  const response = await fetch(`${BASE_URL}/task/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error('Failed to update task status');
  }

  return response.json();
};
