export interface DashboardMetrics {
	windowDays: number;
	executionVolume: number;
	successRate: number | null;
	incidents: {
		open: number;
		acknowledged: number;
		resolved: number;
	};
	pullRequests: {
		total: number;
		merged: number;
		acceptanceRate: number | null;
	};
	estimatedTimeSavedMinutes: number;
	assumptionNote: string;
	executionTrend?: Array<{ date: string; count: number }>;
	reliabilityTrend?: Array<{ date: string; value: number }>;
	statCards?: Array<{ key: string; label: string; value: string; delta: string; positive: boolean; color: string; sparkline: number[] }>;
	activeIncidents?: Array<{ title: string; subtitle: string; severity: "critical" | "warning" | "resolved"; time: string; status: string }>;
	agents?: Array<{ name: string; framework: string; status: "healthy" | "degraded" | "unhealthy"; percentage: number }>;
	failureCategories?: Array<{ name: string; percentage: number; color: string }>;
	activity?: Array<{ type: string; text: string; time: string }>;
}

export interface InternalDashboardMetrics {
	diagnosisCostUsd: number;
	diagnosisCacheHitRate: number | null;
	reproductionConfirmationRate: number | null;
	fixRiskDistribution: Record<string, number>;
	fixStatusFunnel: Record<string, number>;
}

export type DashboardStats = DashboardMetrics;