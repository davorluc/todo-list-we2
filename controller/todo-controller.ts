import {Request, Response} from 'express';
import {todoService} from "../services/todoService";

export class TodoController {
    renderTodos = async (req:any, res:Response) => {
        res.render('todos', {action: '', result:{styleToggle: req.userSettings.styleToggle}})
    };

    showTodo = async (req:any, res:Response) => {
        let todo = await todoService.get(req.params.id);
        res.render('todos', { todo: todo, action: '', result: { styleToggle: req.UserSettings.styleToggle } });
    }

    createTodo = async(req:Request, res:Response) => {
        const newTodo = await todoService.add(
            req.body.todoTitle,
            req.body.dueDate,
            req.body.importance,
            req.body.description,
            Boolean(req.body.completed))
        req.url === '/todoOverview' ? res.redirect('/') : res.redirect(`/todo/${newTodo._id}/`);
    }

    updateTodo = async(req:Request, res:Response) => {
        const updateTodo = await todoService.update(
            req.body.id,
            req.body.todoTitle,
            req.body.dueDate,
            req.body.importance,
            req.body.description,
            req.body.completed)
        req.url === '/updateOverview' ? res.redirect('/') : res.redirect(`/todo/${req.body._id}`);
    }
}

export const todoController = new TodoController();
