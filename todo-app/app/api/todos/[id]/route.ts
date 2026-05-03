import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(id) },
    include: { category: true },
  })

  if (!todo) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
  }

  return NextResponse.json(todo)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  if (!body.title || body.title.trim() === '') {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 })
  }

  if (!body.dueDate) {
    return NextResponse.json({ error: 'Due date is required' }, { status: 400 })
  }

  if (!body.categoryId) {
    return NextResponse.json({ error: 'Category is required' }, { status: 400 })
  }

  try {
    const todo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title.trim(),
        description: body.description?.trim() ?? null,
        dueDate: new Date(body.dueDate),
        categoryId: body.categoryId,
      },
      include: { category: true },
    })
    return NextResponse.json(todo)
  } catch {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
  }
}

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const existing = await prisma.todo.findUnique({
    where: { id: parseInt(id) },
  })

  if (!existing) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
  }

  const todo = await prisma.todo.update({
    where: { id: parseInt(id) },
    data: {
      completedAt: existing.completedAt ? null : new Date(),
    },
    include: { category: true },
  })

  return NextResponse.json(todo)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    await prisma.todo.delete({ where: { id: parseInt(id) } })
    return new Response(null, { status: 204 })
  } catch {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
  }
}
