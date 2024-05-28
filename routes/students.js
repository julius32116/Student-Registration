const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Register a new student
router.post('/register', async (req, res) => {
    const { name, age, email, course } = req.body;

    try {
        const newStudent = new Student({ name, age, email, course });
        await newStudent.save();
        res.status(201).send({ message: 'Student registered successfully', student: newStudent });
    } catch (err) {
        res.status(400).send({ message: 'Error registering student', error: err.message });
    }
});

module.exports = router;
