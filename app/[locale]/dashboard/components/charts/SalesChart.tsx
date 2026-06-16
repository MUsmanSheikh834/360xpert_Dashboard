"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-md">
      <p className="mb-1 font-medium text-foreground">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="capitalize">
          {entry.name}: <span className="font-medium">{entry.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
}

export default function SalesChart({ className }: { className?: string }) {
  const { data, total } = useSelector((state: RootState) => state.dashboard.chart);
  const isLoading = useSelector((state: RootState) => state.dashboard.loading.chart);

  return (
    <div
      className={`rounded-xl border border-border bg-card p-5 h-full flex flex-col ${className ?? ""}`}
    >
      <h3 className="mb-4 text-base font-semibold text-card-foreground">
        Ticket Sale
        {total > 0 && (
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            {total.toLocaleString()} total
          </span>
        )}
      </h3>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          Loading...
        </div>
      ) : (
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              barCategoryGap="20%"
              barGap={4}
              margin={{ top: 4, right: 4, left: -20, bottom: -12 }}
            >
              <CartesianGrid vertical={false} horizontal={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 13, fill: "#6b7280" }}
                tickFormatter={(v) => (v === 0 ? `${v / 1000}` : `${v / 1000}K`)}
                ticks={[0, 10000, 20000, 30000]}
                domain={[0, 30000]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
              <Bar
                dataKey="hotels"
                name="hotels"
                stackId="bookings"
                fill="#a78bfa"
                radius={[0, 0, 7, 7]}
              />
              <Bar
                dataKey="flights"
                name="flights"
                stackId="bookings"
                fill="#2dd4bf"
                radius={[7, 7, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
