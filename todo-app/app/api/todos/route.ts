import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const todos = await prisma.todo.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(todos)
}

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.title || body.title.trim() === '') {
    return NextResponse.json(
      { error: 'Title is required' },
      { status: 400 }
    )
  }

  if (!body.dueDate) {
    return NextResponse.json(
      { error: 'Due date is required' },
      { status: 400 }
    )
  }

  if (!body.categoryId) {
    return NextResponse.json(
      { error: 'Category is required' },
      { status: 400 }
    )
  }

  const todo = await prisma.todo.create({
    data: {
      title: body.title.trim(),
      description: body.description?.trim() ?? null,
      dueDate: new Date(body.dueDate),
      categoryId: body.categoryId,
    },
    include: { category: true },
  })

  return NextResponse.json(todo, { status: 201 })
}
