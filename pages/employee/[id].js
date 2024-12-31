"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const EmployeeDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Lấy ID từ URL
  const [employee, setEmployee] = useState(null); // Dữ liệu chi tiết nhân viên
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dữ liệu chi tiết nhân viên
  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    if (!user) {
      router.push("/login"); // Chuyển hướng nếu chưa đăng nhập
      return;
    }
    if (id) {
      const fetchEmployeeDetail = async () => {
        try {
          const response = await fetch(`http://localhost:8069/api/v1/employee/${id}`); // Thay bằng API của bạn
          const result = await response.json();
          setEmployee(result);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch employee details");
          setLoading(false);
        }
      };

      fetchEmployeeDetail();
    }
  }, [id]);

  if (loading) {
    return <p>Loading employee details...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="container mt-5">
      <h1>Employee Details</h1>
      {employee ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Name :{employee.name}</h5>
            <p className="card-text">
              <strong>Job title:</strong> {employee.job_title}
            </p>
           
          </div>
        </div>
      ) : (
        <p>No employee details found</p>
      )}
    </div>
  );
};

export default EmployeeDetail;
