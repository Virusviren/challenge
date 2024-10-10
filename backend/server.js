import express from 'express';
import connectDB from './config/db.js'; // Use .js extension
import cors from 'cors';
import authRoutes from './routes/auth.js'; // Use .js extension
import expenseRoutes from './routes/expenses.js'; // Use .js extension
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
