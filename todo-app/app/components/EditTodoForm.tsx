'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

type Category = { id: number; name: string }

type Todo = {
  id: number
  title: string
  description: string | null
  dueDate: string
  categoryId: number
}

export default function EditTodoForm({
  todo,
  categories,
}: {
  todo: Todo
  categories: Category[]
}) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description ?? '')
  const [dueDate, setDueDate] = useState(todo.dueDate.slice(0, 10))
  const [categoryId, setCategoryId] = useState(String(todo.categoryId))
  const [error, setError] = useState('')

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const res = await fetch(`/api/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, dueDate, categoryId: parseInt(categoryId) }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Something went wrong')
      return
    }

    setIsEditing(false)
    router.refresh()
  }

  function handleCancel() {
    setTitle(todo.title)
    setDescription(todo.description ?? '')
    setDueDate(todo.dueDate.slice(0, 10))
    setCategoryId(String(todo.categoryId))
    setError('')
    setIsEditing(false)
  }

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="text-gray-400 hover:text-blue-500 text-sm"
      >
        Edit
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
      <input
        autoFocus
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-900 placeholder-gray-500"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-900 placeholder-gray-500"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-900 placeholder-gray-500"
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-900 placeholder-gray-500"
      >
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
