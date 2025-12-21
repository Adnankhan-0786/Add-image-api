const express = require("express");
const router = express.Router();
const Student = require("../models/student.model");
const multer = require("multer");
const path = require("path");

/* ================= MULTER CONFIG ================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image is allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 3 // 3MB
  }
});

/* ================= ROUTES ================= */

/// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/// Get single student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student)
      return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/// Create new student (with image upload)

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const studentData = { ...req.body };

    if (req.file) {
      studentData.image = req.file.filename;
    }

    const newStudent = new Student(studentData);
    const savedStudent = await newStudent.save();

    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});






/// Update student by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });

    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/// Delete student by ID
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student)
      return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
