import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);

// Seed Admin User
const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);

      const adminUser = new User({
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
      });

      await adminUser.save();
      console.log('Admin user created: admin / admin123');
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};

seedAdmin();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
