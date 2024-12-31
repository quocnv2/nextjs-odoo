"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

const Employee = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    icon: "",
    message: "",
    status: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState(null);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8069/api/v1/employee", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setEmployeeData(response.data.employees || []);
        setTotalPages(Math.ceil((response.data.employees || []).length / employeesPerPage));
      } catch (err) {
        setModalConfig({
          title: "Error",
          icon: "bi-exclamation-triangle",
          message: "Failed to fetch employee data.",
          status: "error",
        });
      }
    };

    fetchEmployees();
  }, []);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employeeData.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleDelete = (employeeId) => {
    setEmployeeIdToDelete(employeeId);
    setShowDeleteModal(true);
  };
  const handleConfirmDelete = async (employeeId) => {
    try {
      const response = await axios.delete(`http://localhost:8069/api/v1/employee/${employeeId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setEmployeeData(employeeData.filter((employee) => employee.id !== employeeId));
        setModalConfig({
          title: "Success",
          icon: "bi-check-circle", 
          message: "Employee deleted successfully.",
          status: "success",
        });
      } else {
        setModalConfig({
          title: "Error",
          icon: "bi-exclamation-triangle", 
          message: "Failed to delete employee.",
          status: "error",
        });
      }
    } catch (err) {
      setModalConfig({
        title: "Error",
        icon: "bi-exclamation-triangle", 
        message: "Failed to delete employee.",
        status: "error",
      });
    } finally {
      setShowDeleteModal(false);
    }
  };

  const DeleteConfirmationModal = ({ employeeId, onClose, onConfirm }) => {
    return (
      <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Xác nhận xóa</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <p>Bạn có chắc chắn muốn xóa nhân viên này không?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy</button>
              <button type="button" className="btn btn-danger" onClick={() => onConfirm(employeeId)}>Xóa</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", textAlign: "center" }}>
      <div className="container mt-5">
        <h1 className="text-center">Employee Data Table</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Job Title</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee, index) => ( 
              <tr key={employee.id}>
                <th scope="row">{index + 1 + (currentPage - 1) * employeesPerPage}</th> 
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.job_title}</td>
                <td>
                  <Link href={`/employee/edit/${employee.id}`} className="btn btn-primary btn-sm">
                    Update
                  </Link>
                  <button onClick={() => handleDelete(employee.id)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                <a onClick={() => paginate(number)} className="page-link" href="#">
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {showDeleteModal && (
        <DeleteConfirmationModal
          employeeId={employeeIdToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default Employee;