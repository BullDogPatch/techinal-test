import { Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import './App.css';
import TaskPage from './pages/TaskPage';
import CreateTaskPage from './pages/CreateTaskPage';
import { ToastContainer } from 'react-toastify';

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
        <Route path='/create' element={<CreateTaskPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
