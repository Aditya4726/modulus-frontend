import { Activity, AlertCircle, AlertTriangle, CheckCircle, CheckCircle2, Circle, Eye, HeartPulse, KeyRound, LayoutDashboard, Loader, RotateCw, Settings, Stethoscope, Wrench, XCircle } from "lucide-react";

/** Icons used for execution status labels. */
export const executionIcons = { running: Loader, succeeded: CheckCircle2, failed: XCircle };
/** Icons used for incident severity labels. */
export const incidentSeverityIcons = { low: AlertTriangle, medium: AlertTriangle, high: AlertTriangle, critical: AlertTriangle };
/** Icons used for incident lifecycle status labels. */
export const incidentStatusIcons = { open: Circle, acknowledged: Eye, resolved: CheckCircle };
/** Icons used for diagnosis, reproduction, and fix actions. */
export const actionIcons = { diagnose: Stethoscope, reproduce: RotateCw, fix: Wrench };
/** Icons used by application navigation and settings surfaces. */
export const navIcons = { dashboard: LayoutDashboard, executions: Activity, incidents: AlertCircle, settings: Settings, github: Wrench, apiKeys: KeyRound, health: HeartPulse };