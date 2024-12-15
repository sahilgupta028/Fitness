export default function FitnessTips() {
    const tips = [
      {
        id: 1,
        title: "5 Simple Exercises for Beginners",
        description:
          "Start your fitness journey with these easy-to-follow exercises that require no equipment.",
        image: "/tips/tip1.jpg", // Replace with your image path
        link: "https://www.self.com/gallery/5-basic-exercise-moves-everyone-needs-to-know",
      },
      {
        id: 2,
        title: "The Importance of Hydration",
        description:
          "Learn how staying hydrated can improve your workouts and overall health.",
        image: "/tips/tip2.jpg", // Replace with your image path
        link: "#https://www.watkinsfamilychiropractic.com/the-fountain-of-health-the-benefits-and-importance-of-staying-hydrated/",
      },
      {
        id: 3,
        title: "Top 10 Foods for Muscle Building",
        description:
          "Fuel your body with the right nutrition to build muscle effectively.",
        image: "/tips/tip3.jpg", // Replace with your image path
        link: "https://dajtihealthylifestyle.wordpress.com/2018/05/05/10-muscle-building-foods-every-man-should-have-in-his-pantry/",
      },
    ];
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center text-orange-500 mb-10">
            Fitness Tips & Blogs
          </h2>
          <p className="text-lg text-center text-gray-600 mb-12">
            Stay informed with the latest fitness tips, workout advice, and
            nutrition plans from experts.
          </p>
  
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tips.map((tip) => (
              <div
                key={tip.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{tip.description}</p>
                  <a
                    href={tip.link}
                    className="text-orange-500 font-semibold hover:underline"
                  >
                    Read More &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  