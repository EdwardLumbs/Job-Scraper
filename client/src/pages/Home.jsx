import { useState, useEffect } from 'react';
import HomeHeadlinesCard from '../components/HomeHeadlinesCard';
import HomeNews from '../components/HomeNews';
import { Link } from 'react-router-dom';

export default function Home() {
  const [headlines, setHeadlines] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTopNews = async () => {
      try {
        setLoading(true);
        const res = await fetch ('/api/getTopNews');
        const data = await res.json();
        console.log(data)
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

        setHeadlines(newsArticles)
        setError(null)
        setLoading(false)
        
      } catch (error) {
        console.log(error.message)
        setError(error.message)
        setLoading(false)
      }
    }
    getTopNews()
  }, []);
  
  return (
    <div>
      <div className='text-5xl font-bold container mt-4 mx-auto px-4'>
        <p>
          Latest Philippine news at your fingertips. Welcome!
        </p>
      </div>

      <div className='text-2xl font-semibold container mt-4 mx-auto px-4'>
        <p>
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
            <div>
              {headlines.slice(0, 4).map((headline, index) => (
                <Link 
                    key={index}
                    to={headline.link}
                    target='_blank'
                >
                  <HomeHeadlinesCard article={headline}/>
                </Link>
              ))}
            </div>
          )
          :
          <div className='mx-auto pt-32 h-screen flex flex-col items-center'>
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

      <div className='text-2xl font-semibold container mt-4 mx-auto px-4'>
        <p>
          World News
        </p>
        <HomeNews location={'world'} apiTitle={'getWorldNews'} />
      </div>

      <div className='text-2xl font-semibold container mt-4 mx-auto px-4'>
        <p>
          Business News
        </p>
        <HomeNews location={'business'} apiTitle={'getBusinessNews'} />

      </div>

      <div className='text-2xl font-semibold container mt-4 mx-auto px-4'>
        <p>
          Entertainment News
        </p>
        <HomeNews location={'entertainment'} apiTitle={'getEntertainmentNews'} />
      </div>

      <div className='text-2xl font-semibold container mt-4 mx-auto px-4'>
        <p>
          Technology News
        </p>
        <HomeNews location={'technology'} apiTitle={'getTechnologyNews'} />
      </div>

      <div className='text-2xl font-semibold container mt-4 mx-auto px-4'>
        <p>
          Sports News
        </p>
        <HomeNews location={'sports'} apiTitle={'getSportsNews'} />
      </div>

      <div className='text-2xl font-semibold container mt-4 mx-auto px-4'>
        <p>
          Lifestyle News
        </p>
        <HomeNews location={'lifestyle'} apiTitle={'getLifestyleNews'} />
      </div>

      <div className='text-2xl font-semibold container mt-4 mx-auto px-4'>
        <p>
          Opinions        
        </p>
        <HomeNews location={'opinion'} apiTitle={'getOpinionNews'} />
      </div>

    </div>
  )
}
