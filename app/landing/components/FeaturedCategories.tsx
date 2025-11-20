'use client';

export default function FeaturedCategories() {
  const categories = [
    {
      id: 1,
      name: 'IT Equipment',
      image: '/IT.png',
    },
    {
      id: 2,
      name: 'Software Licenses',
      image: '/software.png',
    },
    {
      id: 3,
      name: 'MRO Products',
      image: '/MRO.png',
    },
    {
      id: 4,
      name: 'Office Supplies',
      image: '/office.png',
    },
    {
      id: 5,
      name: 'Office Furniture',
      image: '/furniture.png',
    },
    {
      id: 6,
      name: 'Janitorial Supplies',
      image: '/supplies.png',
    },
  ];

  return (
    <section className="py-12 md:py-20" style={{ backgroundColor: '#017CC0' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Featured Categories
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative h-48 md:h-56 rounded-lg overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `url('${category.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >

              {/* Category Name - Positioned Lower */}
              <div className="absolute inset-0 flex items-end justify-center pb-8">
                <h3 className="text-xl md:text-2xl font-bold text-white text-center px-4">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
