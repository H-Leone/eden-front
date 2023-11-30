"use client";

import ServicesNavigation from "@/components/services-navigation/services-navigation";
import getServiceName from "@/utils/get-service-name";
import Jira from "@/public/images/jira.svg";
import AWS from "@/public/images/aws.svg";
import Oracle from "@/public/images/oracle.svg";
import FilterInput from "@/components/filter-input/filter-input";
import StatusList from "@/components/status-list/status-list";
import { useEffect, useState } from "react";
import { getCitiesByService } from "@/utils/get-cities-by-service";
import { revalidatePath } from "next/cache";

type PageProps = {
    params: { service: string }
}

const services: { [key: string]: {
    name: string;
    source: string;
} } = {
    "aws": { name: "Amazon Web Services", source: AWS.src },
    "oracle": { name: "Oracle Cloud Infrastructure", source: Oracle.src },
    "jira": { name: "Jira Atlassian", source: Jira.src },
};

export type Mode = "reports" | "today"

function ServicePage({ params: { service } }: PageProps) {
    const [ filter, setFilter ] = useState("")
    const [ cityFilter, setCityFilter ] = useState("")
    const [ mode, setMode ] = useState<Mode>("today");
    const name = getServiceName(service);

    if(name === "Error") {
        return <span>Cannot get service info...</span>
    }

    return (
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 25,
            padding: 25,
            boxSizing: "border-box",
            color: "#FFFFFF"
        }}>
            <ServicesNavigation currentService={service} services={services} />
            <h1 style={{ margin: 0, textAlign: "center" }}>{name}</h1>
            <div style={{
                display: "flex",
                gap: 20,
            }}>
                <FilterInput value={filter} setValue={setFilter} width={230} />
                {getCitiesByService(service) && (
                    <select onChange={(e) => {
                        if(e.target.selectedIndex === 0) {
                            setCityFilter("");
                        } else {
                            setCityFilter(e.target.value);
                        } 
                    }}>
                        {getCitiesByService(service)?.map((el) => (
                            <option key={el}>{el}</option>
                        ))}
                    </select>
                )}
                {service === "aws" && (
                    <button onClick={() => {
                        setMode(mode === "today" ? "reports" : "today");
                    }}>{mode === "today" ? "Check last incidents" : "Go back to today’s report"}</button>
                )}
            </div>
            <StatusList cityFilter={cityFilter} filter={filter} service={service} mode={mode} />
        </div>
    );
}

export default ServicePage;