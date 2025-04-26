import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const Header = () => {
  return (
    <header className='flex justify-between items-center '>
      <h1 className='text-3xl font-bold'>Task Tracker</h1>
      <Link
        to='/create'
        className='flex items-center gap-2 bg-white text-blue-600 font-semibold px-3 py-1 rounded-md hover:bg-gray-100 transition'
      >
        <FaPlus />
        <span>Create</span>
      </Link>
    </header>
  );
};

export default Header;
