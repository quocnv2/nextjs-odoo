"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Employee = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch danh sách nhân viên khi trang được tải
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8069/api/v1/employee", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setEmployeeData(response.data.employees || []);
      } catch (err) {
        setError("Failed to fetch employee data.");
        console.error(err);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", textAlign: "center" }}>
      <h1>Employee List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {employeeData.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.position}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Employee;
