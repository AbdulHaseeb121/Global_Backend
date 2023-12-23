const { CourseResponse } = require("../helpers/helpers");
const CourseModel = require("../models/courseModel");
const Team = require('../models/teamModal')

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
            const { Title, Description, teamId } = req.body;
    
            // Check karein ke team aur member mojood hain
            const team = await Team.findById(teamId);
            // const user = await AuthModel.findById(assignedTo);
    
            if (!team) {
                return res.status(404).json({
                    success: false,
                    message: 'Team  nahi mila',
                });
            }
    
            // Task ko create karein
            const newTask = await CourseModel.create({
                Title,
                Description,
                teamId,
            });
    
            // Update team ke tasks array mein newTask ko push karein
            await Team.findByIdAndUpdate(team, { $push: { tasks: newTask } });
    
            // Update user ke tasks array mein newTask ko push karein

            return res.status(201).json({
                success: true,
                message: 'Task successfully assign kiya gaya hai',
                task: newTask,
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Task assign karne mein kuch problem aayi hai',
                error: error.message,
            });
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
