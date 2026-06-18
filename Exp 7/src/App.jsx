import "./App.css";

function App() {
  const students = [
    { name: "Rahul Sharma", course: "Computer Science", marks: 85 },
    { name: "Anita Verma", course: "Information Technology", marks: 92 },
    { name: "Rohan Gupta", course: "Electronics", marks: 78 },
  ];

  return (
    <div className="container">
      <h1>Student Information</h1>

      {students.map((student, index) => (
        <div className="card" key={index}>
          <h2>{student.name}</h2>
          <p>Course: {student.course}</p>
          <p>Marks: {student.marks}</p>
        </div>
      ))}
    </div>
  );
}

export default App;