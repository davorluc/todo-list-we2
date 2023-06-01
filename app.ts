import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import session from 'express-session';
import exphbs from 'express-handlebars';

import {indexRoutes} from './routes/index-routes';
import {helpers} from './utils/handlebar-util'
import {sessionUserSettings} from './utils/session-middleware.index'


export const app = express();
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: "default",
    helpers: {
        ...helpers
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));

app.use(express.static(path.resolve('public')));
app.use(session({secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true}));
app.use(sessionUserSettings);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/", indexRoutes);
