import { FailureTrends } from "../../components/dashboard/failure-trends";
import { HealthMonitor } from "../../components/dashboard/health-monitor";
import { IncidentAnalytics } from "../../components/dashboard/incident-analytics";
import { DoraMetrics } from "../../components/dashboard/dora-metrics";
export default function DashboardPage() {
  return (
    <>
      <FailureTrends />
      <HealthMonitor />
       <IncidentAnalytics />
       <DoraMetrics/>
    </>
  );
}