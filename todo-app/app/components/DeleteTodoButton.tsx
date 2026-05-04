'use client'

import { useRouter } from 'next/navigation'

export default function DeleteTodoButton({ id }: { id: number }) {
  const router = useRouter()

  async function handleDelete() {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="text-gray-400 hover:text-red-500 text-sm"
    >
      Delete
    </button>
  )
}
