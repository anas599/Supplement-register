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
        <div className="col-span-2 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-4 flex flex-wrap overflow-auto h-screen justify-center">
          <ItemPick addToInvoice={addToInvoice} />
        </div>
        <div className="col-span-1 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black p-4 overflow-auto h-screen w-auto">
          <Invoice selectedProducts={selectedProducts} />
        </div>
      </div>
    </section>
  );
}
