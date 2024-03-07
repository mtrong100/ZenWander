import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ViewChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="createdAt" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="views"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ViewChart;
