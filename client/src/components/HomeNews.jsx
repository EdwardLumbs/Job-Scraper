import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

export default function HomeNews({category}) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);  

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/articles/getArticles/${category}`)
                const data = await res.json()
                console.log(data)

                if (data.success === false) {
                    setError(data.message)
                    setLoading(false)
                    return
                }
                setArticles(data)
                setError(null)
                setLoading(false)
            } catch (error) {
                console.log(error.message)
                setError(error.message)
                setLoading(false)
            }
        }

        fetchNews()
    }, [])

    return (
        <div className='container my-4 mx-auto'>
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
                        to={`/${category}`}
                        className='inline-block'
                    >
                        <div className="flex items-center text-lg font-semibold border px-3 py-1 rounded-full border-blue-800 bg-blue-800 
                        text-white hover:bg-white duration-300 hover:text-blue-800">
                            <p className='mr-1'>
                                Check out the latest {category} headlines
                            </p>
                            <FaArrowRight />
                        </div>
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
