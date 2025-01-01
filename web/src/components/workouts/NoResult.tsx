import Image from 'next/image'
import React from 'react'

const NoResult = () => {
  return (
    <div className="text-center mt-10 text-gray-600">
    <Image
       src="/no-result.jpg"
        alt="No results found"
        className="mx-auto w-auto h-80 mb-4"
        height={400}
        width={400}
    />
    No exercises found. Try adjusting your filters.
   </div>
  )
}

export default NoResult