"use client";

import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-500 to-blue-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4">About Us</h1>
          <p className="text-xl leading-relaxed max-w-2xl mx-auto">
            Welcome to [Fitness Brand Name] — a place where passion for health and fitness meets cutting-edge techniques, state-of-the-art facilities, and a strong sense of community.
          </p>
        </div>
      </section>

      {/* About the Brand */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-green-600 mb-10">Who We Are</h2>
        <div className="max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed">
          <p>
            At [Fitness Brand Name], we believe that fitness is not just about physical appearance — it’s about building strength, enhancing mental resilience, and embracing a holistic lifestyle that promotes well-being. 
          </p>
          <p className="mt-6">
            Since our inception, our goal has been to make fitness accessible and enjoyable for everyone. Whether you are a beginner or a seasoned athlete, our team of professionals and our welcoming environment will help you achieve your unique fitness goals.
          </p>
        </div>
      </section>

      {/* Mission, Vision, and Journey */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Mission */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-600 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To inspire people to lead healthier, happier lives through personalized fitness programs, cutting-edge technology, and unwavering support.
              </p>
            </div>
            {/* Vision */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-600 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                A world where fitness is a way of life — empowering individuals to discover their best selves while fostering a community of inclusivity and growth.
              </p>
            </div>
            {/* Our Journey */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-600 mb-4">Our Journey</h3>
              <p className="text-gray-700 leading-relaxed">
                From a small studio to a thriving fitness hub, our journey has been powered by the trust and support of our community. We’ve grown alongside our clients, constantly innovating and improving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-green-600 mb-10">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Value 1 */}
            <div className="text-center">
              <div className="text-green-600 text-5xl mb-4">💪</div>
              <h3 className="text-2xl font-bold mb-2">Passion for Fitness</h3>
              <p className="text-gray-700">
                We are driven by our passion to promote health and wellness in every individual.
              </p>
            </div>
            {/* Value 2 */}
            <div className="text-center">
              <div className="text-green-600 text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold mb-2">Community Focus</h3>
              <p className="text-gray-700">
                Together, we achieve more. Our community is the heart of everything we do.
              </p>
            </div>
            {/* Value 3 */}
            <div className="text-center">
              <div className="text-green-600 text-5xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold mb-2">Integrity & Excellence</h3>
              <p className="text-gray-700">
                From personalized plans to quality equipment, we ensure the best experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-green-600 mb-10">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="text-green-600 text-6xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-2">State-of-the-Art Facilities</h3>
              <p className="text-gray-700">
                Enjoy access to the latest equipment and training methods.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="text-center">
              <div className="text-green-600 text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-2">Customized Programs</h3>
              <p className="text-gray-700">
                Tailored fitness plans that fit your lifestyle and goals.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="text-center">
              <div className="text-green-600 text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-2">Expert Trainers</h3>
              <p className="text-gray-700">
                Learn from certified professionals with years of experience.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="text-center">
              <div className="text-green-600 text-6xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold mb-2">Inclusive Environment</h3>
              <p className="text-gray-700">
                Join a welcoming space where everyone feels empowered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Trainers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-green-600 mb-10">Meet the Trainers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Trainer 1 */}
            <div className="text-center">
              <img
                src="/trainers/trainer1.jpg"
                alt="Trainer 1"
                className="w-36 h-36 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold">Alex Johnson</h3>
              <p className="text-gray-600">Strength & Conditioning Expert</p>
            </div>
            {/* Trainer 2 */}
            <div className="text-center">
              <img
                src="/trainers/trainer2.jpg"
                alt="Trainer 2"
                className="w-36 h-36 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold">Sarah Lopez</h3>
              <p className="text-gray-600">Yoga & Flexibility Coach</p>
            </div>
            {/* Trainer 3 */}
            <div className="text-center">
              <img
                src="/trainers/trainer3.jpg"
                alt="Trainer 3"
                className="w-36 h-36 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold">Mark Davis</h3>
              <p className="text-gray-600">HIIT & Cardio Specialist</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
