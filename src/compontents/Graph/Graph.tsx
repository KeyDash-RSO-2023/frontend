import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import "./Graph.css";

interface GraphProps {
  data: number[];
}
const Graph: React.FC<GraphProps> = ({ data }) => {
  const mappedData = data.map((wpm, index) => {
    return { name: 5 * index + "s", wpm: wpm.toFixed(0) };
  });
  console.log(data);
  console.log(mappedData);

  return (
    <LineChart width={500} height={225} data={mappedData} className="graph">
      {/* <CartesianGrid strokeDasharray="0 0" /> */}
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      {/* <Legend /> */}
      <Line
        type="monotone"
        dataKey="wpm"
        stroke="#e1b214"
        strokeWidth={3}
        dot={false}
      />
      <Line />
    </LineChart>
  );
};

export default Graph;
