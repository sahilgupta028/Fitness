export default function Community() {
    return (
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-orange-500 mb-6">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-700 mb-12">
            Connect with like-minded fitness enthusiasts, share your journey, and
            motivate each other to achieve your goals.
          </p>
  
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Discussion Forums
              </h3>
              <p className="text-gray-600 mb-4">
                Share tips, ask questions, and learn from others in our active
                community forums.
              </p>
            </div>
  
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Live Q&A Sessions
              </h3>
              <p className="text-gray-600 mb-4">
                Attend live sessions with experts and get answers to your fitness
                and nutrition queries.
              </p>
            </div>
  
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Fitness Groups
              </h3>
              <p className="text-gray-600 mb-4">
                Be part of smaller groups with shared goals to stay motivated.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  