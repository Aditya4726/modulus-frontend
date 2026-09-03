"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  Bot,
  AlertTriangle,
  Play,
  Wrench,
  BarChart3,
  GitPullRequest,
  ShieldCheck,
  FolderKanban,
  Plug,
  KeyRound,
  FileText,
  CreditCard,
  Settings,
  Users,
  ChevronDown,
  Radar,
} from "lucide-react";

const navigation = [
  {
    title: "OVERVIEW",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Reliability",
        href: "/reliability",
        icon: Activity,
      },
    ],
  },
  {
    title: "OBSERVABILITY",
    items: [
      {
        label: "Agents",
        href: "/dashboard/agents",
        icon: Bot,
      },
      {
        label: "Executions",
        href: "/dashboard/executions",
        icon: Play,
      },
      {
        label: "Incidents",
        href: "/incidents",
        icon: AlertTriangle,
      },
      {
        label: "Analytics",
        href: "/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "REMEDIATION",
    items: [
      {
        label: "Remediation",
        href: "/remediation",
        icon: Wrench,
      },
      {
        label: "Approvals",
        href: "/approvals",
        icon: GitPullRequest,
      },
    ],
  },
  {
    title: "PLATFORM",
    items: [
      {
        label: "Projects",
        href: "/projects",
        icon: FolderKanban,
      },
      {
        label: "Integrations",
        href: "/integrations",
        icon: Plug,
      },
      {
        label: "API Keys",
        href: "/api-keys",
        icon: KeyRound,
      },
      {
        label: "Audit Logs",
        href: "/audit-logs",
        icon: FileText,
      },
      {
        label: "Usage & Billing",
        href: "/usage",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      {
        label: "Organization",
        href: "/settings/organization",
        icon: Users,
      },
      {
        label: "Security",
        href: "/settings/security",
        icon: ShieldCheck,
      },
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-62.5 flex-col border-r border-slate-200 bg-white">
      
      {/* Logo */}
      <div className="flex h-17 items-center border-b border-slate-200 px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
            <Radar
              className="h-4.5 w-4.5 text-white"
              strokeWidth={2.4}
            />
          </div>

          <div>
            <div className="text-[16px] font-extrabold tracking-tight text-slate-900">
              Modulus
            </div>

            <div className="text-[9px] font-medium text-slate-400">
              AI RELIABILITY
            </div>
          </div>
        </div>
      </div>

      {/* Workspace */}
      <div className="border-b border-slate-100 px-4 py-3">
        <button className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-left hover:bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-xs font-bold text-blue-600">
              M
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-800">
                Modulus
              </p>
              <p className="text-[10px] text-slate-400">
                Workspace
              </p>
            </div>
          </div>

          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navigation.map((section) => (
          <div key={section.title} className="mb-5">
            <p className="mb-2 px-2 text-[9px] font-bold tracking-[0.08em] text-slate-400">
              {section.title}
            </p>

            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;

                const active =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition",
                      active
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800",
                    ].join(" ")}
                  >
                    <Icon
                      className={[
                        "h-4 w-4",
                        active
                          ? "text-blue-600"
                          : "text-slate-400 group-hover:text-slate-600",
                      ].join(" ")}
                      strokeWidth={2}
                    />

                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-slate-200 p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            AS
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-800">
              Aditya Samanta
            </p>

            <p className="truncate text-[10px] text-slate-400">
              Administrator
            </p>
          </div>

          <Settings className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </aside>
  );
}