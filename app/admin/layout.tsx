'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Package,
  Grid3x3,
  Users,
  Wand2,
  Search,
  Bell,
  Settings,
  User,
  ChevronDown,
} from 'lucide-react';
import Image from 'next/image';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Auto-expand Products menu if on products pages
  const [expandedMenus, setExpandedMenus] = useState<string[]>(
    pathname?.startsWith('/admin/products') ? ['Products'] : []
  );

  const toggleMenu = (menu: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menu)
        ? prev.filter((m) => m !== menu)
        : [...prev, menu]
    );
  };

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      active: pathname === '/admin',
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: FileText,
      active: pathname?.startsWith('/admin/orders'),
    },
    {
      name: 'Products',
      href: '#',
      icon: Package,
      hasSubmenu: true,
      submenuItems: [
        { name: 'Add Product', href: '/admin/products/add' },
        { name: 'Drafts', href: '/admin/products/drafts' },
        { name: 'Product List', href: '/admin/products' },
      ],
      active: pathname?.startsWith('/admin/products'),
    },
    {
      name: 'Category',
      href: '#',
      icon: Grid3x3,
      hasSubmenu: true,
    },
    {
      name: 'Customers',
      href: '/admin/customers',
      icon: Users,
      active: pathname?.startsWith('/admin/customers'),
    },
    {
      name: 'Content Management',
      href: '#',
      icon: Wand2,
      hasSubmenu: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-screen">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 relative">
              <div className="w-16 h-16 rounded-full border-4 border-blue-600 flex items-center justify-center bg-white">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">STEC</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-2">
            STEC - STEADFAST TECHNICS LLC
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedMenus.includes(item.name);
              const isActive = item.active;

              return (
                <li key={item.name}>
                  {item.hasSubmenu ? (
                    <>
                      <button
                        onClick={() => toggleMenu(item.name)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isExpanded && item.submenuItems && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {item.submenuItems.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            return (
                              <li key={subItem.name}>
                                <Link
                                  href={subItem.href}
                                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                    isSubActive
                                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                                      : 'text-gray-700 hover:bg-gray-50'
                                  }`}
                                >
                                  <span className="text-sm font-medium">
                                    {subItem.name}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  5
                </span>
              </div>
              <Settings className="w-6 h-6 text-gray-600 cursor-pointer" />
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                <User className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

