import { Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import './App.css';
import TaskPage from './pages/TaskPage';

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
      <Routes>
        <Route path='/' element={<TaskList />} />
        <Route path='/task/:id' element={<TaskPage />} />
      </Routes>
    </>
  );
}

export default App;
