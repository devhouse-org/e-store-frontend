type Props = {
  activeTab: string;
  setActiveTab: (arg: string) => void; // Change event handler
  tabs: string[];
};

const Stepper = ({ activeTab, setActiveTab, tabs }: Props) => {
  const currentIndex = tabs.indexOf(activeTab);

  const handleNext = () => {
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center gap-x-14">
        {tabs.map((tab, index) => (
          <div
            key={tab}
            // onClick={() => setActiveTab(tab)}
            className={`flex justify-center border border-transparent ${
              activeTab === tab || index < currentIndex
                ? "bg-white shadow-sm"
                : ""
            } w-[200px] py-2 rounded-full items-center flex-col`}
          >
            <p
              className={`${
                activeTab === tab || index < currentIndex
                  ? "font-tajawal-bold text-orange-600"
                  : "font-tajawal-regular  text-gray-600"
              }`}
            >
              {index + 1}
            </p>
            <p
              className={`${
                activeTab === tab || index < currentIndex
                  ? "font-tajawal-bold text-orange-600"
                  : "font-tajawal-regular  text-gray-600"
              }`}
            >
              {tab}
            </p>
          </div>
        ))}
      </div>
      {/* Render Navigation Buttons */}
      <div className="mt-4 flex justify-between px-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`px-4 py-2 border rounded ${
            currentIndex === 0
              ? "text-gray-400 border-gray-300"
              : "text-blue-600 border-blue-600"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === tabs.length - 1}
          className={`px-4 py-2 border rounded ${
            currentIndex === tabs.length - 1
              ? "text-gray-400 border-gray-300"
              : "text-blue-600 border-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;
