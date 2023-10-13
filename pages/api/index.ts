// import { prisma } from '@/lib/prisma';
// import { NextResponse } from 'next/server';

// async function handler(req: any, res: any) {
//   if (req.method === 'GET') {
//     try {
//       const inv = await prisma.inventory.findMany({});
//       res.json(inv);
//     } catch (err) {
//       res.status(500).json({ error: 'Something went wrong' });
//     }

//   }
//   if (req.method === 'POST') {
//     const {
//       name,
//       brand,
//       size,
//       price,
//       quantity,
//       expiry,
//       flavor,
//       picture,
//       author,
//     } = req.body;
//     const user1 = await prisma.user.findFirst({
//       where: {
//         id: 1,
//       },
//     });
//     // to make typescript happy and not raise and error for null
//     if (!user1) {
//       // Handle the case where user1 doesn't exist
//       res.status(404).json({ error: 'User1 not found' });
//       return;
//     }
//     const inv = await prisma.inventory.create({
//       data: {
//         author: {
//           connect: {
//             id: user1.id,
//           },
//         },
//         name,
//         brand,
//         size,
//         price,
//         quantity,
//         expiry,
//         flavor,
//         picture,
//       },
//     });
//     res.json(inv);
//   }
// }
// export default handler;
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const inv = await prisma.inventory.findMany({});
      res.json(inv);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
}
