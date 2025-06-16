import { Router } from 'express';
import {
    createTodo,
    deleteTodo,
    getUserTodos,
    updateTodo,
} from "../controllers/todo.controllers.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(createTodo).get(getUserTodos);
router.route("/:todoId").put(updateTodo).delete(deleteTodo);

export default router