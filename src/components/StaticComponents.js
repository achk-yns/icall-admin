import React from 'react'

export default function StaticComponents({Data}) {
    return (
        <div className='flex m-3 flex-wrap justify-start gap-1  items-center' >
    
          {Data?.map((item) => (
            <div
              key={item.title}
              className='bg-white h-30 mx-3 dark:text-gray-200 bg-white dark:bg-secondary-dark-bg md:w-56  drop-shadow-xl items-center border flex  p-4 pt-5 rounded-2xl'
            ><div>

              <button 
                type='button' 
                style={{ color: item.iconColor, backgroundColor: item.iconBg}}
                className='text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl'
                >
                {item.icon}
              </button>
                </div>
            <div className='ml-3'>
                
                <p className='mt-3'>
                    <span className='text-lg font-semibold'>
                    {item.amount}
                    </span>
                </p>

                <p className='text-sm text-gray-400 mt-1'>
                    {item.title}
                </p>
                </div>
            </div>
          ))}
         
        </div>
  )
}
