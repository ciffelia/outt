import type { NextApiRequest, NextApiResponse } from 'next';
import { listCategory } from '@/koan/syllabus/category';

export default async (
  _req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const categories = await listCategory();
  res.status(200).json(categories);
};
