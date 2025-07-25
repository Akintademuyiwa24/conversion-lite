import Link from 'next/link'
import Button from '@/components/atoms/Button'

type ChildrenProps= {
  children: React.ReactNode
}

export default async function HomeLayout({children}: ChildrenProps) {
  return (
    <div className="flex min-h-screen flex-col">

      <header className="border-b border-gray-200 dark:border-dark-border-subtle bg-white dark:bg-dark-base">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold">
              X-Lite
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/convert"
                className="text-sm font-medium hover:text-purple-600"
              >
                Convert
              </Link>
              <Link
                href="/learnmore"
                className="text-sm font-medium hover:text-purple-600"
              >
                FAQ
              </Link>
              
              
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline">Sign in</Button>
              </Link>
              <Link href="/">
                <Button>Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      
    </div>
  )
}