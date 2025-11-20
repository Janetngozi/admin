'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Menu, ChevronDown, X, User } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const cartCount = getItemCount();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className="bg-gray-100 w-full top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Search Modal - Full Header Takeover */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-white">
            {/* Search Content */}
            <div className="w-full flex flex-col items-center justify-center pt-32 pb-16 px-4">
              {/* Close Button - Centered with Red Color */}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="mb-12 hover:opacity-80 transition-opacity"
              >
                <X className="w-10 h-10 text-red-600" />
              </button>
              
              <h2 className="text-4xl font-normal text-gray-900 mb-12">Search</h2>
              
              <div className="w-full max-w-2xl">
                <div className="flex items-center border-b-2 border-gray-300 pb-4">
                  <input
                    type="text"
                    placeholder="Search for products"
                    className="flex-1 outline-none text-lg text-gray-700 placeholder-gray-400"
                    autoFocus
                  />
                  <Search className="w-6 h-6 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <img src="/STEC-logo 1.png" alt="STEC Logo" className="h-13 w-auto" />
          </div>

          {/* Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium text-sm">
              Home
            </Link>
            
            {/* Products Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-gray-900 font-medium text-sm flex items-center gap-1 py-2">
                Products
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Mega Menu Dropdown - Full Width */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-screen max-w-6xl bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="flex">
                  {/* Left Section - Categories Grid */}
                  <div className="flex-1 px-12 py-10">
                    <div className="grid grid-cols-2 gap-x-16 gap-y-8">
                      {/* Office products */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base">Office products</h3>
                        <ul className="space-y-2.5">
                          <li>
                            <a href="#" className="text-blue-600 hover:text-blue-700 text-sm">
                              Binders & accessories
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Cash handling
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Envelopes & forms
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Filing supplies
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Labels & labeling systems
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Paper & pads
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Writing & correction
                            </a>
                          </li>
                        </ul>
                      </div>

                      {/* Technology */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base">Technology</h3>
                        <ul className="space-y-2.5">
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Computer accessories
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Drives & media
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Power & backup
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Printers, multifunction & printing supplies
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Shredders & accessories
                            </a>
                          </li>
                        </ul>
                      </div>

                      {/* Facility & breakroom */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base">Facility & breakroom</h3>
                        <ul className="space-y-2.5">
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Breakroom supplies
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Cleaning equipments
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Cleaning supplies
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Facility supplies
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Healthcare supplies
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Safety & security
                            </a>
                          </li>
                        </ul>
                      </div>

                      {/* Furniture */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base">Furniture</h3>
                        <ul className="space-y-2.5">
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Carts & stands
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Chairs, chair mats & accessories
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Filing, storage & accessories
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Furniture accessories
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Furniture collections, desks & tables
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                              Panel systems & accessories
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Image */}
                  <div className="w-96 bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center rounded-r-lg p-8">
                    <img
                      src="/frame212.png"
                      alt="Featured Product"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium text-sm">
              Monthly specials
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium text-sm">
              Blog
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium text-sm">
              About us
            </a>
          </nav>

          {/* Right Side - Search Icon, Cart, Hamburger */}
          <div className="flex items-center gap-4">
            {/* Search Icon - Desktop */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:block"
            >
              <Search className="w-6 h-6 text-gray-700 hover:text-gray-900" />
            </button>

            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-gray-900" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                {cartCount}
              </span>
            </Link>

            {/* Account Menu - Desktop */}
            {session?.user ? (
              <div 
                className="hidden lg:relative lg:flex"
                onMouseEnter={() => setIsAccountMenuOpen(true)}
                onMouseLeave={() => setIsAccountMenuOpen(false)}
              >
                <button className="p-2">
                  <User className="w-6 h-6 text-gray-700 hover:text-gray-900" />
                </button>

                {/* Account Menu Card - Merged version */}
                {isAccountMenuOpen && (
                  <div className="absolute right-0 mt-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4 space-y-1">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b pb-2 mb-2">
                        <p className="font-semibold">{session.user.name || session.user.email}</p>
                        <p className="text-xs text-gray-500">{(session.user as any).role || 'Customer'}</p>
                      </div>
                      <Link href="/account" className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded text-sm">
                        My Account
                      </Link>
                      <Link href="/wishlist" className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded text-sm">
                        My Wishlist
                      </Link>
                      <Link href="/order" className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded text-sm">
                        My Orders
                      </Link>
                      {(session.user as any).role === 'ADMIN' && (
                        <Link href="/admin" className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded text-sm">
                          Admin Dashboard
                        </Link>
                      )}
                      <hr className="my-2" />
                      <a href="#" className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded text-sm">
                        Language
                      </a>
                      <a href="#" className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded text-sm">
                        Currency
                      </a>
                      <hr className="my-2" />
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left block px-4 py-2 text-red-600 hover:text-red-700 hover:bg-gray-50 rounded text-sm"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/signin/personal"
                className="hidden lg:flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <User className="w-5 h-5" />
                Sign In
              </Link>
            )}

            {/* Hamburger Menu Button - Mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2 pb-4 border-t pt-4">
            <Link href="/" className="block text-gray-700 hover:text-gray-900 font-medium text-sm py-2">
              Home
            </Link>
            <button
              onClick={() => setIsProductsOpen(!isProductsOpen)}
              className="w-full text-left text-gray-700 hover:text-gray-900 font-medium text-sm py-2 flex items-center justify-between"
            >
              Products
              <ChevronDown className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isProductsOpen && (
              <div className="pl-4 space-y-2 bg-gray-50 rounded py-2 px-2">
                <a href="#" className="block text-blue-600 text-sm py-1">
                  Binders & accessories
                </a>
                <a href="#" className="block text-gray-700 text-sm py-1">
                  Cash handling
                </a>
                <a href="#" className="block text-gray-700 text-sm py-1">
                  Envelopes & forms
                </a>
                <a href="#" className="block text-gray-700 text-sm py-1">
                  Filing supplies
                </a>
              </div>
            )}
            <a href="#" className="block text-gray-700 hover:text-gray-900 font-medium text-sm py-2">
              Monthly specials
            </a>
            <a href="#" className="block text-gray-700 hover:text-gray-900 font-medium text-sm py-2">
              Blog
            </a>
            <a href="#" className="block text-gray-700 hover:text-gray-900 font-medium text-sm py-2">
              About us
            </a>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="block w-full text-left text-blue-600 hover:text-blue-700 font-medium text-sm py-2"
            >
              Search
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
