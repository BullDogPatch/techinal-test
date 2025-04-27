import { Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import './App.css';
import TaskPage from './pages/TaskPage';
import CreateTaskPage from './pages/CreateTaskPage';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';

export interface SingleTask {
  id: number;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  due_date: string;
}

export const TASK_STATUS = ['todo', 'in-progress', 'done'];

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<TaskList />} />
        <Route path='/task/:id' element={<TaskPage />} />
        <Route path='/create' element={<CreateTaskPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
