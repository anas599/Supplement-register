'use client';
import SkeletonProductList from '@/app/component/Loading/skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import AddCartBtnProp from './addCartBtnProp';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastContainer } from 'react-toastify';

export default function ItemPick({ product, addToInvoice }: any) {
  const [inventory, setInventory] = useState(null);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');
  function handleAddToInvoice(item: any) {
    addToInvoice(item);
  }
  function handelShowToast() {
    toast.warn('Item is out of stock!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.DEPLOYDOMAIN}/api`);

        if (res.ok) {
          const data = await res.json();
          setInventory(data);
          setSelected(data[0]);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleQueryChange = (event: any) => {
    setQuery(event.target.value);
  };

  const filteredItems =
    query === ''
      ? inventory
      : //@ts-ignore
        inventory.filter((item: any) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        );

  if (inventory === null) {
    console.log(process.env.DEPLOYDOMAIN);
    console.log(process.env.DATABASE_URL);
    return <SkeletonProductList />;
  }
  console.log(process.env.DEPLOYDOMAIN);
  console.log(process.env.DATABASE_URL);

  return filteredItems.map((item: any) => (
    <section key={item.name}>
      {item.quantity > 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="max-h-full relative m-2 flex w-full max-w-fit flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
        >
          <a
            className="relative flex justify-center overflow-hidden rounded-xl"
            href="#"
          >
            <Image
              className="object-cover"
              src={item.picture}
              alt="product image"
              width={200}
              height={200}
              priority={true}
            />
          </a>
          <div className="px-5 pb-2 flex flex-col">
            <a href="#">
              <h5 className="text-l tracking-tight font-bold text-slate-900 text-center">
                {item.name}
              </h5>
            </a>
            <div className="mb-2 flex flex-col items-center justify-between">
              <p>
                <span className="text-l text-slate-900">
                  {'Price: $' + item.price + ' '}
                </span>
              </p>
              <p>
                <span className="text-l text-slate-900">
                  {'Flavor: ' + item.flavor + ' '}
                </span>
              </p>
              <p>
                <span className="text-l text-slate-900">
                  {'Size: ' + item.size}
                </span>
              </p>
            </div>
            <AddCartBtnProp
              onClick={() => handleAddToInvoice(item)}
              text={'Add to Invoice'}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="max-h-full relative m-2 flex w-full max-w-fit flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
        >
          <a
            className="relative flex justify-center overflow-hidden rounded-xl"
            href="#"
          >
            <Image
              className="object-cover grayscale opacity-60"
              src={item.picture}
              alt="product image"
              width={200}
              height={200}
              priority={true}
            />
            <Image
              className="object-cover absolute top-0 left-0 "
              src="/outofstock.png"
              alt="out of stock"
              width={200}
              height={200}
              priority={true}
            />
          </a>
          <div className="px-5 pb-2 flex flex-col">
            <a href="#">
              <h5 className="text-l tracking-tight font-bold text-slate-900 text-center">
                {item.name}
              </h5>
            </a>
            <div className="mb-2 flex flex-col items-center justify-between">
              <p>
                <span className="text-l text-slate-900">
                  {'Price: $' + item.price + ' '}
                </span>
              </p>
              <p>
                <span className="text-l text-slate-900">
                  {'Flavor: ' + item.flavor + ' '}
                </span>
              </p>
              <p>
                <span className="text-l text-slate-900">
                  {'Size: ' + item.size}
                </span>
              </p>
            </div>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <AddCartBtnProp
              onClick={() => handelShowToast()}
              text={<span style={{ color: 'red' }}>Out of Stock</span>}
            />
          </div>
        </motion.div>
      )}
    </section>
  ));
}
