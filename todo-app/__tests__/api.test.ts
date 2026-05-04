import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/prisma', () => ({
  prisma: {
    category: { create: vi.fn(), findMany: vi.fn() },
    todo: { create: vi.fn(), findMany: vi.fn() },
  },
}))

import { POST as createCategory } from '@/app/api/categories/route'
import { POST as createTodo } from '@/app/api/todos/route'

function makeRequest(body: object) {
  return new Request('http://localhost', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/categories', () => {
  it('returns 400 when name is missing', async () => {
    const res = await createCategory(makeRequest({}))
    expect(res.status).toBe(400)
  })

  it('returns 400 when name is blank', async () => {
    const res = await createCategory(makeRequest({ name: '   ' }))
    expect(res.status).toBe(400)
  })
})

describe('POST /api/todos', () => {
  it('returns 400 when title is missing', async () => {
    const res = await createTodo(makeRequest({ dueDate: '2026-05-10', categoryId: 1 }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when dueDate is missing', async () => {
    const res = await createTodo(makeRequest({ title: 'My todo', categoryId: 1 }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when category is missing', async () => {
    const res = await createTodo(makeRequest({ title: 'My todo', dueDate: '2026-05-10' }))
    expect(res.status).toBe(400)
  })
})
