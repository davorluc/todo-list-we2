import {Response} from 'express';
import {todoService} from '../services/todoService';

export class IndexController {

    renderIndex = async (req:any, res:Response) => {
        res.render('index', {title: 'Todos Overview', result: {todoList: await todoService.all(req.userSettings.orderBy, req.userSettings.orderDirection, req.userSettings.showCompleted)}, userSettings: req.userSettings});
    };
}

export const indexController = new IndexController();