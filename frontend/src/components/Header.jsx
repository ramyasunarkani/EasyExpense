import React from 'react';
import PremiumButton from './PremiumButton';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Store/auth-actions';

const Header = () => {
  const dispatch=useDispatch();
  const name=useSelector(state=>state.auth.name)
  function handleLogout(){
    dispatch(logoutUser());
  }
  return (
    <header className="flex justify-between items-center px-3 pb-2 bg-white shadow-md shadow-amber-100 mb-2">
      <section>
        <p className="text-lg text-gray-700 font-bold">
          Welcome {name}!
        </p>
        <div>
          <PremiumButton />
        </div>
      </section>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
