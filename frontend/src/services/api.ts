import axios from "axios";

const API_URL = "http://localhost:5001/api";

export const signup = (username: string, password: string) => {
  return axios.post(`${API_URL}/auth/signup`, { username, password });
};

export const login = (username: string, password: string) => {
  return axios.post(`${API_URL}/auth/login`, { username, password });
};

export const fetchExpenses = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addExpense = (category: string, amount: number) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `${API_URL}/expense`,
    { category, amount },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const deleteExpense = (id: string) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${API_URL}/expense/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateExpense = (id: string, category: string, amount: number) => {
  const token = localStorage.getItem("token");
  return axios.put(
    `${API_URL}/expense/${id}`,
    { category, amount },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
