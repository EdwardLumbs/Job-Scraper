import { useState, useEffect } from 'react';
import SiteFilter from '../components/SiteFilter';
import Headlines from '../components/Headlines';

export default function Top() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
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
        setArticles(data)
        console.log(data)

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

        for (const obj of data) {
          try {
            const response = await fetch ('/api/addArticles', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(obj)
            });
            const statusData = await response.json();
            if (statusData.success === false) {
              console.log(obj)
              setLoading(false);
              setError(statusData.message);
              // setTimeout(() => {
              //   setError(null);
              // }, 2000);
              return;
            }
          } catch (error) {
            console.error('Error inserting object:', obj, error);
          }
        }
        
      } catch (error) {
        console.log(error.message)
        setError(error.message)
        setLoading(false)
      }
    }

    getTopNews()
  }, []);

  const handleClick = (e) => {
    const source = articles.filter(article => article.source === e.target.id);
    console.log(source.length)
    setFilteredArticles(source)
  }

  return (
    <div>
      <div className='container my-10 mx-auto px-4'>
        <SiteFilter 
          handleClick={handleClick} 
          setFilteredArticles={setFilteredArticles}
          articles={articles}
        />
        <div>
          <p className='my-10 font-bold text-3xl'>
            Today's Top Headlines
          </p>
        </div>

        <div className='mt-10'>
          { loading ? 
            <div className='mx-auto pt-32 animate-pulse h-screen flex flex-col items-center'>
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
          <div className='mx-auto pt-32 h-screen flex flex-col items-center'>
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
            filteredArticles.length > 0 ? (
            <div className=''>
              <Headlines articles={filteredArticles}/>
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
    </div>
  )
}