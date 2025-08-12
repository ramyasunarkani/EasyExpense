const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1); // first page

    if (currentPage > 3) {
      pageNumbers.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push("...");
    }

    pageNumbers.push(totalPages); 
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {pageNumbers.map((num, idx) => (
        <button
          key={idx}
          onClick={() => num !== "..." && onPageChange(num)}
          disabled={num === "..."}
          className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-medium
            ${num === currentPage ? "bg-purple-500 text-white border-purple-500" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"} 
            ${num === "..." ? "cursor-default" : "cursor-pointer"}`}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
