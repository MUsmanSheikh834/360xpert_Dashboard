"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function ActivityChart() {
  const { data } = useSelector((state: RootState) => state.dashboard.pie);
  const isLoading = useSelector((state: RootState) => state.dashboard.loading.pie);

  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, outerRadius, index } = props;
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 18;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const xLine = cx + (outerRadius + 6) * Math.cos(-midAngle * RADIAN);
    const yLine = cy + (outerRadius + 6) * Math.sin(-midAngle * RADIAN);
    const value = data[index]?.value;
    const color = data[index]?.color;

    return (
      <g>
        <path
          d={`M${cx + (outerRadius - 2) * Math.cos(-midAngle * RADIAN)},${
            cy + (outerRadius - 2) * Math.sin(-midAngle * RADIAN)
          } L${xLine} ${yLine} L${x} ${y}`}
          stroke={color}
          fill="none"
        />
        <circle cx={x} cy={y} r={3} fill={color} />
        <text
          x={x > cx ? x + 6 : x - 6}
          y={y}
          fill={color}
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fontSize={12}
          fontWeight={500}
        >
          {value}%
        </text>
      </g>
    );
  };

  return (
    <div
      className="rounded-xl border bg-card p-5"
      style={{ height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}
    >
      <h3 className="mb-4 text-base font-semibold">Status Report</h3>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          Loading...
        </div>
      ) : (
        <>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={3}
                  startAngle={90}
                  endAngle={-270}
                  label={renderCustomizedLabel}
                  labelLine={false}
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              marginTop: "12px",
            }}
          >
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color, flexShrink: 0 }}
                />
                <span className="text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
