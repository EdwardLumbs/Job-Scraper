import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsCard from '../components/NewsCard';

export default function World() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWorldNews = async () => {
      try {
        setLoading(true);
        const res = await fetch ('/api/getWorldNews');
        const data = await res.json();
        console.log(data)

        if (data.success === false) {
          setError(data.message)
          setLoading(false)
          return
        }
        setArticles(data)

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

        setFilteredArticles(newsArticles)
        setError(null)
        setLoading(false)
        
      } catch (error) {
        console.log(error.message)
        setError(error.message)
        setLoading(false)
      }
    }

    getWorldNews()
  }, []);

  const handleClick = (e) => {
    const source = articles.filter(article => article.source === e.target.id);
    console.log(source.length)
    setFilteredArticles(source)
  }

  return (
    <div>
      <div className='container my-10 mx-auto px-4'>
        <div className='flex justify-between'>
          <img 
            className='w-32 h-32 object-cover rounded-xl hover:cursor-pointer'
            onClick={() => setFilteredArticles(articles)}
            src="/all.png" 
            alt="all" 
          />
          <img 
            className='w-32 h-32 object-cover rounded-xl hover:cursor-pointer'
            onClick={handleClick}
            id='Rappler'
            src="/rappler.png" 
            alt="rappler" 
          />
          <img 
            className='w-32 h-32 object-cover rounded-xl hover:cursor-pointer'
            onClick={handleClick}
            id='Inquirer'
            src="/inquirer.jpg" 
            alt="inquirer" 
          />
          <img 
            className='w-32 h-32 object-cover rounded-xl hover:cursor-pointer'
            onClick={handleClick}
            id='Business World'
            src="/BW.png" 
            alt="BW" 
          />
          <img 
            className='w-32 h-32 object-cover rounded-xl hover:cursor-pointer'
            onClick={handleClick}
            id='Manila Bulletin'
            src="/MB.jpeg" 
            alt="MB" 
          />
          <img 
            className='w-32 h-32 object-cover rounded-xl hover:cursor-pointer'
            onClick={handleClick}
            id='Philstar'
            src="/philstar.jpg" 
            alt="philstar" 
          />
        </div>

        <div className='mt-10'>
          { loading ? 
            <div className='mx-auto mt-32 animate-pulse h-svh flex flex-col items-center'>
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
            <p>
              Error
            </p>
          :
            filteredArticles.length > 0 && (
            <div className=''>
              <div className='flex'>
                <div className='bg-white shadow-md hover:shadow-lg relative
                    transition-shadow overflow-hidden rounded-lg w-full flex-1'
                >
                  <Link
                    to={filteredArticles[0].link}
                    target='_blank'
                  >
                    <img 
                      className='h-full w-full object-cover hover:scale-105 transition-scale duration-300'
                      src={filteredArticles[0].image} 
                      alt="Cover Image" 
                    />
                      <div className="absolute left-0 right-0 bottom-0 
                        p-7 flex flex-col gap-1 hover:scale-105 transition-scale duration-300">
                        <p 
                            className='text-6xl font-bold text-white'
                            style={{ textShadow: '0 0 5px rgba(0,0,0,0.5)' }}
                        >
                            {filteredArticles[0].title}
                        </p>
                      </div>
                  </Link>
                </div>
                <div className='flex gap-4 flex-col flex-1'>
                  {filteredArticles.slice(1, 6).map((article, index) => (
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
                        </div>
                    </div>
                  ))}

                </div>
              </div>

              {filteredArticles.length > 5 &&
                <p className='mt-10 font-bold text-3xl'>
                  More News
                </p>
              }

              <div className='flex flex-wrap mt-5 gap-4'>
                {filteredArticles.slice(7).map((article, index) => (
                  <Link 
                    key={index}
                    to={article.link}
                    target='_blank'
                  >
                    <NewsCard article={article} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
