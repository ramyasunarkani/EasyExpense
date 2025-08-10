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
    <div>
      <h2>LeaderBoard</h2>
      <ul>
        {leaderboard.map((user, idx) => (
          <li key={idx}>
            {user.name} — ₹{user.totalExpenses}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoard;
