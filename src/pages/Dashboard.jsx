import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("/api/transactions", {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then(res => res.json())
      .then(data => setTransactions(data));
  }, []);

  useEffect(() => {
    const ctx = document.getElementById("expenseChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: transactions.map(t => t.category),
        datasets: [{
          label: "Amount",
          data: transactions.map(t => t.amount),
          backgroundColor: "#60a5fa",
        }],
      },
    });
  }, [transactions]);

  return (
    <div className="p-4">
      <canvas id="expenseChart" height="100"></canvas>
    </div>
  );
}

export default Dashboard;