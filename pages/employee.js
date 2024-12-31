"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
const Employee = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [modalConfig, setModalConfig] = useState({
    title: "",
    icon: "",
    message: "",
    status: "",
  });
  useEffect(() => {
    // Fetch danh sách nhân viên khi trang được tải
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8069/api/v1/employee",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setEmployeeData(response.data.employees || []);
      } catch (err) {
        setModalConfig({
            title: "Error",
            icon: "bi-exclamation-triangle", // Sử dụng Bootstrap Icon
            message: "Failed to fetch employee data.",
            status: "error",
          });
        // console.error(err);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div
      style={{ maxWidth: "800px", margin: "50px auto", textAlign: "center" }}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="container mt-5">
        <h1 className="text-center">User Data Table</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Username</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee, index) => (
              <tr key={employee.id}>
                <th scope="row">{index + 1}</th>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.job_title}</td>
                <td>
                  <Link href={`/employee/${employee.id}`}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
