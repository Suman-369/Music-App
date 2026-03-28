import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import cookie from "cookie";



function initSocketServer(httpServer) {

    const io = new Server(httpServer,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true
        }
    })

    io.use((socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers.cookie || "");

        const token = cookies.token;
        if (!token) {
            return next(new Error("Authentication error"));
        }

        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(new Error("Authentication error"));
            }
            socket.user = decoded;
            next();
        });
    });

    io.on("connection", (socket) => {

        socket.join(socket.user.id);
        console.log(`User ${socket.user.id} connected`);


        socket.on("playMusic", (musicId) => {
            console.log(`User ${socket.user.id} is playing music ${musicId}`);
            socket.broadcast.to(socket.user.id).emit("playMusic", musicId);
        });

        socket.on("disconnect", () => {
            socket.leave(socket.user.id);
            console.log(`User ${socket.user.id} disconnected`);
        });
    })
}

export default initSocketServer;