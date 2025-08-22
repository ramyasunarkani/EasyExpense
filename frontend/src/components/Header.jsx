import React from "react";
import PremiumButton from "./PremiumButton";
import { useSelector } from "react-redux";

const Header = () => {
  const { isLoggedIn, name, isPremium } = useSelector((state) => state.auth);

  return (
    <header className="fixed top-0 left-0 z-10 w-full flex justify-between items-center px-4 h-14
 bg-[#FFFFFF] border-b border-gray-300">
  {isLoggedIn ? (
    <div className="flex flex-col">
      <p className="text-lg text-teal-700 font-bold">
        {isPremium
          ? `Welcome back, ${name}! Enjoy your Premium experience.`
          : `Welcome, ${name}!`}
      </p>
    </div>
  ) : (
    <h1 className="text-xl font-bold text-[#00786F]">Expense Tracker</h1>
  )}

  {isLoggedIn && <PremiumButton />}
</header>

  );
};

export default Header;
