import { prisma } from '@/lib/prisma'
import CreateCategoryForm from '@/app/components/CreateCategoryForm'
import DeleteCategoryButton from '@/app/components/DeleteCategoryButton'
import EditCategoryName from '@/app/components/EditCategoryName'
import CreateTodoForm from '@/app/components/CreateTodoForm'

export default async function Home() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'asc' },
    include: {
      todos: { orderBy: { createdAt: 'asc' } },
    },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Todo App</h1>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <CreateCategoryForm />
        <div className="mb-4" />
        <CreateTodoForm categories={categories} />

        {categories.length === 0 && (
          <p className="text-sm text-gray-400">No categories yet.</p>
        )}

        {categories.map((category) => (
          <section key={category.id} className="mb-6">
            <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center">
              <EditCategoryName id={category.id} name={category.name} />
              <DeleteCategoryButton id={category.id} />
            </h2>
            {category.todos.length === 0 && (
              <p className="text-sm text-gray-400">No todos yet.</p>
            )}
            <ul className="space-y-2">
              {category.todos.map((todo) => (
                <li
                  key={todo.id}
                  className="bg-white rounded border border-gray-200 px-4 py-3"
                >
                  <p className="font-medium text-gray-800">{todo.title}</p>
                  {todo.description && (
                    <p className="text-sm text-gray-500 mt-1">{todo.description}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  )
}
