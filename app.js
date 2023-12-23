const express = require('express');
require('dotenv').config()
const Cors = require('cors')
// const courseRoute = require('./routes/courseRouter')
const route = require('./Router/Authrouth')
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const http = require('http');
const courseRoute = require('./Router/CourseRoute');
const router = require('./Router/Teamroute');
const App = express()
const server = http.createServer(App);
const io = socketIo(server);
App.set('io', io);
App.use(express.json())
App.use(Cors({ origin: true, credentials: true }))
// App.use('/course', courseRoute)
App.use('/course' , courseRoute)
App.use('/auth', route)
App.use('/team' , router)
mongoose.connect(process.env.MONGOS_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(res => {
    io.on('connection', (socket) => {
        console.log('User connected');
        socket.on('disconnect', () => {
            console.log('User disconnected');
        })})
        App.listen(process.env.PORT, () => {
            console.log(`Database is Connected and Server Start http://localhost:${process.env.PORT}`)
        })
    })
    .catch(err => {
        console.log(err)
    })

