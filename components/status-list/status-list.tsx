"use client";

import { Region } from "@/entities/region";
import StatusCard from "../status-card/status-card";
import { StyledStatusList } from "./status-list.style";
import { useEffect, useState } from "react";
import { JiraService } from "@/entities/jira-service";
import { AmazonService } from "@/entities/amazon-service";
import { isToday } from "@/utils/is-today";
import Image from "next/image";
import Nothing from "@/public/images/nothing.svg";
import { Mode } from "@/app/[service]/page";
import X from "@/public/images/x.svg";
import Check from "@/public/images/check.svg";

interface Props {
  filter: string;
  cityFilter: string;
  service: string;
  mode: Mode;
}

function StatusList({ filter, cityFilter, service, mode }: Props) {
  const [data, setData] = useState<unknown>();

  const url = () => {
    switch (service) {
      case "oracle":
        return "http://https://eden-three.vercel.app/api/oracle";
      case "jira":
        return "http://https://eden-three.vercel.app/api/jira";
      case "aws":
        return "http://https://eden-three.vercel.app/api/aws";
      default:
        return "http://https://eden-three.vercel.app/api/error";
    }
  };

  async function fetchData() {
    const payload = await fetch(url(), {
      method: "GET",
      next: {
        revalidate: 2,
      },
    }).then((data) => data.json());
    setData(payload);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (data === "Cannot fetch data") {
    return <span>Got an error!</span>;
  }

  if (
    Array.isArray(data) &&
    (data as Region[]).length &&
    (data as Region[])[0].regionId
  ) {
    return (
      <StyledStatusList>
        <div style={{ width: "100%" }}>
            <button onClick={fetchData}>Refresh Page</button>
        </div>
        {(data as Region[])
          .filter((el) =>
            cityFilter
              ? el.regionName.toLowerCase().includes(cityFilter.toLowerCase())
              : el.regionName.includes("Sao Paulo") ||
                el.regionName.includes("Vinhedo")
          )
          .map((el) => (
            <>\\
              {el.serviceHealthReports
                .filter((el) =>
                  el.serviceName.toLowerCase().includes(filter.toLowerCase())
                )
                .map((element) => (
                  <StatusCard
                    key={element.serviceId}
                    region={el.regionName}
                    {...element}
                  />
                ))}
            </>
          ))}
      </StyledStatusList>
    );
  } else if (
    Array.isArray(data) &&
    (data as JiraService[]).length &&
    (data as JiraService[])[0].jiraServiceName
  ) {
    return (
      <StyledStatusList>
        {(data as JiraService[])
          .filter((el) =>
            el.jiraServiceName.toLowerCase().includes(filter.toLowerCase())
          )
          .map((el) => (
            <StatusCard key={el.jiraServiceName} {...el} />
          ))}
      </StyledStatusList>
    );
  } else if (
    Array.isArray(data) &&
    (data as AmazonService[]).length &&
    (data as AmazonService[])[0].region_id
  ) {
    const issuesToday = [...(data as AmazonService[])].filter((el) =>
      isToday(el.launch_date)
    );

    return (
      <StyledStatusList>
        <div>
          <section>
            {mode === "today" && (
              <Image
                src={!issuesToday.length ? Check.src : X.src}
                alt="Status Icon"
                width={20}
                height={20}
              />
            )}
            <p>
              {mode === "reports"
                ? "You are checking the last incidents"
                : !issuesToday.length
                ? "No Issues Today"
                : "It looks like some services are down"}
            </p>
          </section>
          {!issuesToday.length && mode === "today" && (
            <Image
              src={Nothing.src}
              alt="Nothing to see"
              width={285}
              height={310}
            />
          )}
          <div>
              {mode === "today"
                ? issuesToday
                    .filter((el) =>
                      cityFilter
                        ? el.region_name && el.region_name
                            .toLowerCase()
                            .includes(cityFilter.toLowerCase())
                        : el.region_name && (el.region_name.includes("Sao Paulo") ||
                            el.region_name.includes("Vinhedo")) &&
                          el.service_name
                            .toLowerCase()
                            .includes(filter.toLowerCase())
                    )
                    .map((el) => <StatusCard key={el.service_name} {...el} />)
                : data
                    .filter((el) =>
                      cityFilter
                        ? el.region_name && el.region_name
                            .toLowerCase()
                            .includes(cityFilter.toLowerCase())
                        : el.region_name && (el.region_name.includes("Sao Paulo") ||
                            el.region_name.includes("Vinhedo")) &&
                          el.service_name
                            .toLowerCase()
                            .includes(filter.toLowerCase())
                    )
                    .map((el) => <StatusCard key={el.service_name} {...el} />)}
          </div>
        </div>
      </StyledStatusList>
    );
  }

  return <div></div>;
}

export default StatusList;
