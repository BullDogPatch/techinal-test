import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const Header = () => {
  return (
    <header className='flex justify-between items-center px-4 py-5'>
      <h1 className='text-xl font-bold md:text-2xl lg:text-3xl'>
        Task Tracker
      </h1>
      <Link
        title='Create a task'
        to='/create'
        className='flex items-center gap-2 bg-white text-blue-600 font-semibold px-3 py-1 rounded-md hover:bg-gray-100 transition hover:shadow-md hover:scale-105'
      >
        <FaPlus />
        <span className='hidden sm:block'>Create</span>
      </Link>
    </header>
  );
};

export default Header;
