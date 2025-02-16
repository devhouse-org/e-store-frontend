import { ArrowLeft, ArrowRight } from "lucide-react";

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
    <div className="mx-4">
      <div className="flex justify-center gap-x-2 md:gap-x-14">
        {tabs.map((tab, index) => (
          <div className="flex items-center">
            <div
              key={tab}
              // onClick={() => setActiveTab(tab)}
              className={`flex justify-center border border-transparent ${activeTab === tab || index < currentIndex
                ? "bg-white shadow-sm"
                : "border-light-600"
                } w-[110px] sm:w-[140px] md:w-[180px] px-2 py-8 rounded-md items-center flex-col`}
            >
              <p
                className={`my-2 ${activeTab === tab || index < currentIndex
                  ? "font-bold bg-orange-600 text-white shadow-md w-[30px] h-[30px] rounded-full flex justify-center items-center"
                  : "font-regular  text-gray-600"
                  }`}
              >
                {index + 1}
              </p>
              <p
                className={`sm:block text-nowrap text-[12px] sm:text-[14px] lg:text-[16px] px-4 ${activeTab === tab || index < currentIndex
                  ? "font-tajawal-bold text-orange-600"
                  : "font-tajawal-regular  text-gray-600"
                  }`}
              >
                {tab}
              </p>
            </div>
            {
              index < tabs.length - 1 && (
                <ArrowLeft className={`mr-2 md:mr-14 ${index < currentIndex ? "text-orange-600" : "text-black"}`} />
              )
            }
          </div>
        ))}
      </div>
      {/* Render Navigation Buttons */}
      <div className="mt-4 flex justify-between px-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`px-4 py-2 border rounded ${currentIndex === 0
            ? "text-gray-400 border-gray-300"
            : "text-blue-600 border-blue-600"
            }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === tabs.length - 1}
          className={`px-4 py-2 border rounded ${currentIndex === tabs.length - 1
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
