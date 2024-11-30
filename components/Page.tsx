import React, { useState, useEffect } from 'react';

const Page = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    // Trigger the animation when the user scrolls a certain distance
    if (scrollPosition > 200 && !hasScrolled) {
      setHasScrolled(true);
      setIsShaking(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Image Section */}
      <div className="mt-20">
        <img
          src="https://via.placeholder.com/400" // Replace with your image URL
          alt="Shake Me!"
          className={`w-full max-w-md transition-transform ${
            isShaking ? 'animate-shake' : ''
          }`}
        />
      </div>

      {/* Page Data Section */}
      {hasScrolled && !isShaking && (
        <div className="mt-8 opacity-0 transform scale-95 transition-all duration-300 ease-in-out opacity-100 scale-100">
          <h1 className="text-3xl font-bold text-gray-800">Page Data</h1>
          <p className="mt-4 text-xl text-gray-600">
            This is the page data that appears after the animation!
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
