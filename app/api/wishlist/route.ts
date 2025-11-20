import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const wishlistItems = await prisma.wishlistItem.findMany({
      where: { userId: (session.user as any).id },
      include: {
        product: true,
      },
    });

    const items = wishlistItems.map((item) => ({
      id: item.productId,
      productId: item.productId,
      name: item.product.name,
      price: item.product.price,
      image: item.product.images[0] || '',
      quantity: 1,
    }));

    return NextResponse.json({
      success: true,
      data: { items },
    });
  } catch (error: any) {
    console.error('Wishlist fetch error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch wishlist' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId } = body;

    // Check if already in wishlist
    const existing = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: (session.user as any).id,
          productId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Already in wishlist',
      });
    }

    // Add to wishlist
    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        userId: (session.user as any).id,
        productId,
      },
      include: { product: true },
    });

    return NextResponse.json({
      success: true,
      data: wishlistItem,
    });
  } catch (error: any) {
    console.error('Wishlist add error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to add to wishlist' },
      { status: 500 }
    );
  }
}

