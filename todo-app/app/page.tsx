import { prisma } from '@/lib/prisma'
import CreateCategoryForm from '@/app/components/CreateCategoryForm'

export default async function Home() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'asc' },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Todo App</h1>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <CreateCategoryForm />

        {categories.length === 0 && (
          <p className="text-sm text-gray-400">No categories yet.</p>
        )}

        {categories.map((category) => (
          <section key={category.id} className="mb-6">
            <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-3">
              {category.name}
            </h2>
            <p className="text-sm text-gray-400">No todos yet.</p>
          </section>
        ))}
      </main>
    </div>
  )
}
