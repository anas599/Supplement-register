'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SkeletonTable from '../component/Loading/skeltonTable';
import formatDate from '../functions/formatDate';
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
          <motion.tr
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
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
          </motion.tr>
        </thead>
        <motion.tbody
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          {
            //@ts-ignore
            inventory.map((item: any) => (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                key={item.id}
              >
                <motion.th
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.1,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </motion.th>
                <motion.td
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-6 py-4"
                >
                  {item.size}
                </motion.td>
                <motion.td className="px-6 py-4">{item.flavor}</motion.td>
                <motion.td className="px-6 py-4">${item.price}</motion.td>
                <motion.td
                  className="px-6 py-4"
                  style={{ color: item.quantity === 0 ? 'red' : 'inherit' }}
                >
                  {item.quantity === 0 ? 'Out of Stock' : item.quantity}
                </motion.td>
                <td className="px-6 py-4">{item.brand}</td>
                <td className="px-6 py-4">{formatDate(item.expiry)}</td>
              </motion.tr>
            ))
          }
        </motion.tbody>
      </table>
    </section>
  );
};

export default Inventory;
