import express from 'express';

const router = express.Router();
import {indexController} from '../controller/index-controller.js';
import {todoController} from "../controller/todo-controller";

router.get('/', indexController.renderIndex);
router.get('/todo', todoController.renderTodos);
router.get('/todo/:id/', todoController.showTodo);
router.post('/createTodo', todoController.createTodo);
router.post('/todoOverview', todoController.createTodo);
router.post('/updateTodo', todoController.updateTodo);
router.post('/updateOverview', todoController.updateTodo)

export const indexRoutes = router;