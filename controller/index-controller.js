import {todoService} from "../services/todoService.js";

export class IndexController {
    showIndex(req, res) {
        res.type('text/html');
        res.write("<html>");
        res.write("<p>Willkommen! Zu der besten Pizzeria auf der Welt!</p>");
        res.write("<form action='/todos' method='get'><input type='submit' value='Create a Todo'></form>");
        res.end("</html>");
    };

    createTodo(req, res) {
        res.type('text/html');
        res.write("<html>");
        res.write("<p>Enter the next todo?</p>");
        res.write("<form action='/todos' method='post'>");
        res.write("<input name='todoTitle' placeholder='Title'>")  // Title for the entry
        res.write("<input name='importance' type='number' min='1' max='5' placeholder='importance'>")   // importance categorisation for the entry
        res.write("<input name='dueDate' type='date'>");    // due date of the entry
        res.write("<input name='description' placeholder='description'>");  // further description of the entry
        res.write("<input type='submit' value='Create a Todo'>")    // submit button
        res.write("</form>")
        res.end("</html>");
    };

    createTodoEntry(req, res) {
        console.log("createPizza start");
        todoService.add(req.body.todoTitle, "unknown", req.body.dueDate, req.body.importance, req.body.description, function (err, todo) {
            console.log("      callback start");

            res.type('text/html');
            res.write("<html>");
            res.write("<p>Erfolgreich!</p>");
            res.write("<p>Titel: " + todo.todoTitle + "</p>");
            res.write("<p>Beschreibung " + todo.description + "</p>");
            res.write("<p>Zu erledigen bis: " + todo.dueDate + "</p>");
            res.write("<p>Ihre Nummer: " + todo._id + " !</p>");
            res.write("<p><a href='/todos/" + todo._id + "/'>Zeige Todo an</a></p>");
            res.end("</html>");

            console.log("      callback end");
        });
        console.log("createTodoEntry end");
    };

    showTodo(req, res) {
        todoService.get(req.params.id, function (err, todo) {
            res.type('text/html');
            res.write("<html>");
            if (todo) {
                res.write("<p>Order-Number: " + todo._id + "</p>");
                res.write("<p>Status: " + todo.state + "</p>");
                if (todo.state === "OK") {
                    res.write("<form action='/todos/" + todo._id + "' method='post'><input type='hidden' name='_method'  value='delete'><input type='submit' value='Delete Todo'></form>");
                }
            }
            res.write("<form action='/' method='get'><input type='submit' value='Zurueck zum start'></form>");
            res.end("</html>");
        });
    };

    deleteTodo(req, res) {
        todoService.delete(req.params.id, function (err, todo) {
            res.type('text/html');
            res.write("<html>");
            res.write("<p>Order-Number: " + todo._id + "</p>");
            res.write("<p>Status: " + todo.state + "</p>");
            res.write("<form action='/' method='get'><input type='submit' value='Zurueck zum start'></form>");
            res.end("</html>");
        });
    };
}

export const indexController = new IndexController();
