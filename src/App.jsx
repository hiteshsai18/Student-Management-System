import React, { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    course: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function addStudent(e) {
    e.preventDefault();

    const nameRegex = /^[A-Za-z ]{3,}$/;
    const courseRegex = /^[A-Za-z ]{2,}$/;

    if (!nameRegex.test(formData.name)) {
      setError(
        "Name must contain only letters and minimum 3 characters"
      );
      return;
    }

    if (formData.age < 5 || formData.age > 100) {
      setError("Enter valid age");
      return;
    }

    if (!courseRegex.test(formData.course)) {
      setError("Course must contain only letters");
      return;
    }

    setError("");

    const newStudent = {
      id: Date.now(),
      name: formData.name,
      age: formData.age,
      course: formData.course,
    };

    setStudents([...students, newStudent]);

    setFormData({
      name: "",
      age: "",
      course: "",
    });
  }

  function deleteStudent(id) {
    const updatedStudents = students.filter(
      (student) => student.id !== id
    );

    setStudents(updatedStudents);
  }

  return (
    <div className="container">
      <h1>Student Database</h1>

      <form onSubmit={addStudent}>
        <input
          type="text"
          placeholder="Enter Student Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="Enter Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Enter Course"
          name="course"
          value={formData.course}
          onChange={handleChange}
        />

        <button type="submit">Add Student</button>
      </form>

      {error && <p className="error">{error}</p>}

      {students.length === 0 ? (
        <h2>No Students Added</h2>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;