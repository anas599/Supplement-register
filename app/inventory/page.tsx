'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import formatDate from '../functions/formatDate';
import SkeletonTable from '../component/Loading/skeltonTable';
const Inventory = () => {
  const [inventory, setInventory] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.DEPLOYDOMAIN}/api/inventory`);

        if (res.ok) {
          const data = await res.json();
          setInventory(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);
  if (inventory === null) {
    return <SkeletonTable />;
  }
  return (
    <section className="flex items-center justify-center content-center">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Size
            </th>
            <th scope="col" className="px-6 py-3">
              Flavor
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Count
            </th>
            <th scope="col" className="px-6 py-3">
              Brand
            </th>
            <th scope="col" className="px-6 py-3">
              Expire Date
            </th>
          </tr>
        </thead>
        <tbody>
          {
            //@ts-ignore
            inventory.map((item: any) => (
              <tr
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                key={item.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">{item.size}</td>
                <td className="px-6 py-4">{item.flavor}</td>
                <td className="px-6 py-4">${item.price}</td>
                <td
                  className="px-6 py-4"
                  style={{ color: item.quantity === 0 ? 'red' : 'inherit' }}
                >
                  {item.quantity === 0 ? 'Out of Stock' : item.quantity}
                </td>
                <td className="px-6 py-4">{item.brand}</td>
                <td className="px-6 py-4">{formatDate(item.expiry)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  );
};

export default Inventory;
