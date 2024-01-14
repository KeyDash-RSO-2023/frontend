import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import "./Graph.css";

interface GraphProps {
  data: number[];
  type: "ts" | "profile";
  color?: string;
}
const Graph: React.FC<GraphProps> = ({ data, type, color }) => {
  let mappedData;

  if (type == "ts") {
    mappedData = data.map((wpm, index) => {
      return { name: 5 * index + "s", wpm: Number(wpm.toFixed(0)) };
    });
  } else if (type == "profile") {
    // todo
  }
  console.log(data);
  console.log(mappedData);

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
