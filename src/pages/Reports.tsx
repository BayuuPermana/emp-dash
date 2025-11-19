import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface AttendanceRecord {
    _id: string;
    employeeId: {
        name: string;
        email: string;
    };
    date: string;
    clockIn: string;
    clockOut: string;
    status: string;
}

const Reports: React.FC = () => {
    const { user } = useAuth();
    const [reports, setReports] = useState<AttendanceRecord[]>([]);

    useEffect(() => {
        if (user?.token) {
            fetch('http://localhost:3001/api/attendance', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            })
                .then(res => res.json())
                .then(data => setReports(data))
                .catch(err => console.error(err));
        }
    }, [user]);

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Attendance Reports</h2>
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Employee</th>
                                    <th className="p-4">Clock In</th>
                                    <th className="p-4">Clock Out</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((record) => (
                                    <tr key={record._id} className="border-t hover:bg-gray-50">
                                        <td className="p-4 text-gray-600">{record.date}</td>
                                        <td className="p-4 font-medium">
                                            <div>{record.employeeId?.name || 'Unknown'}</div>
                                            <div className="text-sm text-gray-500">{record.employeeId?.email}</div>
                                        </td>
                                        <td className="p-4 text-gray-600">{record.clockIn || '-'}</td>
                                        <td className="p-4 text-gray-600">{record.clockOut || '-'}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-sm ${record.status === 'On Time' ? 'bg-green-100 text-green-800' :
                                                    record.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
