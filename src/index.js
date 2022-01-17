const express = require('express');
require('express-async-errors'); // Now we can hadle async errors

const routes = require('./routes');
const cors = require('./app/middlewares/cors');
const errorHander = require('./app/middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHander);

app.listen(3001, console.log('🔥 Server started at port 3001'));
