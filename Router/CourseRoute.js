
const express = require('express')
const CourseController = require('../controller/courseController')
const courseRoute = express.Router()  

courseRoute.get('/' ,   CourseController.get)
courseRoute.get('/:id' , CourseController.getbyId)
courseRoute.post('/' , CourseController.add)
courseRoute.delete('/:id' , CourseController.del)
courseRoute.put('/:id' , CourseController.edit)
courseRoute.put("/:id/markAsDone", CourseController.MarkAsDone)

module.exports = courseRoute