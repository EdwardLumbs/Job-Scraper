import { useState, useEffect } from 'react';
import HomeHeadlinesCard from '../components/HomeHeadlinesCard';
import HomeNews from '../components/HomeNews';
import { Link } from 'react-router-dom';

export default function Home() {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTopNews = async () => {
      console.log('clicked')
      try {
        setLoading(true);
        console.log('clicked')

        const res = await fetch ('/api/news/getTopNews');
        console.log(res)

        const data = await res.json();
        console.log('clicked')

        console.log(data);
        if (data.success === false) {
          setError(data.message)
          setLoading(false)
          return
        }
        const newsArticles = data.sort((a, b) => {
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();
        
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        });

        setHeadlines(newsArticles);
        setError(null);
        setLoading(false);
        
      } catch (error) {
        console.log(error.message)
        setError(error.message)
        setLoading(false)
      }
    }
    getTopNews()
  }, []);
  
  return (
    <div className=''>
      <div 
        className='mt-4 bg-blue-100 flex items-center justify-center h-[500px] 
          bg-cover mx-0 lg:mx-2 lg:px-4 lg:rounded-3xl'
        style={{
          backgroundImage: `url('/home.jpg')`,
          textShadow: '0 0 5px rgba(0,0,0,0.5)'
        }}
      >
        <div className='text-6xl text-white font-bold container mx-auto px-4'>
            Latest Philippine news at your fingertips. Welcome!
        </div>
      </div>

      <div className='container mt-10 mx-auto px-4'>
        <p className='text-3xl font-bold '>
          Today's Headlines
        </p>
        <div className='my-4 flex gap-4'>
          {
          loading ? 
            <div className='mx-auto py-4 animate-pulse flex flex-col items-center'>
                <img 
                    className='h-[120px]'
                    src="/newspaper.svg" 
                    alt="newspaper" 
                />
                <p className='text-lg'>
                    Getting News
                </p>
            </div>
          : error ?
          <div className='mx-auto py-4 flex flex-col items-center'>
              <img 
                  className='h-[120px]'
                  src="/error.svg" 
                  alt="error" 
              />
              <p className='text-lg'>
                  {error}
              </p>
          </div>
          :
          headlines.length > 0 ? (
            <div className='w-full'>
                <HomeHeadlinesCard articles={headlines}/>
            </div>
          )
          :
          <div className='mx-auto py-4 h-screen flex flex-col items-center'>
            <img 
                className='h-[120px]'
                src="/magnifying-glass.svg" 
                alt="glass" 
            />
            <p className='text-lg'>
                No News Articles Found
            </p>
          </div>
          }
        </div>
      </div>

      <div className='container mt-10 border-t-2 mx-auto px-4'>
        <p className='text-3xl mt-10 font-bold'>
          Yesterday's World News
        </p>
        <HomeNews category={'world'}/>
      </div>

      <div className='container mt-10 border-t-2 mx-auto px-4'>
        <p className='text-3xl mt-10 font-bold'>
          Yesterday's Business News
        </p>
        <HomeNews category={'business'}/>

      </div>

      <div className='container mt-10 border-t-2 mx-auto px-4'>
        <p className='text-3xl mt-10 font-bold'>
          Yesterday's Entertainment News
        </p>
        <HomeNews category={'entertainment'}/>
      </div>

      <div className='container mt-10 border-t-2 mx-auto px-4'>
        <p className='text-3xl mt-10 font-bold'>
          Yesterday's Technology News
        </p>
        <HomeNews category={'technology'}/>
      </div>

      <div className='container mt-10 border-t-2 mx-auto px-4'>
        <p className='text-3xl mt-10 font-bold'>
          Yesterday's Sports News
        </p>
        <HomeNews category={'sports'}/>
      </div>

      <div className='container mt-10 border-t-2 mx-auto px-4'>
        <p className='text-3xl mt-10 font-bold'>
          Yesterday's Lifestyle News
        </p>
        <HomeNews category={'lifestyle'}/>
      </div>

      <div className='container my-10 border-t-2 mx-auto px-4'>
        <p className='text-3xl mt-10 font-bold'>
          Yesterday's Opinions        
        </p>
        <HomeNews category={'opinion'}/>
      </div>

    </div>
  )
}