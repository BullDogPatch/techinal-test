import { SingleTask } from '../App';

const Task = ({ task }: { task: SingleTask }) => {
  return <div>{task.description}</div>;
};

export default Task;
