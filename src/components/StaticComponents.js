import { LinearProgress } from '@mui/material';
import React from 'react';

export default function StaticComponents({ Data }) {
  const calculateProgress = (currentValue, targetValue) => {
    return Math.min((currentValue / targetValue) * 100, 100); // Ensure progress doesn't exceed 100%
  };

  return (
    <div className='flex md:m-3 flex-wrap justify-center gap-1 items-center'>
      {Data?.map((item, index) => (
        <div
          key={index}
          className='bg-white h-30 mx-3 dark:text-gray-200 bg-white dark:bg-secondary-dark-bg md:w-56 drop-shadow-xl  border p-4 pt-5 rounded-2xl'
        >
            <div  className='flex items-center'>
                <div> 
                  <button
                    type='button'
                    style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                    className='text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl'
                  >
                    {item.icon}
                  </button>
                </div>
              <div className='ml-3 pb-2'>
                <p className='mt-3'>
                  <span className='text-lg font-semibold'>
                    {item.amount} {item.Tag}
                  </span>
                </p>
              <p className='text-sm text-gray-400 mt-1'>{item.title}</p>
            </div>
            </div>
            
            <div className='w-full mt-3'>
              <LinearProgress
                variant='determinate'
                value={calculateProgress(item?.amount || 0, item?.target || 100)}
                aria-label={`${calculateProgress(item?.amount || 0, item?.target || 100)}% progress`}
              />
            </div>
        </div>
      
      ))}
    </div>
  );
}
