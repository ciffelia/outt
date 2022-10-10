import type { NextApiRequest, NextApiResponse } from 'next';
import { search } from '@/koan/syllabus/search';

export default async (
  _req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const courses = await search({
    year: 2022,
    categoryId: '08', // 工学部
    name: '実験',
  });
  res.status(200).json(courses);
};
