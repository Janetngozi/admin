'use client';

export default function PromoSection() {
  return (
    <section className="relative py-12 md:py-24 bg-cover bg-center" style={{ backgroundImage: "url('/Rectangle 30.png')" }}>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 flex flex-col items-center justify-center min-h-96 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Get Outstanding Value For Your Money
        </h1>
        <p className="text-lg text-gray-100 mb-8 max-w-2xl">
          You Get Personalized service, first-rate products and great savings.
          <br />
          Find out more by checking out our current promotions.
        </p>
        <button className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center gap-2 max-w-md w-full justify-center">
          Check Out Our Monthly Specials
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
