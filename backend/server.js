const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const infoRouter = require('./routes/info');
const usersRouter = require('./routes/users');
const noteRouter = require('./routes/note');
const knowledgeRouter = require('./routes/knowledge');
const commentsRouter = require('./routes/comments');

app.use('/info', infoRouter);
app.use('/users', usersRouter);
app.use('/note', noteRouter);
app.use('/knowledge', knowledgeRouter);
app.use('/comments', commentsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});