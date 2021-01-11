const express = require('express');
const router = express.Router();
const { Types } = require('mongoose');
const Subject = require('../models/Subject');
const Student = require('../models/Student');
const Mark = require('../models/Mark');


router.get('/', async (req, res) => {
  try {
    const allStudents = await Student.find()
      .populate({ path: 'subjects', populate: { path: "marks" } })

    res.send({ allStudents: allStudents })

  } catch (error) {
    res.send("error" + error);
  }

});

router.post('/', async (req, res) => {
  try {
    const newStudent = await Student.create(req.body)

    res.send({ addNewStudent: newStudent })

  } catch (error) {
    res.send("error" + error);
  }

});

router.delete('/:idStudent', async (req, res) => {
  try {
    // usuwanie przedmiotów tego studenta
    const idStudent = req.params.idStudent;
    const student = await Student.find(Types.ObjectId(idStudent)).populate({ path: 'subjects', populate: { path: "marks" } });
    const idSubjects = await student[0].subjects.map(subject => subject._id);
    const deleteSubjects = await Subject.deleteMany({ _id: { '$in': idSubjects } })

    // usuwanie ocen tego studenta
    const idMarks = await student[0].subjects
      .map(subject => subject.marks.map(mark => mark._id))
      .reduce((total, amount) => {
        return [...total, ...amount]
      }, []);
    const deleteMarks = await Mark.deleteMany({ _id: { '$in': idMarks } })

    // usuwanie studenta
    const deletedStudent = await Student.findByIdAndDelete({ _id: idStudent });
    return res.send({ deletedStudent: deletedStudent });
  } catch (error) {
    res.send("error" + error);
  }
});

router.patch('/:idStudent', async (req, res) => {
  try {
    const idStudent = req.params.idStudent;
    const data = req.body
    const updateStudent = await Student.findByIdAndUpdate(idStudent, data, { new: true })
    res.send({ updateStudent: updateStudent })
  } catch (error) {
    res.send("error" + error);
  }
});


module.exports = router;