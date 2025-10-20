import type { Route } from "./+types/home";

export default function Account() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl text-white">
        <h2 className="text-4xl font-bold text-center mb-6">
          Account Overview
        </h2>

        <div className="space-y-6">
          {/* Profile Info */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-300 mb-2">
              Profile Information
            </h3>
            <p>
              <span className="text-gray-400">Name:</span> John Doe
            </p>
            <p>
              <span className="text-gray-400">Email:</span> johndoe@example.com
            </p>
            <p>
              <span className="text-gray-400">Member Since:</span> January 2024
            </p>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-300 mb-2">
              Recent Activity
            </h3>
            <ul className="list-disc list-inside text-gray-300">
              <li>Purchased “Atomic Habits” on Oct 12, 2025</li>
              <li>Requested price match for “Clean Code”</li>
              <li>Updated shipping address</li>
            </ul>
          </div>

          {/* Account Actions */}
          <div className="flex justify-between mt-6">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              Edit Profile
            </button>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
