import Datastore from '@seald-io/nedb';
const db = new Datastore({filename: './data/order.db', autoload: true});

class Order {
    constructor(todoName, orderedBy) {
        this.orderedBy = orderedBy;
        this.todoName = todoName;
        this.orderDate = new Date();
        this.state = "OK";
    }
}


class TodoService {
    constructor() {

    }

    add(todoName, orderedBy, callback) {
        console.log("  publicAddOrder start");
        let order = new Order(todoName, orderedBy);
        db.insert(order, function (err, newDoc) {
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
}

export const todoService = new TodoService();