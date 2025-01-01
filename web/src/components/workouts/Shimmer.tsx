export const ShimmerEffect = () => (
    <div className="p-6 bg-white min-h-screen">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Exercise Library</h1>
        <p className="text-lg text-gray-600">Explore, Filter, and Learn Your Workouts</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg animate-pulse overflow-hidden"
            >
              <div className="w-full h-40 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-10 bg-blue-300 rounded mt-4"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );