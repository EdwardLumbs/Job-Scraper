import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { Link } from 'react-router-dom';

export default function HomeNews({location, apiTitle}) {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getNews = async () => {
            try {
                setLoading(true);
                const res = await fetch (`/api/${apiTitle}`);
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
              
                setArticles(newsArticles)
                setError(null)
                setLoading(false)

            } catch (error) {
                console.log(error.message)
                setError(error.message)
                setLoading(false)
            }
        }
    
            getNews()
      }, []);

    return (
        <div className='container my-4 mx-auto px-4'>
            { loading ?
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
            : 
            error ?
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
            articles.length > 0 ? (
                <div className='flex flex-wrap mt-5 gap-4'>
                    {articles.slice(0, 4).map((article, index) => (
                        <Link 
                            key={index}
                            to={article.link}
                            target='_blank'
                        >
                            <NewsCard article={article} />
                        </Link>
                    ))}
                    <Link 
                        to={`/${location}`}
                        className='inline-block'
                    >
                        <p className="font-semibold border px-3 py-1 rounded-full border-blue-800 bg-blue-800 
                        text-white hover:bg-white duration-300 hover:text-blue-800">
                            Check More Articles
                        </p>
                    </Link>
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
    )
}
