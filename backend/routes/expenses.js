import express from 'express';
import Expense from '../models/Expense.js'; // Note the .js extension
const router = express.Router();

// Get all expenses
router.get('/', async (req, res) => {
  console.log("Fetching all expenses");
  try {
    const expenses = await Expense.find(); // Fetch all expenses
    res.json(expenses);
  } catch (error) {
    res.status(400).send('Error fetching expenses: ' + error.message);
  }
});

// Add a new expense
router.post('/', async (req, res) => {
  const { user, description, amount } = req.body; // Expect user to be included in request

  const expense = new Expense({ user, description, amount });

  try {
    await expense.save();
    res.status(201).send('Expense added');
  } catch (error) {
    res.status(400).send('Error adding expense: ' + error.message);
  }
});

// Update an existing expense
router.put('/:id', async (req, res) => {
  const { description, amount } = req.body;
  const { id } = req.params;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { description, amount },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedExpense) {
      return res.status(404).send('Expense not found');
    }

    res.json(updatedExpense); // Send the updated expense back as a response
  } catch (error) {
    res.status(400).send('Error updating expense: ' + error.message);
  }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).send('Expense not found');
    }

    res.send('Expense deleted'); // Send a success message
  } catch (error) {
    res.status(400).send('Error deleting expense: ' + error.message);
  }
});

// Export the router
export default router;
