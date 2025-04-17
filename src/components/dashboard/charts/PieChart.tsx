
import { ResponsivePie } from "@nivo/pie";

export interface PieChartData {
  id: string;
  label: string;
  value: number;
  color?: string;
}

interface PieChartProps {
  data: PieChartData[];
  height?: number;
  colors?: string[];
  innerRadius?: number;
  padAngle?: number;
  cornerRadius?: number;
  enableArcLabels?: boolean;
  enableArcLinkLabels?: boolean;
}

export function PieChart({
  data,
  height = 300,
  colors,
  innerRadius = 0.5,
  padAngle = 0.7,
  cornerRadius = 4,
  enableArcLabels = true,
  enableArcLinkLabels = true,
}: PieChartProps) {
  return (
    <div style={{ height }}>
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        innerRadius={innerRadius}
        padAngle={padAngle}
        cornerRadius={cornerRadius}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        colors={colors || { scheme: "category10" }}
        enableArcLabels={enableArcLabels}
        enableArcLinkLabels={enableArcLinkLabels}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 40,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
        theme={{
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
