import React from 'react'

export default function HomeHeadlinesCard({article}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg px-3
        transition-shadow overflow-hidden rounded-lg w-full flex items-center'>
        <img 
            className='w-36 h-36 rounded-lg object-cover hover:scale-105 transition-scale duration-300'
            src={article.image} 
            alt="Cover Image" 
        />
        <div className="py-4 px-4 gap-1">
            <p className='text-2xl font-bold line-clamp-2'>
                {article.title}
            </p>
            <p className="px-4 mb-2 font-semibold">
                Source: {article.source}
            </p>
        </div>
    </div>
  )
}
