'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateCategoryForm() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Something went wrong')
      return
    }

    setName('')
    setIsOpen(false)
    router.refresh()
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="mb-6 text-sm text-blue-600 hover:text-blue-800"
      >
        + New Category
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white border border-gray-200 rounded p-4">
      <div className="flex gap-2">
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => { setIsOpen(false); setError(''); setName('') }}
          className="text-gray-400 hover:text-gray-600 px-2 text-sm"
        >
          Cancel
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  )
}
