import jwt from "jsonwebtoken";
import secret from "../config.js";

export default function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        console.log(req.rawHeaders[1].split(" ")[1]);
        const token = req.rawHeaders[1].split(" ")[1]
        if (!token) {
            return res.status(403).json({ message: "Пользователь не авторизован123" })
        }
        const decodeData = jwt.verify(token, secret);
        req.user = decodeData;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: "Пользователь не авторизован" })
    }
}