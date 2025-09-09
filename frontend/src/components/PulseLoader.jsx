const PulseLoader = () => {
  return (
    <div className="flex items-center justify-center space-x-2 h-full">
      <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-150"></div>
      <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-300"></div>
    </div>
  );
};

export default PulseLoader;
