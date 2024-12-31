import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import "bootstrap/dist/css/bootstrap.min.css";

const EditEmployee = () => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Thêm state để theo dõi loading

  useEffect(() => {
    const fetchEmployee = async () => {
      setIsLoading(true); // Bắt đầu loading
      try {
        const response = await fetch(`http://localhost:8069/api/v1/employee/${id}`);
        const data = await response.json();
        setName(data.name);
        setJobTitle(data.job_title);
      } catch (error) {
        console.error('Error fetching employee:', error);
        setMessage('Error fetching employee data.');
      } finally {
        setIsLoading(false); // Kết thúc loading
      }
    };

    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Bắt đầu loading

    try {
      const response = await fetch(`http://localhost:8069/api/v1/employee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Thêm header Authorization nếu API yêu cầu xác thực
          // 'Authorization': 'Bearer your_access_token' 
        },
        body: JSON.stringify({ name, job_title: jobTitle }),
      });

      if (response.ok) {
        setMessage('Employee updated successfully.');
        // Có thể redirect đến trang danh sách nhân viên sau khi cập nhật thành công
        router.push('/employee'); 
      } else {
        const errorData = await response.json();
        setMessage(`Error updating employee: ${errorData.error || errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      setMessage('Error updating employee.');
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  return (
    <div className="container mt-5"> 
      <h1 className="text-center mb-4">Update Employee</h1>
      {message && <div className="alert alert-info" role="alert">{message}</div>} 
      {isLoading ? (
        <div className="text-center"> 
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3"> 
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              className="form-control" 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3"> 
            <label htmlFor="jobTitle" className="form-label">Job Title:</label>
            <input
              type="text"
              className="form-control" 
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary"> 
            Update Employee
          </button>
        </form>
      )}
    </div>
  );
};


export default EditEmployee;