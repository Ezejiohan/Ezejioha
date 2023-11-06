const data = {
    teachers: require('../model/teachers.json'),
    setTeachers: function (data) { this.teachers = data}

};


const getAllTeachers = (req, res) => {
    res.json(data.teachers);
}

const createNewTeacher = (req, res) => {
    // if(req.params.id === )
    let adminTeacher = data.teachers.filter((teacher) => teacher.id === req.params.id)
    if(!(adminTeacher[0].isAdmin)) {
        return res.stauts(400).json({'message': `No admin access`});
    }

    // let adminCheck = data.teachers
    const newTeacher = {
        id: data.teachers[data.teachers.length - 1].id + 1 || 1,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    }

    if (!newTeacher.firstname || !newTeacher.lastname) {
        return res.status(400).json({ 'message': 'First and last namee are required.' });
    }

    data.setTeachers({...data.teachers, newTeacher});
    res.status(201).json(data.teachers);
}    

const updateTeacher = (req, res) => {
    let adminTeacher = data.teachers.filter((teacher) => teacher.id === req.params.id)
    if(!(adminTeacher[0].isAdmin)) {
        return res.stauts(400).json({'message': `No admin access`});
    }

    const teacher = data.teachers.find(emp => emp.id === parseInt(req.params.id));
    if (!teacher) {
        return res.stauts(400).json({'message': `Teacher ID ${req.body.id} not found`});
    }
    if (req.body.firstname) teacher.firstname = req.body.firstname;
    if (req.body.lastname) teacher.lastname = req.body.lastname;
    // const filteredArray = data.teachers.filter(emp => emp.id !== parseInt(req.body.id));
    // const unsortedArray = [...filteredArray, teacher];
    // data.setTeachers(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.teachers);
}

const deleteTeacher = (req, res) => {
    const teacher = data.teachers.find(emp => emp.id === parseInt(req.body.id))
    if (!teacher) {
        return res.status(400).json({ "message": `Teacher ID ${req.body.id} not found` });
    }
    const filteredArray = data.teachers.find(emp => emp.id !== parseInt(req.body.id));
    data.setTeachers([...filteredArray]);
    res.json(data.teachers);
}

const getTeacher = (req, res) => {
    const teacher = data.teachers.find(emp => emp.id === parseInt(req.params.id));
    if (!teacher) {
        return res.status(400).json({ "message": `Teacher ID ${req.params.id} not found`});
    }
    res.json(teacher);
}

module.exports = {
    getAllTeachers,
    createNewTeacher,
    updateTeacher,
    deleteTeacher,
    getTeacher
}