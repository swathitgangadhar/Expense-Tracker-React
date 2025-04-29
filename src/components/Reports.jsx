import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Reports = () => {
  const [data, setData] = useState({ income: [], expense: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/transactions");
      const income = res.data.filter((t) => t.type === "income");
      const expense = res.data.filter((t) => t.type === "expense");
      setData({ income, expense });
    };
    fetchData();
  }, []);

  const chartData = {
    labels: [...data.income.map((i) => i.category)],
    datasets: [
      {
        label: "Income",
        backgroundColor: "green",
        data: data.income.map((i) => i.amount),
      },
      {
        label: "Expense",
        backgroundColor: "red",
        data: data.expense.map((e) => e.amount),
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Monthly Reports</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default Reports;
