import Link from 'next/link'
import { ReactNode } from 'react'

export default function BlogLayout({ children, title, prev, next }: { children: ReactNode; title: string; prev?: string; next?: string }) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/blog" className="text-sm text-zinc-500 hover:text-blue-600 transition-colors">← All Guides</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-12">
        <article className="prose prose-zinc dark:prose-invert max-w-none">
          {children}
        </article>
        <div className="flex justify-between mt-12 pt-8 border-t border-zinc-200">
          {prev ? <Link href={prev} className="text-sm text-blue-600 hover:text-blue-700">← Previous</Link> : <div />}
          {next ? <Link href={next} className="text-sm text-blue-600 hover:text-blue-700">Next →</Link> : <div />}
        </div>
      </main>
    </div>
  )
}
