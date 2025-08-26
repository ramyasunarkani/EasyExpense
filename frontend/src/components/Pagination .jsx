const Pagination = ({ totalPages = 1, currentPage = 1, onPageChange }) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md text-sm font-medium transition
          ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
      >
        &lt; Prev
      </button>

      <span className="text-gray-700 font-medium">
        Page {currentPage} of {totalPages > 0 ? totalPages : 1}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className={`px-4 py-2 rounded-md text-sm font-medium transition
          ${
            currentPage === totalPages || totalPages === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
