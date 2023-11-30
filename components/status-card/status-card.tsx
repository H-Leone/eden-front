"use client";

import { ServiceHealthReport } from "@/entities/service-health-report";
import getRegionName from "@/utils/get-region-name";
import { StyledStatusCard } from "./status-card.style";
import X from "@/public/images/x.svg";
import Check from "@/public/images/check.svg";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { JiraService } from "@/entities/jira-service";
import { AmazonService } from "@/entities/amazon-service";

interface Props {
  region?: string;
}

function StatusCard({
  region,
  ...props
}: (ServiceHealthReport | JiraService | AmazonService) & Props) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const toggleInfoOpen = () => {
    setIsInfoOpen((prevIsInfoOpen) => !prevIsInfoOpen);
  };

  if (
    (props as JiraService).jiraServiceName &&
    (props as JiraService).jiraServiceStatus
  ) {
    return (
      <StyledStatusCard onClick={toggleInfoOpen} isInfoOpen={isInfoOpen}>
        <section>
          <div>
            <span>
              <Image
                src={
                  (props as JiraService).jiraServiceStatus === "Operational"
                    ? Check.src
                    : X.src
                }
                alt="Status Icon"
                width={20}
                height={20}
              />
            </span>
            <p>{(props as JiraService).jiraServiceName}</p>
          </div>
          <ChevronDown size={20} />
        </section>
        {isInfoOpen && (
          <div>
            <p>
              <strong>Status: </strong>
              <span
                style={{
                  color:
                    (props as JiraService).jiraServiceStatus === "Operational"
                      ? "green"
                      : "red",
                }}
              >
                {" "}
                {(props as JiraService).jiraServiceStatus === "Operational"
                  ? "Operational"
                  : "Operational Issue"}
              </span>
            </p>
          </div>
        )}
      </StyledStatusCard>
    );
  } else if ((props as ServiceHealthReport).serviceId && region) {
    return (
      <StyledStatusCard onClick={toggleInfoOpen} isInfoOpen={isInfoOpen}>
        <section>
          <div>
            <span>
              <Image
                src={
                  (props as ServiceHealthReport).serviceStatus ===
                  "NormalPerformance"
                    ? Check.src
                    : X.src
                }
                alt="Status Icon"
                width={20}
                height={20}
              />
            </span>
            <p>
              {(props as ServiceHealthReport).serviceName}{" "}
              <span>({getRegionName(region)})</span>
            </p>
          </div>
          <ChevronDown size={20} />
        </section>
        {isInfoOpen && (
          <div>
            <p>
              <strong>Category: </strong>{" "}
              {(props as ServiceHealthReport).serviceCategoryName}
            </p>
            <p>
              <strong>Status: </strong>
              <span
                style={{
                  color:
                    (props as ServiceHealthReport).serviceStatus ===
                    "NormalPerformance"
                      ? "green"
                      : "red",
                }}
              >
                {" "}
                {(props as ServiceHealthReport).serviceStatus ===
                "NormalPerformance"
                  ? "Operational"
                  : "Operational Issue"}
              </span>
            </p>
          </div>
        )}
      </StyledStatusCard>
    );
  } else if (
    (props as AmazonService).service_name &&
    (props as AmazonService).region_id
  ) {
    return (
      <StyledStatusCard onClick={toggleInfoOpen} isInfoOpen={isInfoOpen}>
        <section>
          <div>
            <span>
              <Image
                src={X.src}
                alt="Status Icon"
                width={20}
                height={20}
              />
            </span>
            <p>{(props as AmazonService).service_name}</p>
          </div>
          <ChevronDown size={20} />
        </section>
        {isInfoOpen && (
          <div>
            <p>
              <strong>Região: </strong>
              <span>
                {" "}
                {(props as AmazonService).region_name}
              </span>
            </p>
            <p>
              <strong>Data: </strong>
              <span>
                {" "}
                {new Date((props as AmazonService).launch_date * 1000).toLocaleDateString()}
              </span>
            </p>
          </div>
        )}
      </StyledStatusCard>
    );
  }

  return <p>oi</p>;
}

export default StatusCard;
