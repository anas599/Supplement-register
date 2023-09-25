'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import dateISO8601 from '../functions/dateiso-8601';
import InputProp from '../component/inputProp';
import SubmitBTN from '../component/submitBTN';
import AWS from 'aws-sdk';
import UploadBTN from '../component/UploadBtn';
import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastContainer } from 'react-toastify';

// import UploadS3 from '../aws/page';
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
  const [picture, setPicture] = useState('');

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
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    });
    const s3 = new AWS.S3({
      params: { Bucket: process.env.AWS_BUCKET_NAME! },
      region: process.env.AWS_REGION!,
    });

    // Files Parameters

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: file?.name,

      Body: file?.body,
    };
    // Uploading file to s3
    var upload = s3
      .putObject(params)
      .on('httpUploadProgress', (evt) => {
        console.log(
          'Uploading ' +
            parseInt(((evt.loaded * 100) / evt.total).toString()) +
            '%',
        );
      })
      .promise();
    const trimmedName = file?.name.replace(' ', '+');
    await upload
      .then((data: AWS.S3.PutObjectOutput) => {
        setUrl(
          `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${trimmedName}`,
        );
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
      <div>update quantity</div>
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

        <UploadBTN onClick={uploadFile} text="Upload Image" />
        <SubmitBTN />
      </form>
      {/* <button onClick={uploadFile}>Upload</button> */}
    </>
  );
};

export default AddForm;
