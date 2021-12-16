const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const boardRoutes = require('./routes/board.routes');
const postRoutes = require('./routes/post.routes');
require('dotenv').config({ path: './config/.env' });
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const dbconnexion = require('./config/db');
const cors = require('cors');

const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};

app.use(cors(corsOptions));
// sert à traiter la data qui transite
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user_id);
});

//routes
app.use('/api/user', userRoutes);
app.use('/api/board', boardRoutes);
app.use('/api/post', postRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`On écoute le port ${port}`);
});
