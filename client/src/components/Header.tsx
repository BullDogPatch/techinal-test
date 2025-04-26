import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const Header = () => {
  return (
    <header className='flex justify-between items-center px-3 py-4'>
      <h1 className='text-xl font-bold md:text-2xl lg:text-3xl'>
        Task Tracker
      </h1>
      <Link
        to='/create'
        className='flex items-center gap-2 bg-white text-blue-600 font-semibold px-3 py-1 rounded-md hover:bg-gray-100 transition hover:shadow-md hover:scale-105'
      >
        <FaPlus />
        <span>Create</span>
      </Link>
    </header>
  );
};

export default Header;
