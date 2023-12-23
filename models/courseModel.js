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
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
},
{
    timestamps:true
})

const CourseModel = mongoose.model('/courses' , CourseScheema)

module.exports = CourseModel