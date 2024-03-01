import React from 'react'

export default function SiteFilter({handleClick, setFilteredArticles, articles}) {
  return (
    <div className='flex justify-between'>
        <img 
            className='w-16 h-16 lg:w-32 lg:h-32 object-cover rounded-xl hover:cursor-pointer hover:opacity-80 duration-200'
            onClick={() => setFilteredArticles(articles)}
            src="/all.png" 
            alt="all" 
        />
        <img 
            className='w-16 h-16 lg:w-32 lg:h-32 object-cover rounded-xl hover:cursor-pointer hover:opacity-80 duration-200'
            onClick={handleClick}
            id='Rappler'
            src="/rappler.png" 
            alt="rappler" 
        />
        <img 
            className='w-16 h-16 lg:w-32 lg:h-32 object-cover rounded-xl hover:cursor-pointer hover:opacity-80 duration-200'
            onClick={handleClick}
            id='Inquirer'
            src="/inquirer.jpg" 
            alt="inquirer" 
        />
        <img 
            className='w-16 h-16 lg:w-32 lg:h-32 object-cover rounded-xl hover:cursor-pointer hover:opacity-80 duration-200'
            onClick={handleClick}
            id='Business World'
            src="/BW.png" 
            alt="BW" 
        />
        <img 
            className='w-16 h-16 lg:w-32 lg:h-32 object-cover rounded-xl hover:cursor-pointer hover:opacity-80 duration-200'
            onClick={handleClick}
            id='Manila Bulletin'
            src="/MB.jpeg" 
            alt="MB" 
        />
        <img 
            className='w-16 h-16 lg:w-32 lg:h-32 object-cover rounded-xl hover:cursor-pointer hover:opacity-80 duration-200'
            onClick={handleClick}
            id='Philstar'
            src="/philstar.jpg" 
            alt="philstar" 
        />
    </div>
  )
}
