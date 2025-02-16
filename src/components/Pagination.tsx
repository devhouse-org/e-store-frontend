const Pagination = () => {
  return (
    <ol className="flex justify-center gap-1 text-xs font-medium">
      {[1, 2, 3, 4, 5].map((pageNumber) => (
        <li key={pageNumber}>
          <a
            href="#"
            className={` h-8 w-8 flex justify-center items-center rounded-full ${pageNumber === 1
              ? "border-orange-400 bg-orange-400 text-white"
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
