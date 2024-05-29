const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

let students = []; // In-memory storage for students

// Register a new student
app.post('/api/students/register', (req, res) => {
    const { name, age, email, course } = req.body;

    if (!name || !age || !email || !course) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    const newStudent = { id: students.length + 1, name, age, email, course };
    students.push(newStudent);

    res.status(201).send({ message: 'Student registered successfully', student: newStudent });
});

// Get all registered students
app.get('/api/students', (req, res) => {
    res.send(students);
});

// Route to delete a student
app.delete('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Find the index of the student with the given ID
    const studentIndex = students.findIndex(student => student.id === id);

    if (studentIndex === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    // Remove the student from the array
    students.splice(studentIndex, 1);

    res.status(204).send(); // No content response
});

// Update a student's information
app.put('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, email, course } = req.body;

    const studentIndex = students.findIndex(student => student.id == id);

    if (studentIndex === -1) {
        return res.status(404).send({ message: 'Student not found' });
    }

    if (!name && !age && !email && !course) {
        return res.status(400).send({ message: 'At least one field is required to update' });
    }

    const updatedStudent = { ...students[studentIndex], name, age, email, course };
    students[studentIndex] = updatedStudent;

    res.send({ message: 'Student updated successfully', student: updatedStudent });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
