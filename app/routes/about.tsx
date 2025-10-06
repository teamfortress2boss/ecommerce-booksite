import type { Route } from "./+types/home";

function About() {
    return (
        <div className="flex flex-col justify-between h-full text-center md:text-left py-12">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold text-green-800" >
              About Us
            </h1>
            <p className="text-xl py=12 text-gray-600">
              We are a company that seeks to provide the best available prices for textbooks.
            </p>
          </div>
        </div>
    )
}

export default About();