'use client'
import React, { useState, useEffect } from 'react';

const ProgressComponent = ({ progress }:any) => {
  return (
    <div className="w-[90%] h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-500 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

const MyComponent = () => {
  const [progress, setProgress] = useState(30);

  return (
    <div className='h-screen flex items-center justify-center bg-gray-100'>

      <div className="w-96 rounded-lg bg-white p-3 space-y-1">

        <div className="flex w-full justify-between items-center">
          <p className='font-medium text-xl'>Mid January</p>

          <p className='text-xl mr-2 text-gray-500'>&gt;</p>
        </div>

        <div className='text-lg'>
          $40,000
        </div>


        <div className='flex flex-row gap-6 items-center justify-center w-full'>
            <ProgressComponent progress={progress} />
            <span className="text-md">{progress}%</span>
        </div>

        <div className="flex w-full items-center flex-row justify-between">
          <div className='flex gap-1'>
            <p className='text-green-500'>Spent: </p>
            <span>$ 12,000</span>
          </div>

          <div className='flex gap-1'>
            <p className='text-yellow-500'>Remains:</p>
            <span>$ 20,000</span>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default MyComponent;
