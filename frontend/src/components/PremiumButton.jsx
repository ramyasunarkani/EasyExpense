import React from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux"; 
import { buyPremium } from "../Store/payment-actions";
import { downloadReport } from "../Store/premium-actions";

const PremiumButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isPremium = useSelector((state) => state.auth.isPremium);

  const handleBuyPremium = () => {
    dispatch(buyPremium(navigate));
  };

  const showLeaderBoard=()=>{
    navigate('/home/leaderboard')

  }
  const showReport = () => {
    dispatch(downloadReport()); 
  };

  return (
    <>
      {isPremium ? (
       <>
        <p className="text-blue-400 italic">Thank You For being a Premium Member</p>
        <button 
        className="border-0 cursor-pointer text-white bg-green-400 px-4 py-1"
        onClick={showLeaderBoard}
        >show leaderboard</button>
        <button 
        className="border-0 cursor-pointer text-white bg-green-400 px-4 py-1 ml-3"
        onClick={showReport}
       
        >Report Generate</button>
        
         </>
      ) : (
        <button
          onClick={handleBuyPremium}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Buy Premium Membership
        </button>
      )}
    </>
  );
};

export default PremiumButton;
