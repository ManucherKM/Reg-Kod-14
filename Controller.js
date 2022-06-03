import User from "./models/User.js";
import Role from "./models/Role.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import secret from "./config.js";

const generateToken = (id, roles) => {
    const payload = {
        id, roles
    }
    return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class Controller {


    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка валидации", errors })
            }
            const { username, password } = req.body;
            const candidat = await User.findOne({ username })

            if (candidat) {
                return res.status(400).json({ message: "Пользователь с таким именем уже существует" })
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({ value: "USER" })
            const user = new User({ username, password: hashPassword, roles: [userRole.value] })
            await user.save(); res.json({ message: "Успешная регистрация" })
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Regestration error" })
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username })
            if (!user) {
                return res.status(400).json({ message: "Пользователь с не найден" })
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: "Неверный пароль" })
            }

            const token = generateToken(user._id, user.roles)
            return res.json({ token })
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Login error" })
        }
    }

    async getUsers(req, res) {
        try {
            // const userRole = new Role();
            // const adminRole = new Role({ value: "ADMIN" });
            // await userRole.save()
            // await adminRole.save()

            const users = await User.find()
            res.json(users)
        } catch (error) {
            console.log(error);
        }
    }
}

export default new Controller();