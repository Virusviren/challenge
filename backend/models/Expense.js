import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// Export the Expense model
const Expense = mongoose.model('Expense', ExpenseSchema);
export default Expense;
