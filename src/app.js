const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/notepad_schema');
const mongoose = require('mongoose');

const app = express();
mongoose.connection.close();
mongoose.connect('mongodb+srv://dbuser:q1w2e3r4@yossie.phnfp.mongodb.net/notepad?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(
    () => { console.log('connected to DB'); },
    err => { console.log('error', err.toString()); });

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(4000, () => {
    console.log("listening to port 4000")
});

module.exports = app;
