import {todoService} from "../services/todoService.js";

export class IndexController {
    showIndex(req, res) {
        res.type('text/html');
        res.write("<html>");
        res.write("<p>Willkommen! Zu der besten Pizzaria auf der Welt!</p>");
        res.write("<img src='/images/pizza.jpg'>");
        res.write("<form action='/orders' method='get'><input type='submit' value='Order a Pizza'></form>");
        res.end("</html>");
    };

    createOrder(req, res) {
        res.type('text/html');
        res.write("<html>");
        res.write("<p>Was fuer eine Pizze haetten Sie den gerne?</p>");
        res.write("<form action='/orders' method='post'><input name='name' placeholder='pizza name'><input type='submit' value='Order a Pizza'></form>");
        res.end("</html>");
    };

    createPizza(req, res) {
        console.log("createPizza start");
        todoService.add(req.body.name, "unkown", function (err, order) {
            console.log("      callback start");

            res.type('text/html');
            res.write("<html>");
            res.write("<p>Erfolgreich!</p>");
            res.write("<p>Ihre order: " + order.pizzaName + "</p>");
            res.write("<p>Ihre Nummer: " + order._id + " !</p>");
            res.write("<p><a href='/orders/" + order._id + "/'>Zeige order an</a></p>");
            res.end("</html>");

            console.log("      callback end");
        });
        console.log("createPizza end");
    };

    showOrder(req, res) {
        todoService.get(req.params.id, function (err, order) {
            res.type('text/html');
            res.write("<html>");
            if (order) {
                res.write("<p>Order-Number: " + order._id + "</p>");
                res.write("<p>Status: " + order.state + "</p>");
                if (order.state === "OK") {
                    res.write("<form action='/orders/" + order._id + "' method='post'><input type='hidden' name='_method'  value='delete'><input type='submit' value='Delete order'></form>");
                }
            }
            res.write("<form action='/' method='get'><input type='submit' value='Zurueck zum start'></form>");
            res.end("</html>");
        });
    };

    deleteOrder(req, res) {
        todoService.delete(req.params.id, function (err, order) {
            res.type('text/html');
            res.write("<html>");
            res.write("<p>Order-Number: " + order._id + "</p>");
            res.write("<p>Status: " + order.state + "</p>");
            res.write("<form action='/' method='get'><input type='submit' value='Zurueck zum start'></form>");
            res.end("</html>");
        });
    };
}

export const indexController = new IndexController();
