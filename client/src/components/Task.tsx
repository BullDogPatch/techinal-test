import { SingleTask } from '../App';

const Task = ({ task }: { task: SingleTask }) => {
  return (
    <div>
      <p className='text-2xl'>{task.title}</p>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {task.due_date}</p>
    </div>
  );
};

export default Task;
