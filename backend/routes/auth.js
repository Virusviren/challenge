import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js'; // Ensure the path is correct

const router = express.Router();

// Sign up
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    console.log(username);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    try {
        await user.save();
        res.status(201).send('User created');
    } catch (error) {
        res.status(400).send('Error creating user: ' + error.message);
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    res.send('Logged in successfully');
});

// Export the router
export default router;
