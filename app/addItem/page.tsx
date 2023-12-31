'use client';
import * as AWS from 'aws-sdk';

import Image from 'next/image';
import { useState } from 'react';
import dateISO8601 from '../functions/dateiso-8601';
import InputProp from '../component/inputProp';
import SubmitBTN from '../component/submitBTN';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import UploadBTN from '../component/UploadBtn';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

interface File {
  name: string;
  body: any;
}

const AddForm = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [flavor, setFlavor] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [imageURL, setImageURL] = useState('');
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
      picture: url,
      author: 1, // assuming the author is a user with id 1
    };

    try {
      const response = await fetch(`${process.env.DEPLOYDOMAIN}/api/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });
      if (response.ok) {
        toast.success('Item added successfully to the inventory! ', {
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
      const bodyText = await response.text();
      try {
        const json = JSON.parse(bodyText);
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
    // {
    //   name: 'picture',
    //   value: imageURL,
    //   label: 'Picture',
    //   onChange: (handleFileChange),
    //   type: 'file',
    //   required: false,
    // },
  ];
  // S3 upload
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>('');
  // Function to upload file to s3
  const uploadFile = async () => {
    const s3 = new S3Client({
      region: process.env.REGION!,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!,
      },
    });
    const params = {
      Bucket: process.env.BUCKET_NAME!,
      Key: file?.name,

      Body: file?.body,
    };
    // Uploading file to s3
    var upload = s3.send(new PutObjectCommand(params));
    //critical part of uploading to s3 depends on the name of the CORS configuration start
    const trimmedName = file?.name.replace(' ', '+');
    await upload
      .then((data: AWS.S3.PutObjectOutput) => {
        setUrl(
          `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${trimmedName}`,
        );
        //critical part end check in Firefox if CORS fails
        console.log(`File uploaded successfully at ${url}`);

        toast.success('File uploaded successfully.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
        });
      })
      .catch((err: AWS.AWSError) => {
        console.log(err);
        alert('Error uploading file.');
      });
  };
  // Function to handle file and store it to file state
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setFile({ name: file.name, body: file });
  };
  // s3 upload end
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
      <form onSubmit={postData}>
        {dataArray.map((item) => (
          <InputProp
            key={item.name}
            label={item.label}
            type={item.type}
            id={item.name}
            placeholder={item.label}
            value={item.value}
            onChange={item.onChange}
            required={item.required}
          />
        ))}
        {imageURL ? (
          <Image src={imageURL} alt="Uploaded Image" width={200} height={200} />
        ) : (
          <InputProp
            label="Picture"
            type="file"
            id="picture"
            placeholder="picture"
            onChange={handleFileChange}
            required={false}
          />
        )}

        <UploadBTN
          onClick={uploadFile}
          text="Upload Image"
          disabled={file === null}
        />
        <SubmitBTN />
      </form>
    </>
  );
};

export default AddForm;
