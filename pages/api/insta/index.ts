// @ts-nocheck
   import { prisma } from '@/lib/prisma';
   import Cors from 'cors';

   // Initialize the cors middleware
   const cors = Cors({
     methods: ['GET', 'HEAD', 'POST'],
   });

   function runMiddleware(req, res, fn) {
     return new Promise((resolve, reject) => {
       fn(req, res, (result) => {
         if (result instanceof Error) {
           return reject(result);
         }
         return resolve(result);
       });
     });
   }

   async function handler(req, res) {
     // Run the middleware
     await runMiddleware(req, res, cors);

     if (req.method === 'GET') {
       try {
         const inv = await prisma.insta.findMany({});
         res.json(inv);
       } catch (err) {
         res.status(500).json({ error: 'Something went wrong' });
       }
     }

     if(req.method === 'POST'){
       try {
         const {count} = req.body;
         const inv = await prisma.insta.update({
           where: {id: 1},
           data: {count: count}
         });
         res.json(inv);
       } catch (err) {
         res.status(500).json({ error: 'Something went wrong' });
       }
     }
   }

   export default handler;
