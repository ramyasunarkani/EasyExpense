import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { leaderBoardList } from "../Store/premium-actions";

const LeaderBoard = () => {
  const dispatch = useDispatch();
  const leaderboard = useSelector((state) => state.premium.leaderboard || []);

  useEffect(() => {
    dispatch(leaderBoardList());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center p-6 w-full h-full mt-5">
      <div className="w-full max-w-3xl bg-white rounded-xl ">
        <table className="w-full text-left border-collapse">
          <thead className="bg-violet-600 text-white">
            <tr>
              <th className="px-6 py-3">Rank</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Total Expense</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              leaderboard.map((user, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-gray-700">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-4 text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 font-semibold text-green-600">
                    ₹{user.totalExpenses}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;
