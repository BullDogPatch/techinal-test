import { SingleTask } from '../App';

const Task = ({ task }: { task: SingleTask }) => {
  return (
    <div className='m-6'>
      <p className='text-2xl'>{task.title}</p>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {task.due_date}</p>
      <button>Delete</button>
    </div>
  );
};

export default Task;
