import Link from 'next/link'
import Image from 'next/image'
import  Timestamp  from '@/components/atoms/Timestamp'
import Button from '@/components/atoms/Button'
import HeroImage from '@/public/lp.webp'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-300 text-gray-800 dark:text-gray-200">
        
      <main className="flex-1">
        
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch min-h-[800px]'>
              <section className='flex items-center justify-center'>
                <div className="text-center">
                  <h1 className="text-2xl sm:text-4xl md:text-4xl font-extrabold text-gray-900 dark:text-teal-800 tracking-tight">
                    Currency conversion <br className="hidden sm:block" />
                    <span className="text-cyan-600 dark:text-cyan-700">
                      simplified
                    </span>
                  </h1>
                  <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-teal-600 dark:text-lime-900">
                    A minimal and elegant currency conversion tool for modern time. Track rates. Make smarter decisions.
                  </p>
                  <div className="mt-10">
                    <Link href="/convert">
                      <Button size="lg" variant='primary'>Get Started</Button>
                    </Link>
                  </div>
                </div>
              </section>

              <section className='flex items-center justify-center'>
                <Image 
                  src={HeroImage} 
                  alt="Hero Image" 
                  width={1200} 
                  height={600} 
                  className='rounded-lg shadow-lg w-full h-auto'
                />
              </section>

            </div>
          </div>


      </main>

      <footer className="border-t border-gray-200 dark:border-dark-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              © <Timestamp /> Converxio. Built by EmeraldCorp.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}