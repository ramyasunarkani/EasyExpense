import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Store/auth-actions";
import { downloadReport } from "../Store/premium-actions";
import { FaPlus } from "react-icons/fa6";
import { VscGraph } from "react-icons/vsc";
import { MdLeaderboard } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";

const NavBar = () => {
  const dispatch = useDispatch();
  const isPremium = useSelector((state) => state.auth.isPremium);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleReport = () => {
    dispatch(downloadReport());
  };

  return (
    <nav className="fixed top-14 left-0 right-0 h-12 bg-gray-100 border-b border-gray-300 flex items-center justify-between px-6 z-10">
      <div className="flex gap-6">
        <NavLink
          to="/home/add"
          className={({ isActive }) =>
            `px-3 py-1 rounded font-medium flex items-center gap-2 ${
              isActive ? "bg-teal-600 text-white" : "hover:bg-gray-200"
            }`
          }
        >
          <FaPlus />
          <span>Add Expense</span>
        </NavLink>

        <NavLink
          to="/home/expenses"
          className={({ isActive }) =>
            `px-3 py-1 rounded font-medium flex items-center gap-2 ${
              isActive ? "bg-teal-600 text-white" : "hover:bg-gray-200"
            }`
          }
        >
          <VscGraph />
          <span>Expenses</span>
        </NavLink>

        <NavLink
          to="/home/report"
          className={({ isActive }) =>
            `px-3 py-1 rounded font-medium flex items-center gap-2 ${
              isActive ? "bg-teal-600 text-white" : "hover:bg-gray-200"
            }`
          }
        >
          <FaFileAlt />
          <span>Report</span>
        </NavLink>

        {isPremium && (
          <NavLink
            to="/home/leaderboard"
            className={({ isActive }) =>
              `px-3 py-1 rounded font-medium flex items-center gap-2 ${
                isActive ? "bg-teal-600 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            <MdLeaderboard />
            <span>Leaderboard</span>
          </NavLink>
        )}
      </div>

     
      <div className="flex gap-4">
       
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
