import { DashboardJira } from '@/entities/dashboard-jira';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardJira>
) {
  let data = await fetch("https://eden-three.vercel.app/dashboard/jira").then((data) => data.json());

  let sub = data["History of the Last Fifty Incidents"]
  for(const el of ["None", "Major"]) {
    sub[el.toLowerCase()] = {
        name: el,
        Incident: sub[el.toLowerCase()][0],
        Resolved: sub[el.toLowerCase()][1],
    }
  }

  data["History of the Last Fifty Incidents"] = sub;

  console.log(data);

  res.status(200).json(data);
}
