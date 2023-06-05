import Datastore from '@seald-io/nedb';
// @ts-ignore
const db = new Datastore({filename: './data/todos.db', autoload: true});


class Entry {
    constructor(
        public todoTitle: string,
        public dueDate: string,
        public importance: number,
        public description: string,
        public completed: Boolean = false) {
    }
}

class TodoService {
    constructor() {
    }

    add(
        todoTitle: string,
        dueDate: string,
        importance: number,
        description: string,
        completed: Boolean,
        callback: (err: any, todo: any) => void

    ) {
        const newEntry = new Entry(todoTitle, dueDate, importance, description, completed);
        return db.insert(newEntry, callback)
    }

    update(
        id: string,
        todoTitle: string,
        dueDate: string,
        importance: number,
        description: string,
        completed: Boolean,
        callback: (err: any, todo: any) => void
    ) {
        const updateEntry = new Entry(todoTitle, dueDate, importance, description, completed);
        return db.update({_id: id}, {$set: updateEntry}, {}, callback);
    }

    get(id: string, callback: (err: any, todo: any) => void) {
        db.findOne({_id: id}, callback);
    }


    all(
        orderBy: string,
        orderDirection: number,
        showCompleted: Boolean
    ) {
        const query = showCompleted ? {} : {completed: false};
        return db.find(query).sort({[orderBy]: orderDirection});
    }
}

export const todoService = new TodoService();
