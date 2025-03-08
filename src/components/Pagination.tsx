interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If total pages is less than or equal to maxPagesToShow, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate start and end of the middle section
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the start or end
      if (currentPage <= 2) {
        end = 4;
      }
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <ol className="flex justify-center gap-1 text-xs font-medium">
      {/* Previous button */}
      <li>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`h-8 w-8 flex justify-center items-center rounded-full ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "border border-gray-100 bg-white text-gray-900 hover:bg-orange-50"
          }`}
        >
          ←
        </button>
      </li>

      {/* Page numbers */}
      {getPageNumbers().map((pageNumber, index) => (
        <li key={index}>
          {pageNumber === '...' ? (
            <span className="h-8 w-8 flex justify-center items-center">...</span>
          ) : (
            <button
              onClick={() => onPageChange(Number(pageNumber))}
              className={`h-8 w-8 flex justify-center items-center rounded-full ${
                currentPage === pageNumber
                  ? "border-orange-400 bg-orange-400 text-white"
                  : "border border-gray-100 bg-white text-gray-900 hover:bg-orange-50"
              }`}
            >
              {pageNumber}
            </button>
          )}
        </li>
      ))}

      {/* Next button */}
      <li>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`h-8 w-8 flex justify-center items-center rounded-full ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "border border-gray-100 bg-white text-gray-900 hover:bg-orange-50"
          }`}
        >
          →
        </button>
      </li>
    </ol>
  );
};

export default Pagination;
