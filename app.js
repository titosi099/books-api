import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRoute from './routes/books';
import usersRoute from './routes/users';

const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);
app.use(bodyParser.json());
booksRoute(app);
usersRoute(app);

export default app;
