'use client'

import { useRouter } from 'next/navigation'

export default function DeleteCategoryButton({ id }: { id: number }) {
  const router = useRouter()

  async function handleDelete() {
    await fetch(`/api/categories/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="text-gray-400 hover:text-red-500 text-sm ml-2"
    >
      ×
    </button>
  )
}
