'use client';

export default function MoreThanPaperclips() {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          MORE THAN PAPERCLIPS & STAPLERS
        </h2>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 font-medium">
          FROM FURNITURE TO TECHNOLOGY TO JANITORIAL NEEDS, WE'VE GOT YOU COVERED.
        </p>

        {/* CTA Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 max-w-md w-full">
          Contact Us
        </button>
      </div>
    </section>
  );
}
