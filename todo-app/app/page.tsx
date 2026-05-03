export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Todo App</h1>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <section className="mb-6">
          <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Cat 1
          </h2>
          <ul className="space-y-2">
            <li className="bg-white rounded border border-gray-200 px-4 py-3 text-gray-800">
              Todo item
            </li>
            <li className="bg-white rounded border border-gray-200 px-4 py-3 text-gray-800">
              Todo item
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Cat 2
          </h2>
          <ul className="space-y-2">
            <li className="bg-white rounded border border-gray-200 px-4 py-3 text-gray-800">
              Todo item
            </li>
          </ul>
        </section>
      </main>
    </div>
  )
}
