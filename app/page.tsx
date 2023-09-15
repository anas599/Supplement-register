'use client';
import Invoice from './component/invoice';
import ItemPick from './component/sellItemPick';
import { useGlobalContext } from './context/store';
export default function Home() {
  const { selectedProducts, setSelectedProducts } = useGlobalContext();
  const addToInvoice = (product: any) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  return (
    <section>
      <div className="grid grid-cols-3 gap-1">
        <div className="col-span-2 bg-gray-800 p-4 flex flex-wrap overflow-auto h-screen justify-center">
          <ItemPick addToInvoice={addToInvoice} />
        </div>
        <div className="col-span-1 bg-gray-900 p-4 overflow-auto h-screen w-auto">
          <Invoice selectedProducts={selectedProducts} />
        </div>
      </div>
    </section>
  );
}
