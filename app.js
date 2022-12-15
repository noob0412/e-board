const express = require("express"); //access the modules
const socket = require("socket.io");

const app = express(); //initialize the application and server ready

app.use(express.static("public"));

let port = process.env.PORT || 3000;
let server = app.listen(port, () =>{
    console.log("listening to port " + port)
});

let io = socket(server); //initialization

io.on("connection", (socket) => {
    console.log("Made socket connection");

    //recieved data
    socket.on("beginPath", (data) => {
        //data from frontend
        //transfer data to all connected computers
        io.sockets.emit("beginPath", data);
    })

    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })

    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo",data);
    })
}); 