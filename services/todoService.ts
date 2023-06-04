import Datastore from 'nedb-promises';
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

    async add(
        todoTitle: string,
        dueDate: string,
        importance: number,
        description: string,
        completed: Boolean

    ) {
        const newEntry = new Entry(todoTitle, dueDate, importance, description, completed);
        return db.insert(newEntry)
    }

    async update(
        id: string,
        todoTitle: string,
        dueDate: string,
        importance: number,
        description: string,
        completed: Boolean
    ) {
        const updateEntry = new Entry(todoTitle, dueDate, importance, description, completed);
        return db.update({_id: id}, {$set: updateEntry});
    }
    
    async get(id: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            db.findOne({ _id: id }, (error: Error | null, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.stringify(result));
                }
            });
        });
    }

    async all(
        orderBy: string,
        orderDirection: number,
        showCompleted: Boolean
    ) {
        const query = showCompleted ? {} : {completed: false};
        return db.find(query).sort({[orderBy]: orderDirection});
    }
}

export const todoService = new TodoService();
