const LoadingComponent = () => {
  return (
    <div className="rounded-xl size-full flex flex-col items-center justify-center gap-2 p-5 bg-gray-100">
      <div className="animate-spin border-primary w-10 h-10 border-t-2 border-b-2 rounded-full"></div>
      <p className="text-sm text-gray-500">جاري التحميل</p>
    </div>
  );
};

export default LoadingComponent;
