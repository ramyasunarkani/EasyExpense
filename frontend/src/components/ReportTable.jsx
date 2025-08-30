import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReport } from "../Store/expense-actions";

const ReportTable = () => {
  const dispatch = useDispatch();
  const report = useSelector((state) => state.report.expenses);
  const [range, setRange] = useState("daily");

  useEffect(() => {
    dispatch(fetchReport(range));
  }, [dispatch, range]);

  return (
    <div className="w-full max-w-5xl mx-auto pt-7 rounded-lg">
      <h2 className="text-xl text-center mb-4">Expense Report</h2>

      <div className="flex justify-center gap-3 mb-4">
        {["daily", "weekly", "monthly", "yearly"].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-4 py-2 rounded font-medium border ${
              range === r ? "bg-teal-600 text-white" : "hover:bg-gray-200"
            }`}
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-teal-600 rounded-lg overflow-hidden">
          <thead className="bg-teal-700 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Total Amount</th>
              <th className="px-4 py-2 text-left">Times Bought</th>
            </tr>
          </thead>
          <tbody>
            {report.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-300">
                  No expenses found for this range.
                </td>
              </tr>
            ) : (
              report.map((item) => (
                <tr key={item.category}>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.totalAmount}</td>
                  <td className="px-4 py-2">{item.count}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;
