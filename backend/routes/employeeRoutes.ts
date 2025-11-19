import express from 'express';
import Employee from '../models/Employee.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all employees
router.get('/', protect, admin, async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add employee
router.post('/', protect, admin, async (req, res) => {
    const { name, email, position, department, username, password } = req.body;

    try {
        const employeeExists = await Employee.findOne({ email });
        if (employeeExists) {
            res.status(400).json({ message: 'Employee already exists' });
            return;
        }

        const employee = new Employee({
            name,
            email,
            position,
            department,
        });

        const createdEmployee = await employee.save();

        // Create a user for the employee so they can login
        if (username && password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({
                username,
                password: hashedPassword,
                role: 'employee',
                employeeId: createdEmployee._id
            });
            await user.save();
        }

        res.status(201).json(createdEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update employee
router.put('/:id', protect, admin, async (req, res) => {
    const { name, email, position, department } = req.body;

    try {
        const employee = await Employee.findById(req.params.id);

        if (employee) {
            employee.name = name || employee.name;
            employee.email = email || employee.email;
            employee.position = position || employee.position;
            employee.department = department || employee.department;

            const updatedEmployee = await employee.save();
            res.json(updatedEmployee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete employee
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (employee) {
            await employee.deleteOne();
            // Also delete the associated user
            await User.deleteOne({ employeeId: req.params.id });
            res.json({ message: 'Employee removed' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
