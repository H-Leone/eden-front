import { DashboardOracle } from '@/entities/dashboard-oracle';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardOracle>
) {
  let data = await fetch("https://eden-front.vercel.app/dashboard/oci").then((data) => data.json());
  
  res.status(200).json(data);
}
