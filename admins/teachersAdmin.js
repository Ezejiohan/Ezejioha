const Teacher = require('../model/Teacher');


const getAllTeachers = async (req, res) => {
    const teachers = await Teacher.find();
    if (!teachers) return res.status(204).json({ 'message': 'No teachers found.' });
    res.json(teachers);
}

const createNewTeacher = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required' });
    }

    try {
        const result = await Teacher.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
    // if(req.params.id === )
    /*let adminTeacher = data.teachers.filter((teacher) => teacher.id === req.params.id)
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
        return res.status(400).json({ 'message': 'First and last name are required.' });
    }

    data.setTeachers({...data.teachers, newTeacher});
    res.status(201).json(data.teachers);*/
}    

const updateTeacher = async (req, res) => {
    if(!req?.body?.id) {
        return res.stauts(400).json({'message': 'ID parameter is required.'});
    }

    const teacher = await Teacher.findOne({ _id: req.body.id }).exec();
    if (!teacher) {
        return res.stauts(204).json({'message': `No teacher matches ID ${req.body.id}.`});
    }
    if (req.body?.firstname) teacher.firstname = req.body.firstname;
    if (req.body?.lastname) teacher.lastname = req.body.lastname;
    // const filteredArray = data.teachers.filter(emp => emp.id !== parseInt(req.body.id));
    // const unsortedArray = [...filteredArray, teacher];
    // data.setTeachers(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    const result = await teacher.save();
    res.json(result);
}

const deleteTeacher = async (req, res) => {
    if(!req?.body?.id) return res.stauts(400).json({'message': 'ID parameter is required.'});

    const teacher = await Teacher.findOne({ _id: req.body.id }).exec();
    if (!teacher) {
        return res.stauts(204).json({'message': `No teacher matches ID ${req.body.id}.`});
    }
   /* const filteredArray = data.teachers.find(emp => emp.id !== parseInt(req.body.id));
    data.setTeachers([...filteredArray]);*/
    const result = await teacher.deleteOne();
    res.json(result);
}

const getTeacher = async (req, res) => {
    if(!req?.params?.id) return res.stauts(400).json({'message': 'Teacher ID required.'});

    const teacher = await Teacher.findOne({ _id: req.params.id }).exec();
    if (!teacher) {
        return res.stauts(204).json({'message': `No teacher matches ID ${req.params.id}.`});
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