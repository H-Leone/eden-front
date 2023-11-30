import { JiraService } from '@/entities/jira-service';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JiraService[]>
) {
  const data = await fetch("https://eden-front.vercel.app/status/jira").then((data) => data.json());

  const r = data.map((el: any) => ({
    jiraServiceName: el[0],
    jiraServiceStatus: el[1],
  }));

  res.status(200).json(r);
}
