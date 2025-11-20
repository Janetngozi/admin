'use client';

export default function HeroSection() {
  return (
    <section className="bg-white">
      <div className="bg-[#017CC0] text-white max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left - Image (Full Width at Edge) */}
          <div className="flex justify-center md:justify-start -mx-4 md:mx-0 md:py-12 md:pr-8">
            <img
              src="/image 20.png"
              alt="Keyboard"
              className="w-full md:max-w-lg h-auto object-contain"
            />
          </div>

          {/* Right - Content */}
          <div className="py-12 md:py-20 md:pl-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Upgrade Your Desk.<br />
              Power Your Workflow.
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Find accessories that keep your workspace moving as fast as you do.
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center gap-2">
              View all
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
