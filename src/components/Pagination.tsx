type Props = {};
const Pagination = (props: Props) => {
  return (
    <ol className="flex justify-center gap-1 text-xs font-medium">
      <li>
        <a
          href="#"
          className="inline-flex size-8 items-center justify-center rounded text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </li>

      {[1, 2, 3, 4, 5].map((item, index) => (
        <li className="px-1">
          <a
            href="#"
            className={`size-8 rounded-full ${
              index + 1 === 2
                ? "bg-orange-500 text-white font-bold"
                : "bg-light-400 hover:bg-orange-500 hover:text-white transition ease-in-out text-gray-900"
            } flex justify-center items-center text-center leading-8 `}
          >
            {item}
          </a>
        </li>
      ))}

      <li>
        <a
          href="#"
          className="inline-flex size-8 items-center justify-center rounded text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </li>
    </ol>
  );
};
export default Pagination;
