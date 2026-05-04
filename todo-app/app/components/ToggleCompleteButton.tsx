'use client'

import { useRouter } from 'next/navigation'

export default function ToggleCompleteButton({
  id,
  completed,
}: {
  id: number
  completed: boolean
}) {
  const router = useRouter()

  async function handleToggle() {
    await fetch(`/api/todos/${id}`, { method: 'PATCH' })
    router.refresh()
  }

  return (
    <button
      onClick={handleToggle}
      className={`w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 ${
        completed
          ? 'bg-green-500 border-green-500'
          : 'border-gray-300 hover:border-green-400'
      }`}
    />
  )
}
