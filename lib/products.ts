export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  images?: string[];
  specs?: string[][];
  reviews?: { id: string; author: string; rating: number; text: string }[];
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'SHARPE Fine Point Markers - Black',
    price: 150,
    description: 'Make Your Mark That Lasts. The Sharpies Fine Point Permanent Markers Deliver Bold, Smooth Ink That Writes On Almost Any Surface - From Paper And Plastic To Metal And Glass. Designed For Precision And Durability, They\'re The Go-To Choice For Offices, Classrooms, And Creative Pros Who Need Writing That Won\'t Fade Or Smear.',
    image: '/Rectangle 10.png',
    rating: 4.5,
    reviewCount: 13,
    images: ['/Rectangle 10.png', '/Rectangle 11.png', '/Rectangle 12.png'],
    specs: [
      ['Brand', 'SHARPE'],
      ['Color', 'Black'],
      ['Pages', 'N/A'],
      ['Material', 'Plastic / Ink'],
    ],
    reviews: [
      { id: 'r1', author: 'Jane Doe', rating: 5, text: 'Great marker. Writes smoothly.' },
      { id: 'r2', author: 'John Smith', rating: 4, text: 'Good value for price.' },
    ],
  },
  {
    id: '2',
    name: 'SURADI NOTEBOOK Flexible Business 4 Supplies',
    price: 150,
    description: 'Professional notebook with flexible binding and quality paper.',
    image: '/Rectangle 11.png',
    images: ['/Rectangle 11.png', '/Rectangle 12.png', '/Rectangle 13.png'],
    specs: [
      ['Brand', 'SURADI'],
      ['Color', 'White'],
      ['Pages', '100'],
      ['Material', 'Paper'],
    ],
    reviews: [
      { id: 'r1', author: 'Alice Brown', rating: 5, text: 'Perfect for daily use.' },
    ],
  },
  {
    id: '3',
    name: '2Packs Blank Spiral Notebook, Soft Cover, 100 Pages, 100G5M',
    price: 150,
    description: 'Durable spiral notebooks with soft covers and premium paper quality.',
    image: '/Rectangle 12.png',
    images: ['/Rectangle 12.png', '/Rectangle 13.png', '/Rectangle 10.png'],
    specs: [
      ['Brand', 'Generic'],
      ['Color', 'Black'],
      ['Pages', '100'],
      ['Material', 'Paper / Plastic'],
    ],
    reviews: [
      { id: 'r1', author: 'Bob Wilson', rating: 4, text: 'Good quality notebooks.' },
    ],
  },
  {
    id: '4',
    name: 'SURADI Fine-Point Marker Block',
    price: 150,
    description: 'Professional-grade markers with fine points for detailed work.',
    image: '/Rectangle 13.png',
    images: ['/Rectangle 13.png', '/Rectangle 10.png', '/Rectangle 11.png'],
    specs: [
      ['Brand', 'SURADI'],
      ['Color', 'Assorted'],
      ['Pages', 'N/A'],
      ['Material', 'Plastic / Ink'],
    ],
    reviews: [
      { id: 'r1', author: 'Carol Davis', rating: 5, text: 'Excellent precision.' },
    ],
  },
  {
    id: '5',
    name: 'Fateboard Workbase - Floor Mat',
    price: 150,
    description: 'Premium workspace mat designed for comfort and durability.',
    image: '/Rectangle 10.png',
    images: ['/Rectangle 10.png', '/Rectangle 11.png', '/Rectangle 12.png'],
    specs: [
      ['Brand', 'Fateboard'],
      ['Color', 'Gray'],
      ['Size', 'Large'],
      ['Material', 'Rubber / Foam'],
    ],
    reviews: [
      { id: 'r1', author: 'David Lee', rating: 4, text: 'Very comfortable.' },
    ],
  },
  {
    id: '6',
    name: 'SHARPE Fine Point Markers - Pack of 12',
    price: 150,
    description: 'Complete set of professional markers in assorted colors.',
    image: '/Rectangle 11.png',
    images: ['/Rectangle 11.png', '/Rectangle 12.png', '/Rectangle 13.png'],
    specs: [
      ['Brand', 'SHARPE'],
      ['Color', 'Assorted'],
      ['Count', '12'],
      ['Material', 'Plastic / Ink'],
    ],
    reviews: [
      { id: 'r1', author: 'Eve White', rating: 5, text: 'Great value pack.' },
    ],
  },
  {
    id: '7',
    name: 'BLABLUI NOTEBOOKS Flexible Binding - 3 Subjects',
    price: 150,
    description: 'Multi-subject notebooks with flexible binding for versatile use.',
    image: '/Rectangle 12.png',
    images: ['/Rectangle 12.png', '/Rectangle 13.png', '/Rectangle 10.png'],
    specs: [
      ['Brand', 'BLABLUI'],
      ['Color', 'Blue'],
      ['Subjects', '3'],
      ['Pages', '150'],
    ],
    reviews: [
      { id: 'r1', author: 'Frank Miller', rating: 4, text: 'Good organization.' },
    ],
  },
  {
    id: '8',
    name: 'Oral Antibacterial Foaming Hand Wash, 1,200 mL',
    price: 150,
    description: 'Effective antibacterial foam soap for office hygiene.',
    image: '/Rectangle 13.png',
    images: ['/Rectangle 13.png', '/Rectangle 10.png', '/Rectangle 11.png'],
    specs: [
      ['Brand', 'Oral'],
      ['Type', 'Foam'],
      ['Size', '1.2L'],
      ['Formula', 'Antibacterial'],
    ],
    reviews: [
      { id: 'r1', author: 'Grace Turner', rating: 5, text: 'Works great.' },
    ],
  },
  {
    id: '9',
    name: 'Professional Folder Set',
    price: 150,
    description: 'Durable folder set perfect for organizing documents.',
    image: '/Rectangle 10.png',
    images: ['/Rectangle 10.png', '/Rectangle 11.png', '/Rectangle 12.png'],
    specs: [
      ['Brand', 'Generic'],
      ['Color', 'Mixed'],
      ['Pieces', '10'],
      ['Material', 'Cardboard'],
    ],
    reviews: [
      { id: 'r1', author: 'Henry Clark', rating: 4, text: 'Solid and affordable.' },
    ],
  },
  {
    id: '10',
    name: 'Executive Desk Organizer',
    price: 150,
    description: 'Premium desk organizer for a neat workspace.',
    image: '/Rectangle 11.png',
    images: ['/Rectangle 11.png', '/Rectangle 12.png', '/Rectangle 13.png'],
    specs: [
      ['Brand', 'Executive'],
      ['Material', 'Wood / Plastic'],
      ['Compartments', '5'],
      ['Color', 'Brown'],
    ],
    reviews: [
      { id: 'r1', author: 'Ivy Johnson', rating: 5, text: 'Looks professional.' },
    ],
  },
  {
    id: '11',
    name: 'Eco-Friendly Notepad',
    price: 150,
    description: 'Sustainable notepad made from recycled materials.',
    image: '/Rectangle 12.png',
    images: ['/Rectangle 12.png', '/Rectangle 13.png', '/Rectangle 10.png'],
    specs: [
      ['Brand', 'EcoGreen'],
      ['Material', 'Recycled Paper'],
      ['Pages', '80'],
      ['Size', 'A5'],
    ],
    reviews: [
      { id: 'r1', author: 'Jack Martin', rating: 5, text: 'Environmentally responsible.' },
    ],
  },
  {
    id: '12',
    name: 'Premium Pen Set',
    price: 150,
    description: 'Luxury pen set ideal for professionals.',
    image: '/Rectangle 13.png',
    images: ['/Rectangle 13.png', '/Rectangle 10.png', '/Rectangle 11.png'],
    specs: [
      ['Brand', 'Premium'],
      ['Type', 'Ballpoint / Gel'],
      ['Count', '5'],
      ['Material', 'Metal'],
    ],
    reviews: [
      { id: 'r1', author: 'Karen Scott', rating: 5, text: 'Excellent writing pens.' },
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  return PRODUCTS.filter((p) => p.id !== productId).slice(0, limit);
}
