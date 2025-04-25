import './App.css';
import TaskList from './components/TaskList';

export interface SingleTask {
  id: number;
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
