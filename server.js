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

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
