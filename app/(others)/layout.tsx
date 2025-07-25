import { Suspense } from 'react'
import Navigation from '@/components/molecules/Navigation'
import DashboardSkeleton from '@/components/atoms/Skeleton'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pl-16 md:pl-64 bg-gray-200 min-h-screen w-full " style={{ height: '100vh', paddingTop: 'calc(50vh - 500px)' }}>
        <div className="max-w-6xl mx-auto p-4 md:p-8 w-full">
          <Suspense fallback={<DashboardSkeleton />}>{children}</Suspense>
        </div>
      </main>
    </div>
  )
}