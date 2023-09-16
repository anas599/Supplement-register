'use client';
import { useState, useEffect } from 'react';
import dateISO8601 from '../functions/dateiso-8601';
import handle from '@/pages/api/inventory';
import InputProp from '../component/inputProp';
import { tr } from 'date-fns/locale';
const AddForm = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [flavor, setFlavor] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [picture, setPicture] = useState('');

  const handelChange = (e) => {
    console.log(e.target.value);
  };

  const postData = async (event) => {
    event.preventDefault(); // Prevent page refresh

    const itemData = {
      name: name,
      brand: brand,
      size: size,
      price: parseInt(price),
      quantity: parseInt(quantity),
      flavor: flavor,
      expiry: dateISO8601(expiryDate),
      picture: picture,
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
  return (
    <>
      <div>update quantity</div>
      <form onSubmit={postData}>
        <InputProp
          label="Item Name"
          type="text"
          id="item-name"
          placeholder="Item Name"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          required={true}
        />
        <InputProp
          label="Brand"
          type="text"
          id="Brand"
          placeholder="Brand"
          value={brand}
          onChange={(e: any) => setBrand(e.target.value)}
          required={true}
        />
        <InputProp
          label="Price"
          type="number"
          id="item-price"
          placeholder="Price"
          value={price}
          onChange={(e: any) => setPrice(e.target.value)}
          required={true}
        />
        <InputProp
          label="Size eg. 1kg, 1L, 1m"
          type="text"
          id="item-size"
          placeholder="Size eg. 1kg, 1L, 1m"
          value={size}
          onChange={(e: any) => setSize(e.target.value)}
          required={true}
        />
        <InputProp
          label="Quantity"
          type="number"
          id="item-quantity"
          placeholder="Quantity"
          value={quantity}
          onChange={(e: any) => setQuantity(e.target.value)}
          required={true}
        />
        <InputProp
          label="Flavor"
          type="text"
          id="Flavor"
          placeholder="Flavor"
          value={flavor}
          onChange={(e: any) => setFlavor(e.target.value)}
          required={true}
        />
        <InputProp
          label="expiry date"
          type="date"
          id="expiry-date"
          placeholder="expiry date"
          value={expiryDate}
          onChange={(e: any) => setExpiryDate(e.target.value)}
          required={true}
        />
        <InputProp
          label="picture"
          type="file"
          id="picture"
          placeholder="picture"
          value={picture}
          onChange={(e: any) => setPicture(e.target.value)}
          required={false}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Item
        </button>
      </form>
    </>
  );
};

export default AddForm;
