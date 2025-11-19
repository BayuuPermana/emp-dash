import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Plus, Trash2, Edit2, X } from 'lucide-react';

interface Employee {
    _id: string;
    name: string;
    email: string;
    position: string;
    department: string;
}

const EmployeeManagement: React.FC = () => {
    const { user } = useAuth();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        position: '',
        department: '',
        username: '',
        password: ''
    });

    useEffect(() => {
        fetchEmployees();
    }, [user]);

    const fetchEmployees = async () => {
        if (!user?.token) return;
        try {
            const response = await fetch('http://localhost:3001/api/employees', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await fetch(`http://localhost:3001/api/employees/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${user?.token}` }
            });
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/employees', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user?.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setIsModalOpen(false);
                setFormData({ name: '', email: '', position: '', department: '', username: '', password: '' });
                fetchEmployees();
            }
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Employee Management</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                        >
                            <Plus size={20} /> Add Employee
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Position</th>
                                    <th className="p-4">Department</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp) => (
                                    <tr key={emp._id} className="border-t hover:bg-gray-50">
                                        <td className="p-4 font-medium">{emp.name}</td>
                                        <td className="p-4 text-gray-600">{emp.email}</td>
                                        <td className="p-4 text-gray-600">{emp.position}</td>
                                        <td className="p-4 text-gray-600">{emp.department}</td>
                                        <td className="p-4 flex gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={18} /></button>
                                            <button onClick={() => handleDelete(emp._id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Add New Employee</h3>
                            <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                placeholder="Full Name"
                                className="w-full p-2 border rounded"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Email"
                                type="email"
                                className="w-full p-2 border rounded"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Position"
                                className="w-full p-2 border rounded"
                                value={formData.position}
                                onChange={e => setFormData({ ...formData, position: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Department"
                                className="w-full p-2 border rounded"
                                value={formData.department}
                                onChange={e => setFormData({ ...formData, department: e.target.value })}
                                required
                            />
                            <hr className="my-4" />
                            <p className="text-sm text-gray-500">Login Credentials</p>
                            <input
                                placeholder="Username"
                                className="w-full p-2 border rounded"
                                value={formData.username}
                                onChange={e => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Password"
                                type="password"
                                className="w-full p-2 border rounded"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                                Create Employee
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeManagement;
