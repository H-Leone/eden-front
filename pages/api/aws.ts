import { AmazonService } from '@/entities/amazon-service';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AmazonService[]>
) {
  const data = await fetch("https://di1pzre3hzbi4.cloudfront.net/services.json").then((data) => data.json());

  res.status(200).json((data).sort((a: AmazonService, b: AmazonService) => b.launch_date - a.launch_date));
}
