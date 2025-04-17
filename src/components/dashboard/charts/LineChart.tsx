
import { ResponsiveLine } from "@nivo/line";

export interface LineChartData {
  id: string;
  color?: string;
  data: Array<{
    x: string | number;
    y: number;
  }>;
}

interface LineChartProps {
  data: LineChartData[];
  height?: number;
  yAxisLabel?: string;
  xAxisLabel?: string;
}

export function LineChart({ data, height = 300, yAxisLabel, xAxisLabel }: LineChartProps) {
  return (
    <div style={{ height }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        curve="natural"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: xAxisLabel || "",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: yAxisLabel || "",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={{ scheme: "category10" }}
        lineWidth={3}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.1}
        useMesh={true}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 50,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
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
