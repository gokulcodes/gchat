const express = require('express')
const app = express()
const server = require('http').Server(app)
const socketIO = require('socket.io')

var instance = server.listen(5000, () => {
    console.log('server listening on 3000')
})

const io = socketIO(instance)

let nickname
let users = 0

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('initialize', ({name}) => {
        users = users + 1
        nickname = name
        socket.emit('cast', {welcome: `Welcome to Gchat: ${nickname}, Number of users in Gchat: ${users}`})
    })
    socket.on('chat', (msg, name) => {
        io.emit('message', {msg, name})
    })

    socket.on('typing', (name) => {
        io.emit('press', {notifiy: `${name} is typing`})
    })

    socket.on('disconnect', () => {
        --users
        console.log('disconnect')
    })

})
