const express = require('express');
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user.routes')
require('dotenv').config({path:'./config/.env'})
require('./config/db')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//routes
app.use('/', userRoutes);

//server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})