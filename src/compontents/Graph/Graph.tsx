import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import "./Graph.css";

interface GraphProps {
  data?: number[];
  time_data?: wpmTime[];
  int?: boolean;
  type: "ts" | "profile";
  color?: string;
}
const Graph: React.FC<GraphProps> = ({ data, time_data, int, type, color }) => {
  let mappedData;

  if (type == "ts") {
    mappedData = data.map((wpm, index) => {
      return { name: 5 * index + "s", wpm: Number(wpm.toFixed(0)) };
    });
  } else if (type == "profile") {
    mappedData = time_data.map((record) => {
      if (record.wpm == null) {
        return { name: record.time, wpm: 0 };
      }
      return { name: record.time, wpm: int ? Number(record.wpm.toFixed(0)) : record.wpm };
    });
  }

  return (
    <LineChart width={550} height={225} data={mappedData} className="graph">
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="wpm"
        stroke={color ? color : "#e1b214"}
        strokeWidth={3}
        dot={false}
      />
      <Line />
    </LineChart>
  );
};

export default Graph;

interface wpmTime {
  wpm: number;
  time: number;
}
