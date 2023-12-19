const { CourseResponse } = require("../helpers/helpers");
const CourseModel = require("../models/courseModel");


const CourseController = {

    get: async (req, res) => {
        try {
            let {pageNo , pageSize} = req.query
            let skipPage = (pageNo - 1) * pageSize
            const getcoursesArr = await CourseModel.find().limit(pageSize).skip(skipPage)
            res.send(CourseResponse(true, "", getcoursesArr))
        }
        catch (error) {
            res.status(404).send(CourseResponse(false, "Data Not Found", error))
        }
    },
    getbyId: async (req, res) => {
        try {
            let id = req.params.id;
            let result = await CourseModel.findById(id);
            res.status(200).send(CourseResponse(true, "ok", result));
        }
        catch (error) {
            res.status(404).send(CourseResponse(false, error, null))
        }

    },
    add: async (req, res) => {
        try {
            const { Title , Description } = req.body
            const obj = {Title , Description}
            const errArr = []
            if (!obj.Title) {
                errArr.push('Required Title')
            }
            if (!obj.Description) {
                errArr.push('Required Description')
            }
            if (errArr.length > 0) {
                res.status(401).send(CourseResponse(false, 'Validation Error!', errArr))
            }
            else {
                const course = await new CourseModel(obj)
                const result = await course.save()
                res.status(200).send(CourseResponse(true, "Data Added Successfully", result))
            }
        }
        catch (e) {
            res.send(CourseResponse(false, "Data Not Added! :(", e))
        }
    },
    edit: async (req, res) => {
        try {
            const id = req.params.id
            const { Title, Description,  } = req.body
            const obj = { Title, Description,  }
            const errArr = []
            if (!obj.Title) {
                errArr.push('Required Title')
            }
            if (!obj.Description) {
                errArr.push('Required Description')
            }
            if (errArr.length > 0) {
                res.status(401).send(CourseResponse(false, 'Validation Error!', errArr))
            }
            else {
                const result = await CourseModel.findByIdAndUpdate(id, obj)
                res.status(200).send(CourseResponse(true, "Updated Successfully", obj))
            }
        }
        catch (error) {
            res.status(404).send(CourseResponse(false, error, null))
        }
    },
    del: async (req, res) => {
        const id = req.params.id
        try {
            const result = await CourseModel.findByIdAndDelete(id)
            res.status(200).send(CourseResponse(true, "Deleted ", result))
        }
        catch (error) {
            res.status(404).send(CourseResponse(false, error, null))
        }
    },
    MarkAsDone: async (req, res) => {
        try {
            let projectId = req.params.id
            const project = await CourseModel.findByIdAndUpdate(
                projectId,
                {  ProjectStatus: 'completed' },
                { new: true }
            );
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            return res.json(project);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
}

module.exports = CourseController
