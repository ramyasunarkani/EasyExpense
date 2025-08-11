import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { leaderBoardList } from "../Store/premium-actions";
import { useNavigate } from "react-router";

const LeaderBoard = () => {
  const dispatch = useDispatch();
  const leaderboard = useSelector((state) => state.premium.leaderboard || []);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(leaderBoardList());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6 relative">
      
      <button
        onClick={() => navigate("/home")}
        className="absolute top-6 left-6 text-3xl text-gray-700 hover:text-gray-900"
        aria-label="Go back home"
      >
        ←
      </button>

      <h2 className="text-3xl font-bold mb-8 text-gray-800">LeaderBoard</h2>

      <ul className="w-full max-w-md bg-white  shadow-md divide-y divide-gray-200">
        {leaderboard.length === 0 && (
          <li className="p-4 text-center text-gray-500">No data available</li>
        )}
        {leaderboard.map((user, idx) => (
          <li
            key={idx}
            className="flex justify-between px-6 py-4 hover:bg-gray-100  cursor-default"
          >
            <span className="font-medium text-gray-900">{user.name}</span>
            <span className="font-semibold text-green-600">₹{user.totalExpenses}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoard;
