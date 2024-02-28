import React from 'react'

export default function SiteFilter({handleClick, setFilteredArticles, articles}) {
  return (
    <div className='flex justify-between'>
        <img 
            className='w-16 h-16 md:w-32 md:h-32 object-cover rounded-xl hover:cursor-pointer'
            onClick={() => setFilteredArticles(articles)}
            src="/all.png" 
            alt="all" 
        />
        <img 
            className='w-16 h-16 md:w-32 md:h-32 object-cover rounded-xl hover:cursor-pointer'
            onClick={handleClick}
            id='Rappler'
            src="/rappler.png" 
            alt="rappler" 
        />
        <img 
            className='w-16 h-16 md:w-32 md:h-32 object-cover rounded-xl hover:cursor-pointer'
            onClick={handleClick}
            id='Inquirer'
            src="/inquirer.jpg" 
            alt="inquirer" 
        />
        <img 
            className='w-16 h-16 md:w-32 md:h-32 object-cover rounded-xl hover:cursor-pointer'
            onClick={handleClick}
            id='Business World'
            src="/BW.png" 
            alt="BW" 
        />
        <img 
            className='w-16 h-16 md:w-32 md:h-32 object-cover rounded-xl hover:cursor-pointer'
            onClick={handleClick}
            id='Manila Bulletin'
            src="/MB.jpeg" 
            alt="MB" 
        />
        <img 
            className='w-16 h-16 md:w-32 md:h-32 object-cover rounded-xl hover:cursor-pointer'
            onClick={handleClick}
            id='Philstar'
            src="/philstar.jpg" 
            alt="philstar" 
        />
    </div>
  )
}
