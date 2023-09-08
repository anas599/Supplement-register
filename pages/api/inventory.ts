import { prisma } from '@/lib/prisma';
export default async function handle(req: any, res: any) {
  if (req.method === 'GET') {
    const inv = await prisma.inventory.findMany({});
    res.json(inv);
  }
}
