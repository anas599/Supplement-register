'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { formatCurrency } from '../functions/currency';
import { useGlobalContext } from '../context/store';
import Loading from './loading';
export default function ItemPick({ product, addToInvoice }: any) {
  const [inventory, setInventory] = useState(null);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');
  function handleAddToInvoice(item: any) {
    addToInvoice(item);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.DEPLOYDOMAIN}/api/inventory`);

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

  // Check if inventory is still null and render accordingly
  if (inventory === null) {
    return <Loading />;
  }
  return filteredItems.map((item: any) => (
    <div
      key={item.name}
      className="max-h-full relative m-4 flex w-full max-w-fit flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md "
    >
      <a
        className="relative  flex justify-center overflow-hidden rounded-xl"
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
      <div className=" px-5 pb-2 flex flex-col ">
        <a href="#">
          <h5 className="text-l tracking-tight font-bold text-slate-900 text-center">
            {item.name}
          </h5>
        </a>
        <div className=" mb-2 flex flex-col items-center justify-between">
          <p>
            <span className="text-l  text-slate-900 ">
              {'Price: $' + item.price + ' '}
            </span>
          </p>
          <p>
            <span className="text-l  text-slate-900 ">
              {'Flavor: ' + item.flavor + ' '}
            </span>
          </p>
          <p>
            <span className="text-l  text-slate-900 ">
              {'Size: ' + item.size}
            </span>
          </p>
        </div>
        <button
          onClick={() => handleAddToInvoice(item)}
          className="flex items-center justify-center rounded-md bg-slate-900 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  ));
}
