// 'use client';
// import AWS from 'aws-sdk';
// import { url } from 'inspector';
// import { useState } from 'react';
// interface File {
//   name: string;
//   body: any;
// }

// function UploadS3() {
//   const [file, setFile] = useState<File | null>(null);
//   const [url, setUrl] = useState<string>('');
//   // Function to upload file to s3
//   const uploadFile = async () => {
//     AWS.config.update({
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//     });
//     const s3 = new AWS.S3({
//       params: { Bucket: process.env.AWS_BUCKET_NAME! },
//       region: process.env.AWS_REGION!,
//     });

//     // Files Parameters

//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME!,
//       Key: file?.name!,

//       Body: file?.body!,
//     };
//     // Uploading file to s3
//     var upload = s3
//       .putObject(params)
//       .on('httpUploadProgress', (evt) => {
//         console.log(
//           'Uploading ' +
//             parseInt(((evt.loaded * 100) / evt.total).toString()) +
//             '%',
//         );
//       })
//       .promise();
//     const trimmedName = file?.name.replace(' ', '+');
//     await upload
//       .then((data: AWS.S3.PutObjectOutput) => {
//         setUrl(
//           `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${trimmedName}`,
//         );
//         // console.log(`File uploaded successfully at ${url}`);

//         alert('File uploaded successfully.');
//       })
//       .catch((err: AWS.AWSError) => {
//         console.log(err);
//         alert('Error uploading file.');
//       });
//   };
//   // Function to handle file and store it to file state
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files![0];
//     setFile({ name: file.name, body: file });
//   };
//   return (
//     <div className="App">
//       <div>
//         <input type="file" onChange={handleFileChange} />
//         <button onClick={uploadFile}>Upload</button>
//         <input type="text" value={url} className="text-red-700" />
//       </div>
//     </div>
//   );
// }

// export default UploadS3;
