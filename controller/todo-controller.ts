import {Request, Response} from 'express';
import {todoService} from "../services/todoService";

export class TodoController {
    renderTodos = async (req:any, res:Response) => {
        res.render('todos', {action: 'create', result:{styleToggle: req.userSettings.styleToggle}})
    };

    showTodo = async (req:any, res:Response) => {
        let todo = await todoService.get(req.params.id, (error, result) => {
            if (error) {
                res.status(500).json({error: 'An error has occured'});
            } else {
                res.render('todos', {todo: todo, action: 'update', result: {styleToggle: req.UserSettings.styleToggle}});
            }
        });
    }

    createTodo = async(req:Request, res:Response) => {
        const newTodo = await todoService.add(
            req.body.todoTitle,
            req.body.dueDate,
            req.body.importance,
            req.body.description,
            req.body.completed)
        req.url === '/todoOverview' ? res.redirect('/') : res.redirect(`/todo/${req.body.id}`);
    }

    updateTodo = async(req:Request, res:Response) => {
        const updateTodo = await todoService.update(
            req.body.id,
            req.body.todoTitle,
            req.body.dueDate,
            req.body.importance,
            req.body.description,
            req.body.completed)
        req.url === '/updateOverview' ? res.redirect('/') : res.redirect(`/todo/${req.body.id}`);
    }
}

export const todoController = new TodoController();
