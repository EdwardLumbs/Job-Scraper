import { Link } from 'react-router-dom';
import NewsCard from './NewsCard';

export default function Headlines({articles}) {
  return (
    <>
        <div className='flex gap-5 lg:flex-row flex-col'>
          <div className='bg-white shadow-md hover:shadow-lg relative
              transition-shadow overflow-hidden rounded-lg w-full flex-1'
          >
            <Link
              to={articles[0].link}
              target='_blank'
            >
              <img 
                className='h-full w-full object-cover hover:scale-105 transition-scale duration-300'
                src={articles[0].image} 
                alt="Cover Image" 
              />
                <div className="absolute left-0 right-0 bottom-0 
                  p-7 flex flex-col gap-1 hover:scale-105 transition-scale duration-300">
                    <p 
                        className='text-6xl font-bold text-white'
                        style={{ textShadow: '0 0 5px rgba(0,0,0,0.5)' }}
                    >
                        {articles[0].title}
                    </p>
                    <p 
                        className='text-white font-semibold'
                        style={{ textShadow: '0 0 5px rgba(0,0,0,0.5)' }}
                    >
                        Source: {articles[0].source}
                    </p>
                </div>
            </Link>
          </div>
          <div className='flex gap-4 flex-col flex-1'>
            {articles.slice(1, 6).map((article, index) => (
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
                      <p className='font-semibold'>
                        Source: {article.source}
                      </p>
                  </div>
              </div>
            ))}
          </div>
        </div>

        {articles.length > 5 &&
            <p className='mt-10 font-bold text-3xl'>
                More Articles
            </p>
        }

        <div className='flex flex-wrap mt-5 gap-4'>
          {articles.slice(7).map((article, index) => (
            <Link 
              key={index}
              to={article.link}
              target='_blank'
            >
              <NewsCard article={article} />
            </Link>
          ))}
        </div>
    </>
  )
}
