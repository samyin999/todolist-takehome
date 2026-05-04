import { prisma } from '@/lib/prisma'
import CreateCategoryForm from '@/app/components/CreateCategoryForm'
import DeleteCategoryButton from '@/app/components/DeleteCategoryButton'
import EditCategoryName from '@/app/components/EditCategoryName'
import CreateTodoForm from '@/app/components/CreateTodoForm'
import DeleteTodoButton from '@/app/components/DeleteTodoButton'
import EditTodoForm from '@/app/components/EditTodoForm'
import ToggleCompleteButton from '@/app/components/ToggleCompleteButton'

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
        <h1 className="text-2xl font-bold text-gray-900">Jira 2 - The atlassian killer</h1>
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
              {category.todos.map((todo) => {
                const overdue = !todo.completedAt && new Date(todo.dueDate) < new Date()
                return (
                  <li
                    key={todo.id}
                    className={`bg-white rounded border px-4 py-3 ${overdue ? 'border-red-300' : 'border-gray-200'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <ToggleCompleteButton id={todo.id} completed={!!todo.completedAt} />
                        <div>
                          <p className={`font-medium ${todo.completedAt ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                            {todo.title}
                          </p>
                          {todo.description && (
                            <p className="text-sm text-gray-500 mt-1">{todo.description}</p>
                          )}
                          <p className={`text-xs mt-1 ${overdue ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                            Due: {new Date(todo.dueDate).toLocaleDateString()}
                            {overdue && <span className="ml-2 bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Overdue</span>}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 ml-4 shrink-0">
                        <EditTodoForm
                          todo={{ ...todo, dueDate: todo.dueDate.toISOString() }}
                          categories={categories}
                        />
                        <DeleteTodoButton id={todo.id} />
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </main>
    </div>
  )
}
