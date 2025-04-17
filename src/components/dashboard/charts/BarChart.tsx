
import { ResponsiveBar } from "@nivo/bar";

export interface BarChartData {
  [key: string]: string | number;
}

interface BarChartProps {
  data: BarChartData[];
  keys: string[];
  indexBy: string;
  height?: number;
  colors?: string[];
  axisBottomLabel?: string;
  axisLeftLabel?: string;
  groupMode?: "grouped" | "stacked";
}

export function BarChart({
  data,
  keys,
  indexBy,
  height = 300,
  colors,
  axisBottomLabel,
  axisLeftLabel,
  groupMode = "grouped",
}: BarChartProps) {
  return (
    <div style={{ height }}>
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode={groupMode}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={colors || { scheme: "category10" }}
        borderRadius={4}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: axisBottomLabel || "",
          legendPosition: "middle",
          legendOffset: 36,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: axisLeftLabel || "",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 3]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 50,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 12,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        theme={{
          axis: {
            ticks: {
              text: {
                fontSize: 12,
                fill: "#64748b",
              },
            },
            legend: {
              text: {
                fontSize: 12,
                fill: "#64748b",
              },
            },
          },
          grid: {
            line: {
              stroke: "#e2e8f0",
              strokeWidth: 1,
            },
          },
          legends: {
            text: {
              fontSize: 12,
              fill: "#64748b",
            },
          },
          tooltip: {
            container: {
              background: "#ffffff",
              fontSize: 12,
              borderRadius: 6,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            },
          },
        }}
      />
    </div>
  );
}
