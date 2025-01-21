const Pagination = () => {
  return (
    <ol className="flex justify-center gap-1 text-xs font-medium">
      {[1, 2, 3, 4, 5].map((pageNumber) => (
        <li key={pageNumber}>
          <a
            href="#"
            className={`block h-8 rounded-full w-8 ${pageNumber === 1
              ? "border-orange-400 bg-orange-400 text-white flex items-center justify-center"
              : "border border-gray-100 bg-white text-center leading-8 text-gray-900"
              }`}
          >
            {pageNumber}
          </a>
        </li>
      ))}
    </ol>
  );
};

export default Pagination;
