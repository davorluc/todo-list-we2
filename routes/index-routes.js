import express from 'express';

const router = express.Router();
import {indexController} from '../controller/index-controller.js';

router.get("/", indexController.showIndex);
router.get("/todos", indexController.createTodo);
router.post("/todos", indexController.createTodoEntry);
router.get("/todos/:id/", indexController.editTodo);
router.post("/todos/:id/", indexController.deleteTodo);

export const indexRoutes = router;
