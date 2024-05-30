'use client' // Error components must be Client Components
import NotFoundGoHome from '@/components/not-found-go-home/not-found-go-home'

import { useEffect } from 'react'

export default function Error ({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <NotFoundGoHome
        title='Not Found'
        body='Could not find requested resource'
      >
        {/* <button className='btnz btnz-secondary' onClick={() => reset()}>
          Try again
        </button> */}
      </NotFoundGoHome>
    </div>
  )
}
