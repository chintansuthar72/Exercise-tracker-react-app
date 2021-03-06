const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri , {useNewUrlParser:true , useCreateIndex:true , useUnifiedTopology:true});
mongoose.connection.once('open', () => {
    console.log('MongoDb connection established..');
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter);

app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
})
