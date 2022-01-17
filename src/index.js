const express = require('express');
require('express-async-errors'); // Now we can hadle async errors
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(routes);
// We need to take these 4 params for Express get that this is a handle error
app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
});

app.listen(3001, console.log('🔥 Server started at port 3000'));
