export default function NewsCard({article}) {
    return (
        <>
            <div className='bg-white md:hidden shadow-md hover:shadow-lg
                transition-shadow overflow-hidden rounded-lg flex 
                items-center'
            >
                <img 
                    className='w-36 h-36 object-cover hover:scale-105 transition-scale duration-300'
                    src={article.image} 
                    alt="Cover Image" 
                />
                <div className="py-4 px-4">
                    <p className='text-md font-bold line-clamp-2'>
                        {article.title}
                    </p>
                    <p className="my-2 font-semibold">
                        Source: {article.source}
                    </p>
                </div>
            </div>


            <div className='hidden md:flex md:flex-col md:justify-between bg-white 
                shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg 
                h-[410px] w-[350px]'
            >
                <div>
                    <img 
                        className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
                        src={article.image} 
                        alt="Cover Image" 
                    />
                    <div className="py-2">
                        <p className='px-4 text-2xl font-bold line-clamp-4 mb-2'>
                            {article.title}
                        </p>

                    </div>
                </div>
                <p className="px-4 mb-2 font-semibold">
                    Source: {article.source}
                </p>
            </div>
        </>
    )
  }
