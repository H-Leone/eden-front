type Inc = {
    Incident: number;
    Resolved: number;
}

export type DashboardJira = {
    "Jira Server Health": {
        Operational: number;
        Outage: number;
    },
    "History of the Last Fifty Incidents": {
        none: Inc;
        major: Inc;
        "Total of Incidents": number;
        "Total of Incidents Resolved": number;
    }
}