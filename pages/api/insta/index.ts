import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

async function handler(req: any, res: any) {
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
