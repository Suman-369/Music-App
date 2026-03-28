import express from "express"
import multer from "multer"
import * as musicController from "../controller/music.controller.js"
import * as authMiddleware from "../../auth/src/middleware/auth.middleware.js"

const upload  = multer({
    storage:multer.memoryStorage()
})
const router = express.Router()


router.get("/",authMiddleware.authorizeRoles("user"),musicController.getAllMusics)

router.post("/upload", authMiddleware.authenticateToken, upload.fields([
    {name:"music",maxCount:1},
    {name:"coverImage",maxCount:1}
]), musicController.uploadMusic)


router.get("/artist-musics", authMiddleware.authenticateToken, musicController.getArtistMusic)


router.post("/playlist", authMiddleware.authenticateToken, musicController.createPlayList)

router.get("/playlist/:id", authMiddleware.authorizeRoles("user"), musicController.getPlayListById)

router.get("/playlist", authMiddleware.authorizeRoles("user"), musicController.getArtistPlayList)

router.get("/musicDetails/:id", authMiddleware.authorizeRoles("user"), musicController.getMusicDetailsById)
export default router