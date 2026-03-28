import app from "./src/app.js"
import connectDB from "./src/db/db.js"
import initSocketServer from "./src/sockets/socket.server.js"

import http from "http"

const httpServer = http.createServer(app)

initSocketServer(httpServer)

const PORT = process.env.PORT || 3002

connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})