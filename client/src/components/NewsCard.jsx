export default function NewsCard({article}) {
    return (
        <>
            <div className='bg-white md:hidden shadow-md hover:shadow-lg px-3
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


            <div className='hidden md:block bg-white shadow-md hover:shadow-lg 
                transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px]'>
                <img 
                    className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
                    src={article.image} 
                    alt="Cover Image" 
                />
                <div className="flex flex-col gap-2 py-2">
                    <p className='px-4 text-2xl font-bold line-clamp-3 mb-2'>
                        {article.title}
                    </p>
                </div>
            </div>
        </>
    )
  }
