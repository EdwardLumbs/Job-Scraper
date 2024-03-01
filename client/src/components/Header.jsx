import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdMenu, MdOutlineClose } from "react-icons/md";

export default function Header() {
  const navigate = useNavigate();
  const [toggled, setToggled] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setToggled(!toggled);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setToggled(false);
        }
    };

      window.addEventListener("mousedown", handleClickOutside);
    return () => {
        window.removeEventListener("mousedown", handleClickOutside);
    };
}, []);

  const handleClick = (e) => {
    console.log('clicked')
    console.log(e.target.id)
  
    navigate(`/${e.target.id}`);
    window.location.reload();
  };

  return (
    <header className='bg-black py-5'>
      <div>
        <nav 
          className='hidden lg:flex text-white px-5 mx-auto w-full container 
            justify-between items-center font-semibold'
        >
          <Link to='/'>
            <div className="text-xl">
              EdwardNews
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

        <div className='lg:hidden flex items-center gap-4 px-4 justify-between'>
          <Link to='/'>
            <div className="text-xl text-white">
              NewsBlews
            </div>
          </Link>
          <div className='scale-150 text-white hover:cursor-pointer'>
              { toggled ?
                  <MdOutlineClose onClick={handleToggle} />
              :
                  <MdMenu onClick={handleToggle} />
              }
          </div>
        </div>
      </div>

      <nav 
        ref={dropdownRef}
        className={`${!toggled && 'hidden'} lg:hidden text-white px-5 mx-auto flex flex-col
          justify-between gap-2 my-4 font-semibold`}
      >
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
