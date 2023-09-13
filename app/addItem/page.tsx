'use client';
import { useState, useEffect } from 'react';
import dateISO8601 from '../functions/dateiso-8601';
import InputProp from '../component/inputProp';
const AddForm = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [flavor, setFlavor] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [picture, setPicture] = useState('');

  const postData = async (event: any) => {
    event.preventDefault();

    const itemData = {
      name: name,
      brand: brand,
      size: size,
      price: parseInt(price),
      quantity: parseInt(quantity),
      flavor: flavor,
      expiry: dateISO8601(expiryDate),
      // picture: 'picture',
      author: 1, // assuming the author is a user with id 1
    };

    try {
      const response = await fetch(
        `${process.env.DEPLOYDOMAIN}/api/inventory`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(itemData),
        },
      );
      const bodyText = await response.text();
      try {
        const json = JSON.parse(bodyText);
        console.log(json);
      } catch (error) {
        console.error(
          'Received the following instead of valid JSON:',
          bodyText,
        );
      }
    } catch (e) {
      console.error('An error occurred while posting', e);
    }
  };
  const dataArray = [
    {
      name: 'name',
      value: name,
      label: 'Name',
      onChange: (e: any) => setName(e.target.value),
      type: 'string',
      required: true,
    },
    {
      name: 'brand',
      value: brand,
      label: 'Brand',
      onChange: (e: any) => setBrand(e.target.value),
      type: 'string',
      required: true,
    },
    {
      name: 'price',
      value: price,
      label: 'Price',
      onChange: (e: any) => setPrice(e.target.value),
      type: 'number',
      required: true,
    },
    {
      name: 'size',
      value: size,
      label: 'Size',
      onChange: (e: any) => setSize(e.target.value),
      type: 'string',
      required: true,
    },
    {
      name: 'quantity',
      value: quantity,
      label: 'Quantity',
      onChange: (e: any) => setQuantity(e.target.value),
      type: 'number',
      required: true,
    },
    {
      name: 'flavor',
      value: flavor,
      label: 'Flavor',
      onChange: (e: any) => setFlavor(e.target.value),
      type: 'string',
      required: true,
    },
    {
      name: 'expiryDate',
      value: expiryDate,
      label: 'Expiry Date',
      onChange: (e: any) => setExpiryDate(e.target.value),
      type: 'date',
      required: true,
    },
    {
      name: 'picture',
      value: picture,
      label: 'Picture',
      onChange: (e: any) => setPicture(e.target.value),
      type: 'file',
      required: false,
    },
  ];
  return (
    <>
      <div>update quantity</div>

      <form onSubmit={postData}>
        {dataArray.map((item) => (
          <InputProp
            key={item.name}
            label={item.label}
            type="text"
            id={item.name}
            placeholder={item.label}
            value={item.value}
            onChange={item.onChange}
            required={item.required}
          />
        ))}
        <button
          type="submit"
          className="relative inline-flex items-center justify-center p-0.5 m-4 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Add Item
          </span>
        </button>
      </form>
    </>
  );
};

export default AddForm;
