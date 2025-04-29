import React, { useState } from "react";
import axios from "axios";

const AddTransaction = ({ onAdd }) => {
  const [transaction, setTransaction] = useState({
    type: "income",
    category: "",
    amount: "",
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/transactions", transaction);
      onAdd(res.data);
      setTransaction({ type: "income", category: "", amount: "" });
    } catch (error) {
      alert("Failed to add transaction");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        name="type"
        value={transaction.type}
        onChange={handleChange}
        className="input"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        name="category"
        value={transaction.category}
        onChange={handleChange}
        className="input"
        placeholder="Category"
        required
      />
      <input
        type="number"
        name="amount"
        value={transaction.amount}
        onChange={handleChange}
        className="input"
        placeholder="Amount"
        required
      />
      <button type="submit" className="btn w-full">
        Add Transaction
      </button>
    </form>
  );
};

export default AddTransaction;
