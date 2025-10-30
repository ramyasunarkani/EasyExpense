import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllExpenses } from "../../Store/expense-actions";
import Expense from "./Expense";
import Pagination from "../Pagination ";
import { downloadReport } from "../../Store/premium-actions";

const Expenses = () => {
  const dispatch = useDispatch();
  const isPremium = useSelector((state) => state.auth.isPremium);
  const {
    allExpenses = [],
    totalPages = 0,
    currentPage = 1,
    limit: stateLimit,
  } = useSelector((state) => state.expenses);

  const [limit, setLimit] = useState(() => {
    return Number(localStorage.getItem("expensesLimit")) || stateLimit || 10;
  });

  useEffect(() => {
    localStorage.setItem("expensesLimit", limit);
    dispatch(fetchAllExpenses(currentPage, limit));
  }, [dispatch, currentPage, limit]);

  const changePage = (page) => {
    if (page > 0 && page <= totalPages) {
      dispatch(fetchAllExpenses(page, limit));
    }
  };

  const downloadCSV = () => {
      dispatch(downloadReport());
    };

  return (
    <div className="w-full max-w-5xl mx-auto pt-7 rounded-lg pb-18">
      <h2 className="text-xl  text-center mb-4">Your Expenses</h2>

      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="limit" className="mr-2 font-medium">
            Expenses per page:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border p-1 rounded text-black"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={40}>40</option>
          </select>
        </div>
       {isPremium&&( <button
          onClick={downloadCSV}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
        >
          Download Expenses CSV
        </button>)}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-teal-600 rounded-lg overflow-hidden">
          <thead className="bg-teal-700 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {allExpenses.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-300">
                  No expenses found.
                </td>
              </tr>
            ) : (
              allExpenses.map((expense) => (
                <Expense key={expense._id} {...expense} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
};

export default Expenses;
