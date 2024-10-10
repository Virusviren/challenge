import React, { useState, useEffect } from "react";
import axios from "axios";
import { Expense } from "../types/Expense"; // Import the Expense type

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get("http://localhost:5001/api/expenses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setExpenses(data);
    console.log(data);
  };

  const addExpense = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5001/api/expense",
      { description, amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setDescription("");
    setAmount(0);
    fetchExpenses();
  };

  const deleteExpense = async (id: string) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5001/api/expense/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchExpenses();
  };

  const startEdit = (expense: Expense) => {
    setEditMode(true);
    setEditId(expense._id);
    setDescription(expense.description);
    setAmount(expense.amount);
  };

  const updateExpense = async () => {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:5001/api/expense/${editId}`,
      { description, amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setEditMode(false);
    setDescription("");
    setAmount(0);
    fetchExpenses();
  };

  return (
    <div>
      <h2>Expense Tracker</h2>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={editMode ? updateExpense : addExpense}>
        {editMode ? "Update Expense" : "Add Expense"}
      </button>

      <h3>Your Expenses</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            <strong>{expense.description}</strong> - ${expense.amount} <br />
            Created: {new Date(expense.date).toLocaleDateString()} <br />
            <button onClick={() => startEdit(expense)}>Edit</button>
            <button onClick={() => deleteExpense(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
