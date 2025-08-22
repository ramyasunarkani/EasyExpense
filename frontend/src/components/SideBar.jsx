import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Store/auth-actions";
import { downloadReport } from "../Store/premium-actions";
import { FaPlus } from "react-icons/fa6";
import { VscGraph } from "react-icons/vsc";
import { MdLeaderboard } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";




const SideBar = () => {
  const dispatch = useDispatch();
  const isPremium = useSelector((state) => state.auth.isPremium);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleReport = () => {
    dispatch(downloadReport());
  };

  return (
    <aside className="w-64 h-[calc(100vh-64px)] fixed left-0 top-14 bg-gray-100 border-r border-gray-300 flex flex-col justify-between">
      <nav className="flex flex-col gap-3 p-4">
        <NavLink
          to="/home/add"
          className={({ isActive }) =>
            `px-3 py-2 rounded cursor-pointer font-medium flex items-center gap-2 ${
              isActive ? "bg-violet-600 text-white" : "hover:bg-gray-200"
            }`
          }
        >
          <FaPlus /><span>Add Expense</span> 
        </NavLink>
        <NavLink
          to="/home/expenses"
          className={({ isActive }) =>
            `px-3 py-2 rounded cursor-pointer font-medium flex items-center gap-2 ${
              isActive ? "bg-violet-600 text-white" : "hover:bg-gray-200"
            }`
          }
        >
        <VscGraph />
        <span> Expenses</span>
        </NavLink>

        
        {isPremium && (
          <>
            <NavLink
              to="/home/leaderboard"
              className={({ isActive }) =>
            `px-3 py-2 rounded cursor-pointer font-medium flex items-center gap-2 ${
              isActive ? "bg-violet-600 text-white" : "hover:bg-gray-200"
            }`
          }
            ><MdLeaderboard />
              <span>Leaderboard</span>
            </NavLink>
            {/* <button
              onClick={handleReport}
              className={({ isActive }) =>
            `px-3 py-2 rounded cursor-pointer font-medium flex items-center gap-2 ${
              isActive ? "bg-violet-600 text-white" : "hover:bg-gray-200"
            }`
          }><FaFileAlt />
            <span> Report</span>
            </button> */}
          </>
        )}
      </nav>

      {/* Logout button at bottom */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
