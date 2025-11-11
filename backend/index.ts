import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const stats = {
  totalEmployees: 125,
  presentToday: 110,
  late: 8,
  onLeave: 7,
};

const employees = [
  { name: 'Olivia Rhye', clockIn: '09:02 AM', clockOut: '05:05 PM', totalHours: '8h 3m', status: 'On Time' },
  { name: 'Phoenix Baker', clockIn: '09:17 AM', clockOut: '05:01 PM', totalHours: '7h 44m', status: 'Late' },
  { name: 'Lana Steiner', clockIn: '08:55 AM', clockOut: '04:58 PM', totalHours: '8h 3m', status: 'On Time' },
  { name: 'Demi Wilkinson', clockIn: '-', clockOut: '-', totalHours: '-', status: 'Absent' },
  { name: 'Candice Wu', clockIn: '09:00 AM', clockOut: '05:01 PM', totalHours: '8h 1m', status: 'On Time' },
];

app.get('/api/stats', (req, res) => {
  res.json(stats);
});

app.get('/api/employees', (req, res) => {
  res.json(employees);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
