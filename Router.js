import Router from "express";
import { check } from "express-validator";
import controller from "./Controller.js";
import middleware from "./middleware/middleware.js";
import roleMiddleware from "./middleware/rolemiddleware.js";

const router = new Router();

router.post("/regestration", [
    check('username', 'Ошибка валидации имени пользователя').notEmpty(),
    check("password", "Ошибка валидации пароля")
], controller.registration);
router.post("/login", controller.login);
router.get("/users", roleMiddleware(["USER", "ADMIN"]), controller.getUsers);

export default router;