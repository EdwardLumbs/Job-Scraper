import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log('clicked')
    console.log(e.target.id)
  
    navigate(`/${e.target.id}`);
    window.location.reload();
  };

  return (
    <header className='bg-black py-5'>
      <nav 
        className='text-white px-5 mx-auto w-full 
          container flex justify-between items-center'
      >
        <Link to='/'>
          <div className="text-xl">
            NewsBlews
          </div>
        </Link>

        <div
          className='transition-opacity duration-100 hover:opacity-70 hover:cursor-pointer'
          id='top'
          onClick={handleClick}
        >
          TOP
        </div>
        <div
          className='transition-opacity duration-100 hover:opacity-70 hover:cursor-pointer'
          id='world'
          onClick={handleClick}
        >
          WORLD
        </div>
        <div
          className='transition-opacity duration-100 hover:opacity-70 hover:cursor-pointer'
          id='business'
          onClick={handleClick}
        >
          BUSINESS
        </div>
        <div
          className='transition-opacity duration-100 hover:opacity-70 hover:cursor-pointer'
          id='entertainment'
          onClick={handleClick}
        >
          ENTERTAINMENT
        </div>
        <div
          className='transition-opacity duration-100 hover:opacity-70 hover:cursor-pointer'
          id='technology'
          onClick={handleClick}
        >
          TECHNOLOGY
        </div>
        <div
          className='transition-opacity duration-100 hover:opacity-70 hover:cursor-pointer'
          id='sports'
          onClick={handleClick}
        >
          SPORTS
        </div>
        <div
          className='transition-opacity duration-100 hover:opacity-70 hover:cursor-pointer'
          id='lifestyle'
          onClick={handleClick}
        >
          LIFESTYLE
        </div>
        <div
          className='transition-opacity duration-100 hover:opacity-70 hover:cursor-pointer'
          id='opinion'
          onClick={handleClick}
        >
          OPINION
        </div>
        
      </nav>
    </header>
  )
}
