import {Request, Response} from 'express';
import {todoService} from "../services/todoService";

export class TodoController {
    renderTodos = async (req:any, res:Response) => {
        res.render('todos', {action: '', result:{styleToggle: req.userSettings.styleToggle}})
    };

    showTodo = (req:any, res:Response) => {
        todoService.get(req.params.id, function (err:any, todo:any) {
            if (err) {
                console.log('err');
            } if (todo == null) {
                console.log('task is null');
            } else {
                res.render('todos', { todo: todo, action: '', result: { styleToggle: req.UserSettings?.styleToggle } });
            }

        });

    }

    createTodo = (req:Request, res:Response) => {
        todoService.add(
            req.body.todoTitle,
            req.body.dueDate,
            req.body.importance,
            req.body.description,
            Boolean(req.body.completed),
            function(err: any, todo: any) {
                req.url === '/todoOverview' ? res.redirect('/') : res.redirect('/todo/' + todo._id);
            });
    }

    updateTodo = (req:Request, res:Response) => {
        todoService.update(
            req.body.id,
            req.body.todoTitle,
            req.body.dueDate,
            req.body.importance,
            req.body.description,
            req.body.completed,
        function(err: any, todo: any) {
            req.url === '/updateOverview' ? res.redirect('/') : res.redirect(`/todo/${req.body._id}`);
        })
    }
}

export const todoController = new TodoController();
