// src/types/Expense.ts
export interface Expense {
  _id: string;
  user: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}
