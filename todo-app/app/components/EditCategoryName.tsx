'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditCategoryName({ id, name }: { id: number; name: string }) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(name)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!value.trim()) return

    const res = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: value }),
    })

    if (res.ok) {
      setIsEditing(false)
      router.refresh()
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setValue(name)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="font-semibold text-gray-500 uppercase tracking-wide bg-transparent border-b border-gray-400 outline-none"
        />
      </form>
    )
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      className="cursor-pointer hover:text-gray-700"
    >
      {name}
    </span>
  )
}
