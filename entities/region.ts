import { ServiceHealthReport } from "./service-health-report";

export type Region = {
    regionId: string;
    regionName: string;
    serviceHealthReports: ServiceHealthReport[];
}