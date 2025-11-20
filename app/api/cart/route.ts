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

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: (session.user as any).id },
      include: {
        product: true,
      },
    });

    const items = cartItems.map((item) => ({
      id: item.productId,
      productId: item.productId,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.images[0] || '',
    }));

    return NextResponse.json({
      success: true,
      data: { items },
    });
  } catch (error: any) {
    console.error('Cart fetch error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch cart' },
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
    const { productId, quantity = 1 } = body;

    // Check if item already exists
    const existing = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: (session.user as any).id,
          productId,
        },
      },
    });

    if (existing) {
      // Update quantity
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
        include: { product: true },
      });

      return NextResponse.json({
        success: true,
        data: updated,
      });
    }

    // Create new cart item
    const cartItem = await prisma.cartItem.create({
      data: {
        userId: (session.user as any).id,
        productId,
        quantity,
      },
      include: { product: true },
    });

    return NextResponse.json({
      success: true,
      data: cartItem,
    });
  } catch (error: any) {
    console.error('Cart add error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to add to cart' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await prisma.cartItem.deleteMany({
      where: { userId: (session.user as any).id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Cart clear error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to clear cart' },
      { status: 500 }
    );
  }
}

