import React from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux"; 
import { buyPremium } from "../Store/payment-actions";

const PremiumButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isPremium = useSelector((state) => state.auth.isPremium);

  const handleBuyPremium = () => {
    dispatch(buyPremium(navigate));
  };

  return (
    <>
      {!isPremium && (
        <button
          onClick={handleBuyPremium}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 cursor-pointer transition"
        >
          Buy Premium Membership
        </button>
      )}
    </>
  );
};

export default PremiumButton;
