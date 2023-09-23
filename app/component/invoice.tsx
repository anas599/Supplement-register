import { useState, useRef, useEffect } from 'react';
import PrintBtn from './printBtn';
import { PDFExport } from '@progress/kendo-react-pdf';
import 'react-toastify/dist/ReactToastify.css';
import removeItemById from '../functions/removeItem';
import { useRouter } from 'next/navigation';

import { toast, ToastContainer } from 'react-toastify';
type Product = {
  id: string;
  name: string;
  size: string;
  flavor: string;
  price: number;
};
const Invoice = ({ selectedProducts }: { selectedProducts: Product[] }) => {
  const pdfExportComponent = useRef<PDFExport>(null);
  // -----------------
  const [discount, setDiscount] = useState(0);
  const handleExportPDF = async () => {
    const uniqueItemsMap = new Map();
    selectedProducts.forEach((item) => {
      const itemId = item.id;
      if (uniqueItemsMap.has(itemId)) {
        uniqueItemsMap.set(itemId, uniqueItemsMap.get(itemId) + 1);
      } else {
        uniqueItemsMap.set(itemId, 1);
      }
    });
    if (selectedProducts.length === 0) {
      toast.error('Please select at least one product to sale', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      return;
    }
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
      //-------------kedopdf library end-----------------------------------------
      // Update inventory
      const uniqueItemsMapArray = Array.from(uniqueItemsMap.entries());
      const response = await fetch('/api/updateAfterSale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uniqueItemsMap: uniqueItemsMapArray }),
      });
      if (response.ok) {
        toast.success('Sale successful, Inventory had been updated', {
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
      if (!response.ok) {
        throw new Error('Error updating inventory');
      }
    }
  };
  const total = selectedProducts.reduce((total, item) => total + item.price, 0);

  const discountedTotal = total * (1 - discount);
  const [uniqueItemsMap, setUniqueItemsMap] = useState<Map<string, number>>(
    new Map(),
  );
  useEffect(() => {
    const updatedMap = new Map();
    selectedProducts.forEach((item) => {
      const itemId = item.id;
      if (updatedMap.has(itemId)) {
        updatedMap.set(itemId, updatedMap.get(itemId) + 1);
      } else {
        updatedMap.set(itemId, 1);
      }
    });
    setUniqueItemsMap(updatedMap);
  }, [selectedProducts]);
  const [items, setItems] = useState<Product[]>([]);
  const increaseCount = (id: string) => {
    const newCount = uniqueItemsMap.get(id) + 1;
    setUniqueItemsMap(new Map(uniqueItemsMap.set(id, newCount)));
  };

  const decreaseCount = (id: string) => {
    const newCount = uniqueItemsMap.get(id) - 1;
    if (newCount >= 0) {
      setUniqueItemsMap(new Map(uniqueItemsMap.set(id, newCount)));
    }
  };

  // const handleRemove = (id: string) => {
  //   const updatedItems = items.filter((item) => item.id !== id);
  //   setItems(updatedItems);
  //   setUniqueItemsMap(new Map(uniqueItemsMap.delete(id)));
  // };
  const countAll = [...uniqueItemsMap.values()].reduce(
    (total, count) => total + count,
    0,
  );

  // ---------
  console.log('selectedProducts', uniqueItemsMap);
  return (
    <>
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
      <section className="invoice flex flex-col items-center justify-center">
        <h2 className="text-center pb-1 mb-1">Invoice</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <PDFExport ref={pdfExportComponent} paperSize="A2">
            <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="pl-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="pl-6 py-3">
                    Size
                  </th>
                  <th scope="col" className="pl-6 py-3">
                    Flavor
                  </th>
                  <th scope="col" className="pl-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...uniqueItemsMap.keys()].map((itemId, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <td
                      scope="row"
                      className="pl-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {
                        selectedProducts.find((item: any) => item.id === itemId)
                          ?.name
                      }
                    </td>
                    <td className="pl-6 py-1">
                      {
                        selectedProducts.find((item: any) => item.id === itemId)
                          ?.size
                      }
                    </td>
                    <td className="pl-6 py-1">
                      {
                        selectedProducts.find((item: any) => item.id === itemId)
                          ?.flavor
                      }
                    </td>
                    <td className="pl-6 py-1">
                      $
                      {
                        selectedProducts.find((item: any) => item.id === itemId)
                          ?.price
                      }
                    </td>
                    <td className="pl-6 py-1 flex flex-row">
                      <button
                        onClick={() => {
                          decreaseCount(itemId);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        {uniqueItemsMap.get(itemId)}
                      </a>

                      <button
                        onClick={() => {
                          increaseCount(itemId);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                      {/* <button
                        className="bg-red-500"
                        onClick={() => {
                          handleRemove(itemId);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                          />
                        </svg>
                      </button> */}
                    </td>
                  </tr>
                ))}
                {/* ------------------ */}
                {/* ------------------ */}
              </tbody>
            </table>
            <br />
            <br />
            <select
              className="w-full h-10 px-3 mb-5 text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline"
              value={discount === 0 ? '' : discount} // Use an empty string for the default option
              onChange={(e) =>
                setDiscount(e.target.value === '' ? 0 : Number(e.target.value))
              } // Set discount to 0 if the empty string is selected
            >
              <option value="">Select Discount</option> {/* Default title */}
              <option value={0}>0%</option>
              <option value={0.1}>10%</option>
              <option value={0.2}>20%</option>
              <option value={0.3}>30%</option>
            </select>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="pl-6 py-3">
                    Total invoice
                  </th>
                  <th scope="col" className="pl-6 py-3">
                    Discount
                  </th>
                  <th scope="col" className="pl-6 py-3">
                    Discounted total
                  </th>
                  <th scope="col" className="pl-6 py-3">
                    Total Count
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <td className="pl-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${total.toFixed(2)}
                  </td>
                  <td className="pl-6 py-1">{(discount * 100).toFixed(2)}%</td>
                  <td className="pl-6 py-1">${discountedTotal.toFixed(2)}</td>
                  <td className="pl-6 py-1">{countAll}</td>
                </tr>
              </tbody>
            </table>
          </PDFExport>
        </div>
        <PrintBtn handleExportPDF={handleExportPDF} text={'Print Invoice'} />
      </section>
    </>
  );
};
export default Invoice;
