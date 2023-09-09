const Invoice = ({ selectedProducts }: any) => {
  const calculateItemCount = (products: any, id: any) => {
    return products.filter((product: any) => product.id === id).length;
  };
  const uniqueItemsMap = new Map();

  // Populate the map with unique items and counts
  selectedProducts.forEach((item: any) => {
    const itemId = item.id;
    if (uniqueItemsMap.has(itemId)) {
      uniqueItemsMap.set(itemId, uniqueItemsMap.get(itemId) + 1);
    } else {
      uniqueItemsMap.set(itemId, 1);
    }
  });
  return (
    // console.log(selectedProducts),
    <section className="invoice">
      <h2 className="text-center pb-1 mb-1">Invoice</h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            </tr>
          </thead>
          <tbody>
            {[...uniqueItemsMap.keys()].map((itemId, index) => (
              <>
                <thead className="list-none" key={index}></thead>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {
                      selectedProducts.find((item: any) => item.id === itemId)
                        .name
                    }
                  </th>
                  <td className="px-6 py-4">
                    {' '}
                    {
                      selectedProducts.find((item: any) => item.id === itemId)
                        .size
                    }
                  </td>
                  <td className="px-6 py-4">
                    {' '}
                    {
                      selectedProducts.find((item: any) => item.id === itemId)
                        .flavor
                    }
                  </td>
                  <td className="px-6 py-4">
                    $
                    {
                      selectedProducts.find((item: any) => item.id === itemId)
                        .price
                    }
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {uniqueItemsMap.get(itemId)}
                    </a>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <td colSpan={3}>Total:</td>
            <td>
              $
              {selectedProducts.reduce(
                (total: any, item: any) => total + item.price,
                0,
              )}
            </td>
          </tr>
        </thead>
      </table>
    </section>
  );
};

export default Invoice;
