import type { Route } from "./+types/home";

export default function About() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl text-white">
          <h2 className="text-4xl font-bold text-center mb-6">About Us</h2>

          <p className="text-lg text-gray-300 mb-6 text-center">
            At the <span className="text-blue-400 font-semibold">Campus Bookstore</span>,
            we believe stories have the power to transform minds and connect
            hearts. Our mission is to make discovering great books effortless,
            engaging, and inclusive.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-300 mb-2">
                Our Vision
              </h3>
              <p className="text-gray-300">
                To build a digital library that empowers readers of all
                backgrounds to explore, learn, and grow through literature.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-300 mb-2">
                Our Team
              </h3>
              <p className="text-gray-300">
                We're a passionate group of developers, designers, and book
                lovers committed to creating a seamless and inspiring reading
                experience.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            Want to get in touch?{" "}
            <a href="/contact" className="text-blue-400 hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    );
}
