import { prisma } from '@/lib/prisma'

function csvEscape(value: string | null | undefined): string {
  if (value == null) return ''
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export async function GET() {
  const todos = await prisma.todo.findMany({
    include: { category: true },
    orderBy: { createdAt: 'asc' },
  })

  const header = ['title', 'description', 'category', 'due_date', 'completed_at', 'status'].join(',')

  const rows = todos.map((todo) => {
    const isOverdue = !todo.completedAt && new Date(todo.dueDate) < new Date()
    const status = todo.completedAt ? 'completed' : isOverdue ? 'overdue' : 'pending'

    return [
      csvEscape(todo.title),
      csvEscape(todo.description),
      csvEscape(todo.category.name),
      csvEscape(todo.dueDate.toISOString().slice(0, 10)),
      csvEscape(todo.completedAt?.toISOString().slice(0, 10)),
      csvEscape(status),
    ].join(',')
  })

  const csv = [header, ...rows].join('\n')

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="todos.csv"',
    },
  })
}
