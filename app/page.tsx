'use client';
import Image from 'next/image';
import { Fragment, useState, useEffect } from 'react';
import Sell from './component/sell';
import Invoice from './component/invoice';
import ItemPick from './component/sellItemPick';
export default function Home() {
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const addToInvoice = (product: any) => {
    setSelectedProducts([...selectedProducts, product]);
  };
  return (
    <>
      <section>
        <div className="grid grid-cols-3 gap-1">
          <div className="col-span-2 bg-gray-800 p-4 flex flex-wrap overflow-auto h-screen">
            <ItemPick addToInvoice={addToInvoice} />
          </div>
          <div className="col-span-1 bg-gray-900 p-4 overflow-auto h-screen">
            <Invoice selectedProducts={selectedProducts} />
          </div>
        </div>
      </section>
    </>
  );
}
