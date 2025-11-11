# AttendTrack - Employee Management Dashboard

This project is a full-featured employee management dashboard built with a React frontend and a Node.js (Express) backend. It provides a clean and modern UI for tracking employee attendance, with features like search, filtering, pagination, and data export.

## Features

- **Dashboard Overview:** At-a-glance statistics for total employees, present staff, late arrivals, and employees on leave.
- **Employee List:** A detailed table of all employees, with their clock-in/out times, total hours, and attendance status.
- **Search:** Instantly find employees by name.
- **Filtering:** Filter the employee list by attendance status (On Time, Late, Absent).
- **Pagination:** Navigate through the employee list with easy-to-use pagination controls.
- **Export Data:** Export the filtered employee list to a CSV file.

## Technologies Used

- **Frontend:**
  - React
  - TypeScript
  - Vite
  - CSS

- **Backend:**
  - Node.js
  - Express
  - Bun
  - TypeScript
  - CORS

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Bun](https://bun.sh/)

### Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. **Install frontend dependencies:**
   ```sh
   bun install
   ```

3. **Install backend dependencies:**
   ```sh
   cd backend
   bun install
   ```

### Running the Application

1. **Start the backend server:**
   - From the `backend` directory, run:
   ```sh
   bun run index.ts
   ```
   - The backend server will start on `http://localhost:3001`.

2. **Start the frontend development server:**
   - From the root project directory, run:
   ```sh
   bun run dev
   ```
   - The frontend application will be available at `http://localhost:5173`.

Now, you can open your browser and navigate to `http://localhost:5173` to see the application in action.
