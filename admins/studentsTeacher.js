const data = {
    students: require('../model/student.json'),
    setStudents: function (data) { this.students = data},
    teachers: require('../model/teachers.json')
}


const getAllStudents = (req, res) => {
    res.json(data.students);
}

const createNewStudent = (req, res) => {
    // if(req.params.id === )
    let teacherStudent = data.teachers.filter((teacher) => teacher.id === req.params.id)
    if(!(teacherStudent[0].isTeacher)) {
        return res.stauts(400).json({'message': `No admin access`});
    }

    // let teacherCheck = data.students
    const newStudent = {
        id: data.students[data.students.length - 1].id + 1 || 1,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    }

    if (!newStudent.firstname || !newStudent.lastname) {
        return res.status(400).json({ 'message': 'First and last namee are required.' });
    }

    data.setStudents({...data.students, newStudent});
    res.status(201).json(data.students);
}    

const updateStudent = (req, res) => {
    let teacherStudent = data.teachers.filter((teacher) => teacher.id === req.params.id)
    if((teacherStudent[0].isTeacher) !== role_list.isTeachers) {
        return res.stauts(400).json({'message': `No admin access`});
    }

    // const teacher = data.teachers.find(emp => emp.id === parseInt(req.params.id)); 
    if (!teacherStudent) {
        return res.stauts(400).json({'message': `Teacher ID ${req.body.id} not found`});
    }
    if(!(teacherStudent[0].isTeacher)) {
        return res.stauts(400).json({'message': `No admin access`});
    }
    let studentToEdit = data.students.filter(student => student.id === req.params.studentid)
    if (!studentToEdit) {
        return res.stauts(400).json({'message': `student ID ${req.body.studentid} not found`});
    }

    if (req.body.firstname) studentToEdit[0].firstname = req.body.firstname;
    if (req.body.lastname) studentToEdit[0].lastname = req.body.lastname;
    res.json(studentToEdit);
}    

const getStudent = (req, res) => {
    const student = data.students.find(emp => emp.id === parseInt(req.params.id));
    if (!student) {
        return res.status(400).json({ "message": `Student ID ${req.params.id} not found`});
    }
    res.json(student);
}

module.exports = {
    getAllStudents,
    createNewStudent,
    updateStudent,
    getStudent
}