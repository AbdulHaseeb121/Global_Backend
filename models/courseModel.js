const mongoose = require('mongoose')

const CourseScheema = mongoose.Schema({
    Title: {
        type: String,
        require: true
    },
    Description: {
        type: String,
        require: true
    },  
    ProjectStatus:{
        type:String,
        enum: ['pending' , 'completed'],
        default : 'pending'

    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: '/users' },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
},
{
    timestamps:true
})

const CourseModel = mongoose.model('/courses' , CourseScheema)

module.exports = CourseModel