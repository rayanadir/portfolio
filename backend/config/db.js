const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://"+ process.env.DB_USER_PASS +"@cluster0.9s38qll.mongodb.net/site-perso")
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Failed to connect to MongoDB', err))