// BlogPerDayChart.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BlogChart = ({ data = [] }) => {
  // Aggregate data to count number of blogs per day
  const aggregatedData = data.reduce((acc, blog) => {
    const date = blog.createdAt.split("T")[0]; // Extracting date part
    acc[date] = acc[date] ? acc[date] + 1 : 1;
    return acc;
  }, {});

  // Convert aggregated data to array of objects
  const chartData = Object.keys(aggregatedData).map((date) => ({
    date,
    count: aggregatedData[date],
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BlogChart;
