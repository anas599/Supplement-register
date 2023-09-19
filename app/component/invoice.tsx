import { PDFDownloadLink } from '@react-pdf/renderer';
import { useState, useRef } from 'react';
import { useGlobalContext } from '../context/store';
import PrintBtn from './printBtn';
import { PDFExport } from '@progress/kendo-react-pdf';
import 'react-toastify/dist/ReactToastify.css';

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
      const uniqueItemsMapArray = Array.from(uniqueItemsMap.entries());
      const response = await fetch('/api/updateAfterSale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uniqueItemsMap: uniqueItemsMapArray }),
      });
      if (response.ok) {
        toast.success('Sale successfull, Inventory had been updated', {
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
  // ---------
  const uniqueItemsMap = new Map();
  selectedProducts.forEach((item: any) => {
    const itemId = item.id;
    if (uniqueItemsMap.has(itemId)) {
      uniqueItemsMap.set(itemId, uniqueItemsMap.get(itemId) + 1);
    } else {
      uniqueItemsMap.set(itemId, 1);
    }
  });
  const countAll = [...uniqueItemsMap.values()].reduce(
    (total, count) => total + count,
    0,
  );
  return (
    console.log(uniqueItemsMap),
    (
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
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                          selectedProducts.find(
                            (item: any) => item.id === itemId,
                          )?.name
                        }
                      </td>
                      <td className="pl-6 py-1">
                        {
                          selectedProducts.find(
                            (item: any) => item.id === itemId,
                          )?.size
                        }
                      </td>
                      <td className="pl-6 py-1">
                        {
                          selectedProducts.find(
                            (item: any) => item.id === itemId,
                          )?.flavor
                        }
                      </td>
                      <td className="pl-6 py-1">
                        $
                        {
                          selectedProducts.find(
                            (item: any) => item.id === itemId,
                          )?.price
                        }
                      </td>
                      <td className="pl-6 py-1">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          {uniqueItemsMap.get(itemId)}
                        </a>
                      </td>
                    </tr>
                  ))}
                  {/* ------------------ */}
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <td colSpan={3} className="pl-6 py-3 font-medium">
                      Total:
                    </td>
                    <td>
                      $
                      {selectedProducts.reduce(
                        (total: any, item: any) => total + item.price,
                        0,
                      )}
                    </td>
                    <td className="pl-6 py-3 font-medium">{countAll}</td>
                  </tr>
                  {/* ------------------ */}
                </tbody>
              </table>
            </PDFExport>
          </div>
          <PrintBtn handleExportPDF={handleExportPDF} />
        </section>
      </>
    )
  );
};
export default Invoice;
