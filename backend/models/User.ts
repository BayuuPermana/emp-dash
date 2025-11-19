import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'employee'], required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
