import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { id: user._id, role: user.role, employeeId: user.employeeId },
                process.env.JWT_SECRET || 'supersecretkey123',
                { expiresIn: '30d' }
            );

            res.json({
                _id: user._id,
                username: user.username,
                role: user.role,
                employeeId: user.employeeId,
                token,
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
