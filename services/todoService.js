import Datastore from '@seald-io/nedb';
const db = new Datastore({filename: './data/order.db', autoload: true});

class Entry {
    constructor(todoTitle, orderedBy, dueDate, importance, description) {
        this.orderedBy = orderedBy;
        this.todoTitle = todoTitle;
        this.dueDate = dueDate;
        this.importance = importance;
        this.description = description;
        this.state = "OK";
    }
}


class TodoService {
    constructor() {

    }

    add(todoTitle, orderedBy, dueDate, importance, description, callback) {
        console.log("  publicAddOrder start");
        let entry = new Entry(todoTitle, orderedBy, dueDate, importance, description);
        db.insert(entry, function (err, newDoc) {
            console.log("    insert");
            if (callback) {
                callback(err, newDoc);
            }
        });
        console.log("  publicAddOrder end");
    }

    delete(id, callback) {
        db.update({_id: id}, {$set: {"state": "DELETED"}}, {returnUpdatedDocs: true}, function (err, numDocs, doc) {
            callback(err, doc);
        });
    }

    get(id, callback) {
        db.findOne({_id: id}, function (err, doc) {
            callback(err, doc);
        });
    }

    all(callback) {
        db.find({}, function (err, docs) {
            callback(err, docs);
        });
    }

    count(callback) {
        db.count({}, function (err, docs) {
            callback(err, docs);
        });
    }

    edit(id, todoTitle, dueDate, importance, description, callback) {
        db.update({_id: id}, {$set: {"todoTitle": todoTitle}}, {}, function (err, docs) {
            callback(err, docs);
        });
        db.update({_id: id}, {$set: {"dueDate": dueDate}}, {}, function (err, docs) {
            callback(err,docs);
        });
        db.update({_id: id}, {$set: {"importance": importance}}, {}, function (err, docs) {
            callback(err, docs);
        });
        db.update({_id: id}, {$set: {"description": description}}, {}, function (err, docs) {
            callback(err, docs);
        });
    }
}

export const todoService = new TodoService();