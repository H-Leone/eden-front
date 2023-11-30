"use client";

import ServicesNavigation from "@/components/services-navigation/services-navigation";
import Jira from "@/public/images/jira.svg";
import AWS from "@/public/images/aws.svg";
import Oracle from "@/public/images/oracle.svg";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
  LineChart,
  Line,
} from "recharts";
import { useEffect, useState } from "react";
import { DashboardAws } from "@/entities/dashboard-aws";
import InfoCard from "@/components/info-card/info-card";
import { DashboardJira } from "@/entities/dashboard-jira";
import { DashboardOracle } from "@/entities/dashboard-oracle";

const services: {
  [key: string]: {
    name: string;
    source: string;
  };
} = {
  aws: { name: "aws", source: AWS.src },
  oracle: { name: "oracle", source: Oracle.src },
  jira: { name: "jira", source: Jira.src },
};

function DashboardsPage() {
  const [service, setService] = useState<{
    name: string;
    source: string;
  }>({
    name: "aws",
    source: AWS.src,
  });
  const [data, setData] = useState<unknown>();

  const url = () => {
    switch (service?.name) {
      case "oracle":
        return "https://eden-three.vercel.app/api/dashoracle";
      case "jira":
        return "https://eden-three.vercel.app/api/dashjira";
      case "aws":
        return "https://eden-three.vercel.app/api/dashaws";
      default:
        return "https://eden-three.vercel.app/api/error";
    }
  };

  useEffect(() => {
    async function fetchData() {
      const payload = await fetch(url(), {
        method: "GET",
        next: {
          revalidate: 2,
        },
      }).then((data) => data.json());
      setData(payload);
    }
    fetchData();
  }, [service, url()]);

  if ((data as DashboardAws) && service.name === "aws") {
    return (
      <div
        style={{
          padding: 25.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ServicesNavigation click={(el) => {
            setService(el);
        }} currentService={service.name} services={services} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            gap: 30,
            marginTop: 35,
          }}
        >
          <InfoCard
            name="Incidentes Totais"
            amount={(data as DashboardAws)["Total Incidents"]}
          />
          <section>
            <h2 style={{ margin: 0, textAlign: "center", color: "#FFFFFF" }}>
              Incidents by Region
            </h2>
            <BarChart
              width={500}
              height={300}
              data={(data as DashboardAws)["Incidents by Region"]}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="Incidents"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </section>
          <section>
            <h2 style={{ margin: 0, textAlign: "center", color: "#FFFFFF" }}>
              Incidents by Year
            </h2>
            <LineChart
              width={500}
              height={300}
              data={(data as DashboardAws)["Incidents By Year"]}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Incidents" stroke="#82ca9d" />
            </LineChart>
          </section>
        </div>
      </div>
    );
  } else if ((data as DashboardJira) && service.name === "jira") {
    var totalOfIncidents: number;
    var totalOfResolved: number;
    try {
        totalOfIncidents = (data as DashboardJira)["History of the Last Fifty Incidents"][
            "Total of Incidents"
          ] | 0;
        totalOfResolved = (data as DashboardJira)["History of the Last Fifty Incidents"][
            "Total of Incidents Resolved"
          ] | 0;
    } catch {
        console.log("Got an error");
        return <></>;
    }

    return (
      <div
        style={{
          padding: 25.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ServicesNavigation click={(el) => {
            setService(el);
        }} currentService={service.name} services={services} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            gap: 30,
            marginTop: 35,
          }}
        >
          <InfoCard
            name="Total Incidents"
            amount={totalOfIncidents}
          />
          <InfoCard
            name="Incidents Resolved"
            amount={totalOfResolved}
          />
          <section>
            <h2 style={{ margin: 0, textAlign: "center", color: "#FFFFFF" }}>
              Incident Impact Rate
            </h2>
            <BarChart
              width={425}
              height={300}
              data={[
                (data as DashboardJira)["History of the Last Fifty Incidents"][
                  "none"
                ],
                (data as DashboardJira)["History of the Last Fifty Incidents"][
                  "major"
                ],
              ]}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="Incident"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="Resolved"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </section>

          <section>
            <h2 style={{ margin: 0, textAlign: "center", color: "#FFFFFF" }}>
              Operational Services
            </h2>
            <BarChart
              width={425}
              height={300}
              data={[(data as DashboardJira)["Jira Server Health"]]}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="Operational"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="Outage"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </section>
        </div>
      </div>
    );
  } else if ((data as DashboardOracle) && service.name === "oracle") {
    return (
      <div
        style={{
          padding: 25.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ServicesNavigation click={(el) => {
            setService(el);
        }} currentService={service.name} services={services} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            gap: 30,
            marginTop: 35,
          }}
        >
          <InfoCard
            name="Serviços Operacionais"
            amount={(data as DashboardOracle)["Normal Performance services"]}
          />
          <InfoCard
            name="Serviços Não Operacionais"
            amount={
              (data as DashboardOracle)["Not Normal Performance services"]
            }
          />
        </div>
      </div>
    );
  }

  return <div></div>;
}

export default DashboardsPage;
