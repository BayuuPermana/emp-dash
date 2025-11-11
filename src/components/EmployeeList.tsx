import React, { useState, useEffect } from 'react';
import './EmployeeList.css';

interface Employee {
  name: string;
  clockIn: string;
  clockOut: string;
  totalHours: string;
  status: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch('http://localhost:3001/api/employees')
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
      });
  }, []);

  useEffect(() => {
    let filtered = employees;

    if (activeFilter !== 'All') {
      filtered = filtered.filter(employee => employee.status === activeFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(employee =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset to first page on filter/search change
  }, [activeFilter, searchQuery, employees]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleExportData = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Name,Clock In,Clock Out,Total Hours,Status\n"
      + filteredEmployees.map(e => `${e.name},${e.clockIn},${e.clockOut},${e.totalHours},${e.status}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "employee_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  return (
    <div className="employee-list">
      <div className="toolbar">
        <input
          type="text"
          placeholder="Search employee..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <input type="date" />
        <button className="export-btn" onClick={handleExportData}>Export Data</button>
      </div>
      <div className="filters">
        <button onClick={() => handleFilterClick('All')} className={activeFilter === 'All' ? 'active' : ''}>All</button>
        <button onClick={() => handleFilterClick('On Time')} className={activeFilter === 'On Time' ? 'active' : ''}>On Time</button>
        <button onClick={() => handleFilterClick('Late')} className={activeFilter === 'Late' ? 'active' : ''}>Late</button>
        <button onClick={() => handleFilterClick('Absent')} className={activeFilter === 'Absent' ? 'active' : ''}>Absent</button>
      </div>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>EMPLOYEE NAME</th>
            <th>CLOCK-IN</th>
            <th>CLOCK-OUT</th>
            <th>TOTAL HOURS</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.map((employee, index) => (
            <tr key={index}>
              <td><input type="checkbox" /></td>
              <td>
                <img src={`https://via.placeholder.com/30`} alt={employee.name} />
                {employee.name}
              </td>
              <td>{employee.clockIn}</td>
              <td>{employee.clockOut}</td>
              <td>{employee.totalHours}</td>
              <td><span className={`status ${employee.status.toLowerCase().replace(' ', '-')}`}>{employee.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <span>Showing {paginatedEmployees.length} of {filteredEmployees.length} results</span>
        <div>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => handlePageChange(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>{i + 1}</button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
