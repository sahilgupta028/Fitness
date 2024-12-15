"use client";

import { FaDumbbell, FaCalendarCheck, FaHeartbeat, FaHeadset, FaUsers, FaVideo, FaRunning, FaBullseye, FaHome, FaNewspaper, FaUserTie } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";

export default function FeatureSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          Why Choose Us?
        </h2>
        <p className="text-lg text-gray-600 mb-16">
          Our fitness platform is designed to give you personalized workouts,
          nutrition plans, and expert guidance for a healthier, fitter you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Feature 1: Personalized Workout Plans */}
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <FaDumbbell className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Custom Workouts</h3>
            <p className="text-gray-600 text-center">
              Get personalized workout routines tailored to your goals, whether
              {"it's"} weight loss, muscle gain, or endurance.
            </p>
          </div>

          {/* Feature 2: Meal Plans */}
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <GiMeal className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Nutrition Plans</h3>
            <p className="text-gray-600 text-center">
              Receive custom meal plans that complement your fitness goals and
              keep you energized throughout the day.
            </p>
          </div>

          {/* Feature 3: Progress Tracking */}
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <FaCalendarCheck className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Track Your Progress</h3>
            <p className="text-gray-600 text-center">
              Monitor your workouts, diet, and results with our easy-to-use progress
              tracker. Stay motivated and on track!
            </p>
          </div>

          {/* Feature 4: Expert Guidance */}
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <FaHeartbeat className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Expert Guidance</h3>
            <p className="text-gray-600 text-center">
              Our certified trainers and nutritionists provide expert advice to help
              you achieve your fitness goals faster.
            </p>
          </div>

          {/* Feature 5: 24/7 Support */}
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <FaHeadset className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">24/7 Support</h3>
            <p className="text-gray-600 text-center">
              Get help whenever you need it with our round-the-clock customer support.
            </p>
          </div>

          {/* Feature 6: Community Challenges */}
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <FaUsers className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Community Challenges</h3>
            <p className="text-gray-600 text-center">
              Participate in challenges with our community and stay motivated to reach your fitness goals.
            </p>
          </div>

          {/* Feature 7: Workout Video Library */}
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <FaVideo className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Video Library</h3>
            <p className="text-gray-600 text-center">
              Access hundreds of workout videos to help you stay fit at any level.
            </p>
          </div>

          {/* Feature 8: Live Sessions */}
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <FaRunning className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Live Sessions</h3>
            <p className="text-gray-600 text-center">
              Join live workout sessions with trainers and get personalized feedback in real-time.
            </p>
          </div>

          {/* Feature 9: Goal Setting */}
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <FaBullseye className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Goal Setting</h3>
            <p className="text-gray-600 text-center">
              Set clear fitness goals and track your progress toward achieving them.
            </p>
          </div>

          {/* Feature 10: Home & Gym Workouts */}
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <FaHome className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Home & Gym Workouts</h3>
            <p className="text-gray-600 text-center">
              Train at home or in the gym with flexible workout plans tailored to your location.
            </p>
          </div>

          {/* Feature 11: Fitness Tips */}
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <FaNewspaper className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Fitness Tips</h3>
            <p className="text-gray-600 text-center">
              Stay up-to-date with the latest fitness trends and tips from expert trainers.
            </p>
          </div>

          {/* Feature 12: Personalized Coaching */}
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <FaUserTie className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Personal Coaching</h3>
            <p className="text-gray-600 text-center">
              Get 1-on-1 coaching from our certified trainers to reach your fitness goals faster.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
