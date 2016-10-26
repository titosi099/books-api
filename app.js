import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRoute from './routes/books';
import usersRoute from './routes/users';
import authRoute from './routes/auth';
import authorization from './auth';

const app = express();
app.config = config;
app.datasource = datasource(app);

app.set('port', 7000);
app.use(bodyParser.json());
const auth = authorization(app);

app.use(auth.initialize());
app.auth = auth;

booksRoute(app);
usersRoute(app);
authRoute(app);

export default app;
