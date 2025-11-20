import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const featured = searchParams.get('featured') === 'true';

    const where: any = {
      isActive: true,
    };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    if (featured) {
      where.isFeatured = true;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: featured ? { createdAt: 'desc' } : { name: 'asc' },
      }),
      prisma.product.count({ where }),
    ]);

    // Get user role for pricing
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role || 'CUSTOMER';

    // Apply role-based pricing
    const productsWithPricing = await Promise.all(
      products.map(async (product) => {
        const priceOverride = await prisma.priceOverride.findUnique({
          where: {
            productId_userRole: {
              productId: product.id,
              userRole: userRole as any,
            },
          },
        });

        return {
          ...product,
          price: priceOverride?.price || product.price,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: {
        products: productsWithPricing,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error: any) {
    console.error('Products fetch error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}



