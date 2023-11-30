export type DashboardAws = {
    "Incidents By Year": ({
        name: string;
        Incident: number;
    })[];
    "Incidents by Region": any[];
    "Total Incidents": number;
}