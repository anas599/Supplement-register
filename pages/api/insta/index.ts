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
}
export default handler;
