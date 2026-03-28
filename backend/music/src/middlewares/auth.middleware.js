import config from "../config/config.js";
import jwt from "jsonwebtoken"


export async function authenticateToken(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    jwt.verify(token, config.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                message:"Forbidden"
            })
        }
        req.user = user
        next()
    })
}

export async function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message:"Forbidden"
            })
        }
        next()
    }
}
