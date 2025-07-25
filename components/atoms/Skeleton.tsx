export default function CurrencyConverterSkeleton() {
  return (
    <div className="pt-6 flex flex-col justify-center min-h-[calc(100vh-200px)] animate-pulse">
      {/* Status messages skeleton - Loading/Error/Offline */}
      <div className="mb-4">
        <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded" />
      </div>

      {/* From Currency Selector skeleton */}
      <div className="flex flex-col justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-xl mx-4 sm:mx-8 md:mx-16 lg:mx-20 p-4 sm:p-6 md:p-8 mb-6">
        <div className="w-full space-y-3">
          {/* Label */}
          <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded" />
          {/* Input field and dropdown */}
          <div className="flex gap-2">
            <div className="flex-1 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg" />
            <div className="w-24 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Swap Rate/Live Rate skeleton */}
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full" />
      </div>

      {/* To Currency Selector skeleton */}
      <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-xl mx-4 sm:mx-8 md:mx-16 lg:mx-20 p-4 sm:p-6 md:p-8 mb-6">
        <div className="w-full space-y-3">
          {/* Label */}
          <div className="h-4 w-8 bg-gray-300 dark:bg-gray-600 rounded" />
          {/* Dropdown */}
          <div className="w-24 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg" />
        </div>
      </div>

      {/* Centered content section */}
      <div className="flex flex-col items-center justify-center w-full">
        {/* Conversion Result skeleton */}
        <div className="font-mono p-2 bg-gray-300 dark:bg-gray-600 rounded-lg mx-2 my-2 text-center">
          <div className="h-6 w-80 bg-gray-400 dark:bg-gray-500 rounded" />
        </div>

        {/* Helper text skeleton */}
        <div className="mx-2 my-2 text-center">
          <div className="h-4 w-64 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>

        {/* History button skeleton */}
        <div className="my-4 px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded">
          <div className="h-4 w-40 bg-gray-400 dark:bg-gray-500 rounded" />
        </div>
      </div>

      {/* Footer/Convert button skeleton */}
      <div className="mt-6">
        <div className="h-12 w-full bg-gray-300 dark:bg-gray-600 rounded-lg" />
      </div>
    </div>
  )
}
