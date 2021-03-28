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
    console.log("MongoDB database connection established successfully 🦆");
});

//Business Problem 1 
// Business problem 1 analysis sales according to the game genre, region and platform. By analysing the data, a few keynotes can be attained -

// Role-Playing Games (RPG) holds the highest market per cent of sales of any genre, with strategy games holding the lowest share.

// All top entries for each genre are predominantly held by games within the same series e.g Pokemon for RPG, Call Of Duty for shooters and Grand Theft Auto for action games.

// The calculation for total profit displays that Nintendo holds 17 of the top 20 spots with titles, with all 10 of the top spots going to Nintendo products.

// The final data submission shows a bar char labelling the genre and sorting them in accordance with global sales value. The chart highlights that the action genre has a clear lead while there sports and shooters genre takes second and third respectively.

// This section highlights the tools that will be used in the future presentation of the data. In the forthcoming sections

// Business Problem 2
// For an analysis of online orders through the online shop. The results were correlated in regards to customers who had both ordered and were returning purchaser. For the ordered customers the top correlated actions to purchase were -
//  Checked Delivery Detail
// Saw Checkout
// Basket add detail

// The correlation will show the relationship between two variables to determine any association. This comes under the scope of predictive analytics which can be beneficial to identifying patterns for future customers. 


const infoRouter = require('./routes/info');
const usersRouter = require('./routes/users');
const noteRouter = require('./routes/note');
const knowledgeRouter = require('./routes/knowledge');
const commentsRouter = require('./routes/comments');
const symptomRouter = require('./routes/symptom');
const searchRouter = require('./routes/search');

//:)

app.use('/info', infoRouter);
app.use('/users', usersRouter);
app.use('/note', noteRouter);
app.use('/knowledge', knowledgeRouter);
app.use('/comments', commentsRouter);
app.use('/symptom', symptomRouter);
app.use('/search', searchRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});