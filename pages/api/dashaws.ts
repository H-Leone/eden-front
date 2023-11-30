import { AmazonService } from '@/entities/amazon-service';
import { DashboardAws } from '@/entities/dashboard-aws';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardAws>
) {
  let data = await fetch("https://eden-front.vercel.app/dashboard/aws").then((data) => data.json());

  data['Incidents by Region'] = data['Incidents by Region'].map((el: any) => {
    return ({
        name: el[0],
        Incidents: el[1]
    })
  })

  data['Incidents By Year'] = Object.entries(data['Incidents By Year']).map(([key, value]) => ({
    name: key,
    Incidents: value,
  }))

  res.status(200).json(data);
}
