import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-green-100 p-8 rounded-2xl shadow-lg max-w-md text-center animate-fadeIn">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <Link
          to="/"
          className="inline-block bg-primary hover:bg-primary/90 text-white text-sm font-medium py-2 px-6 rounded-full transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
