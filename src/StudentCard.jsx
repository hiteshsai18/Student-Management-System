import React from "react";

function StudentCard({ student, deleteStudent }) {
  return (
    <div className="card">
      <h2>{student.name}</h2>

      <p>
        <strong>Age:</strong> {student.age}
      </p>

      <p>
        <strong>Course:</strong> {student.course}
      </p>

      <button onClick={() => deleteStudent(student.id)}>
        Delete
      </button>
    </div>
  );
}

export default StudentCard