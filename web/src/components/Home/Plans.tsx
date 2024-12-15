"use client";

export default function PricingSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-orange-500 mb-8">Choose Your Plan</h2>
        <p className="text-lg text-gray-700 mb-12">Start your fitness journey with the right plan. We offer a variety of plans to meet your fitness goals and needs.</p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Plan 1 */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Basic Plan</h3>
            <p className="text-lg text-gray-600 mb-6">Perfect for beginners who want to get started with fitness.</p>
            <div className="text-3xl font-bold text-orange-500 mb-6">$19.99</div>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>Access to basic workout plans</li>
              <li>Track your progress</li>
              <li>Community support</li>
            </ul>
            <button className="bg-orange-500 hover:bg-orange-400 text-white py-3 px-8 rounded-md text-lg transition-all duration-300">
              Get Started
            </button>
          </div>

          {/* Plan 2 */}
          <div className="bg-orange-500 p-8 rounded-lg shadow-lg text-white hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4">Pro Plan</h3>
            <p className="text-lg mb-6">For those looking for more personalized plans and expert advice.</p>
            <div className="text-3xl font-bold mb-6">$39.99</div>
            <ul className="list-disc list-inside mb-6">
              <li>Everything in Basic Plan</li>
              <li>Access to premium workout plans</li>
              <li>1-on-1 coaching sessions</li>
              <li>Personalized meal plans</li>
            </ul>
            <button className="bg-white hover:bg-gray-200 text-orange-500 py-3 px-8 rounded-md text-lg transition-all duration-300">
              Get Started
            </button>
          </div>

          {/* Plan 3 */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Elite Plan</h3>
            <p className="text-lg text-gray-600 mb-6">The ultimate fitness experience for those who want it all.</p>
            <div className="text-3xl font-bold text-orange-500 mb-6">$69.99</div>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>Everything in Pro Plan</li>
              <li>Custom workout and meal plans</li>
              <li>Unlimited coaching sessions</li>
              <li>Exclusive fitness challenges</li>
            </ul>
            <button className="bg-orange-500 hover:bg-orange-400 text-white py-3 px-8 rounded-md text-lg transition-all duration-300">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
