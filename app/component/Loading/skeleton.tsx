import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const SkeletonProductCard = () => {
  return (
    <div className="pt-1 max-h-full relative m-2 flex w-full max-w-fit justify-between flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <a
        className="relative flex justify-center overflow-hidden rounded-xl"
        href="#"
      >
        <Skeleton
          variant="rectangular"
          width={200}
          height={200}
          style={{ borderRadius: '2rem' }}
        />
      </a>
      <div className="px-2 pb-2 flex flex-col">
        <a href="#">
          <Skeleton
            variant="text"
            width={200}
            height={24}
            style={{ borderRadius: '2rem' }}
          />
        </a>
        <div className="mb-2 flex flex-col items-center justify-between">
          <p>
            <Skeleton
              variant="text"
              width={120}
              height={16}
              style={{ borderRadius: '2rem' }}
            />
          </p>
          <p>
            <Skeleton
              variant="text"
              width={100}
              height={16}
              style={{ borderRadius: '2rem' }}
            />
          </p>
          <p>
            <Skeleton
              variant="text"
              width={80}
              height={16}
              style={{ borderRadius: '2rem' }}
            />
          </p>
        </div>
        <Skeleton
          variant="rectangular"
          height={40}
          width={200}
          style={{ margin: 'auto', borderRadius: '2rem' }}
        />
      </div>
    </div>
  );
};

const SkeletonProductList = () => {
  const productArray = Array.from({ length: 8 }, (_, index) => index);

  return (
    <div className="flex flex-wrap justify-center">
      {productArray.map((index) => (
        <SkeletonProductCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonProductList;
