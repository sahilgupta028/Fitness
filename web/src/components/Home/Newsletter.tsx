export default function NewsletterSignup() {
    return (
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl font-bold text-orange-500 mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Stay updated with the latest fitness tips, exclusive deals, and
            workout plans delivered straight to your inbox.
          </p>
  
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full sm:w-2/3 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-3 rounded-md text-lg font-semibold transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
  
          <p className="text-gray-500 text-sm mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>
    );
  }
  