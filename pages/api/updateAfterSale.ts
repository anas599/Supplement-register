import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

async function updateAfterSale(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const uniqueItemsMap = req.body.uniqueItemsMap;
      let response = [];

      for (let [id, quantity] of uniqueItemsMap) {
        const inv = await prisma.inventory.update({
          where: {
            id: id,
          },
          data: {
            quantity: {
              decrement: quantity,
            },
          },
        });
        response.push(inv);
      }

      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default updateAfterSale;
