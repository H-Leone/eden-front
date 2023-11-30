import { Region } from '@/entities/region';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Region[]>
) {
  const { regionHealthReports } = await fetch("https://ocistatus.oraclecloud.com/api/v2/components_v2.json").then((data) => data.json());

  res.status(200).json(regionHealthReports);
}
