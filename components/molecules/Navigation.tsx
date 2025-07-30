import Link from 'next/link'
import { HomeIcon, LogInIcon,  RefreshCcw, History, BookOpen } from 'lucide-react'


// import UserEmail from './UserEmail'
import { Suspense } from 'react'
import NavLink from '@/components/atoms/NavLink'

export default function Navigation() {
  return (
    <aside data-testid="navigation" className="fixed inset-y-0 left-0 w-16 md:w-64 bg-gray-50 dark:bg-[#1A1A1A] border-r border-gray-200 dark:border-dark-border-subtle flex flex-col py-4 px-2 md:px-4">
      <div className="flex items-center justify-center md:justify-start mb-8 px-2">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          <span className="hidden md:inline">X-Lite</span>
          <span className="md:hidden">XL</span>
        </Link>
      </div>

      <nav className="flex-1 flex flex-col space-y-1">
        <NavLink
          href="/"
          icon={<HomeIcon size={20} />}
          label="Home"
        />
        <NavLink
          href="/convert"
          icon={<RefreshCcw size={20} />}
          label="Convert"
        />
        <NavLink
          href="/convert/transaction"
          icon={<History size={20} />}
          label="History"
        />
        <NavLink
          href="/learnmore"
          icon={<BookOpen size={20} />}
          label="Learn More"
        />
      </nav>

      <div className="pt-4 border-t border-gray-200 dark:border-dark-border-subtle">
        <Suspense
          fallback={
            <NavLink
              href="/signin"
              icon={<LogInIcon size={20} />}
              label="Sign In"
            />
          }
        >
         <h2>ECorp</h2>
        </Suspense>
      </div>
    </aside>
  )
}
