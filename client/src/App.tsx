import TaskList from './components/TaskList';
import './App.css';

export interface SingleTask {
  id: number;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  due_date: string;
}

function App() {
  return (
    <>
      <TaskList />
    </>
  );
}

export default App;
