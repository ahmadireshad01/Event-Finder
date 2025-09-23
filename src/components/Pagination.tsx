export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex gap-2 mt-6 justify-center">
      <button
        disabled={currentPage === 1 || totalPages === 1} // keep disabled for first/only page
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-3 py-1 rounded text-white ${
          currentPage === 1 || totalPages === 1
            ? "bg-gray-700 opacity-50 cursor-not-allowed"
            : "bg-gray-700 hover:bg-gray-600"
        }`}
      >
        Prev
      </button>

      <span className="text-white">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages || totalPages === 1} // keep disabled for last/only page
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-3 py-1 rounded text-white ${
          currentPage === totalPages || totalPages === 1
            ? "bg-gray-700 opacity-50 cursor-not-allowed"
            : "bg-gray-700 hover:bg-gray-600"
        }`}
      >
        Next
      </button>
    </div>
  );
}
