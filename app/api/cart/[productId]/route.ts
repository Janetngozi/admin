import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { quantity } = body;

    if (quantity <= 0) {
      // Remove item
      await prisma.cartItem.deleteMany({
        where: {
          userId: (session.user as any).id,
          productId: params.productId,
        },
      });

      return NextResponse.json({ success: true });
    }

    // Update quantity
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: (session.user as any).id,
          productId: params.productId,
        },
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        { success: false, error: 'Cart item not found' },
        { status: 404 }
      );
    }

    const updated = await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity },
      include: { product: true },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    console.error('Cart update error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update cart' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await prisma.cartItem.deleteMany({
      where: {
        userId: (session.user as any).id,
        productId: params.productId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Cart remove error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to remove from cart' },
      { status: 500 }
    );
  }
}

