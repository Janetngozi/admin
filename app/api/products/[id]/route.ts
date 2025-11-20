import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get user role for pricing
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role || 'CUSTOMER';

    // Apply role-based pricing
    const priceOverride = await prisma.priceOverride.findUnique({
      where: {
        productId_userRole: {
          productId: product.id,
          userRole: userRole as any,
        },
      },
    });

    const productWithPricing = {
      ...product,
      price: priceOverride?.price || product.price,
    };

    return NextResponse.json({
      success: true,
      data: productWithPricing,
    });
  } catch (error: any) {
    console.error('Product fetch error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

