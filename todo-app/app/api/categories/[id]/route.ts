import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const categoryId = parseInt(id)
  const body = await request.json()

  if (!body.name || body.name.trim() === '') {
    return NextResponse.json(
      { error: 'Name is required' },
      { status: 400 }
    )
  }

  try {
    const category = await prisma.category.update({
      where: { id: categoryId },
      data: { name: body.name.trim() },
    })
    return NextResponse.json(category)
  } catch {
    return NextResponse.json(
      { error: 'Category not found' },
      { status: 404 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const categoryId = parseInt(id)

  try {
    await prisma.category.delete({ where: { id: categoryId } })
    return new Response(null, { status: 204 })
  } catch {
    return NextResponse.json(
      { error: 'Category not found or has todos assigned to it' },
      { status: 404 }
    )
  }
}
