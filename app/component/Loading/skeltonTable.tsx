import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const SkeletonTable = () => {
  return (
    <section className="flex items-center justify-center content-center">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              <Skeleton
                variant="text"
                width={100}
                style={{ backgroundColor: 'white' }}
              />
            </th>
            <th scope="col" className="px-6 py-3">
              <Skeleton
                variant="text"
                width={60}
                style={{ backgroundColor: 'white' }}
              />
            </th>
            <th scope="col" className="px-6 py-3">
              <Skeleton
                variant="text"
                width={80}
                style={{ backgroundColor: 'white' }}
              />
            </th>
            <th scope="col" className="px-6 py-3">
              <Skeleton
                variant="text"
                width={60}
                style={{ backgroundColor: 'white' }}
              />
            </th>
            <th scope="col" className="px-6 py-3">
              <Skeleton
                variant="text"
                width={60}
                style={{ backgroundColor: 'white' }}
              />
            </th>
            <th scope="col" className="px-6 py-3">
              <Skeleton
                variant="text"
                width={60}
                style={{ backgroundColor: 'white' }}
              />
            </th>
            <th scope="col" className="px-6 py-3">
              <Skeleton
                variant="text"
                width={80}
                style={{ backgroundColor: 'white' }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }, (_, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              key={index}
            >
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Skeleton
                  variant="text"
                  width={100}
                  style={{ backgroundColor: 'grey' }}
                />
              </td>
              <td className="px-6 py-4">
                <Skeleton
                  variant="text"
                  width={60}
                  style={{ backgroundColor: 'grey' }}
                />
              </td>
              <td className="px-6 py-4">
                <Skeleton
                  variant="text"
                  width={80}
                  style={{ backgroundColor: 'grey' }}
                />
              </td>
              <td className="px-6 py-4">
                <Skeleton
                  variant="text"
                  width={60}
                  style={{ backgroundColor: 'grey' }}
                />
              </td>
              <td className="px-6 py-4">
                <Skeleton
                  variant="text"
                  width={60}
                  style={{ backgroundColor: 'grey' }}
                />
              </td>
              <td className="px-6 py-4">
                <Skeleton
                  variant="text"
                  width={60}
                  style={{ backgroundColor: 'grey' }}
                />
              </td>
              <td className="px-6 py-4">
                <Skeleton
                  variant="text"
                  width={80}
                  style={{ backgroundColor: 'grey' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SkeletonTable;
