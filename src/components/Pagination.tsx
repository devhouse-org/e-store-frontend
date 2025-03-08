import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max pages to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the start
      if (currentPage <= 3) {
        endPage = 4;
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      // Add ellipsis if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }

      // Always include last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`h-8 w-8 flex justify-center items-center rounded-full border ${currentPage === 1
          ? 'border-gray-200 text-gray-300 cursor-not-allowed'
          : 'border-gray-100 bg-white text-gray-900 hover:bg-gray-50'
          }`}
      >
        <ChevronRight />
      </button>

      {/* Page numbers */}
      <ol className="flex justify-center gap-1 text-xs font-medium">
        {getPageNumbers().map((pageNumber, index) => (
          <li key={index}>
            {pageNumber === '...' ? (
              <span className="h-8 w-8 flex justify-center items-center">...</span>
            ) : (
              <button
                onClick={() => typeof pageNumber === 'number' && onPageChange(pageNumber)}
                className={`h-8 w-8 flex justify-center items-center rounded-full ${pageNumber === currentPage
                  ? "border-orange-400 bg-orange-400 text-white"
                  : "border border-gray-100 bg-white text-center leading-8 text-gray-900 hover:bg-gray-50"
                  }`}
              >
                {pageNumber}
              </button>
            )}
          </li>
        ))}
      </ol>

      {/* Next button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`h-8 w-8 flex justify-center items-center rounded-full border ${currentPage === totalPages
          ? 'border-gray-200 text-gray-300 cursor-not-allowed'
          : 'border-gray-100 bg-white text-gray-900 hover:bg-gray-50'
          }`}
      >
        <ChevronLeft />
      </button>
    </div>
  );
};

export default Pagination;
