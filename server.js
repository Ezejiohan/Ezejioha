require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('../My school app/middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 5000;

// connect to mongoDB
// connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions)); 

// built-in middleware to handle urlencoded data from data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());


// serve static files
//app.use(express.static(path.join(__dirname, '/public')));
app.use('/', express.static(path.join(__dirname, '/public')));
/*
app.use('/subdir', express.static(path.join(__dirname, '/public')));*/

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/teachers', require('./routes/api/teachers'));


/*
app.get('^/$|/index(.html)', (req, res) => {
    //res.sendFile('./views/index.html', {root: __dirname });
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
});

app.get('/new-page(.html)', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)', (req, res) => {
    res.redirect(301, '/new-page.html'); // 302 by default
});

// Route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next()
}, (req, res) => {
    res.send('Hello World');
});

// chaining route handlers
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res) => {
    console.log('three');
    res.send('Finished!');
}

app.get('/chain(.html)?', one, two, three);*/

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    if (req.accepts('json')) {
        res.json({ error: "404 not found"});
    } else {
        res.type('txt').send("404 not found");
    }
})

app.use(errorHandler);

// const url = "mongodb+srv://Ezejiohan:Passenger24@cluster0.yqqou7r.mongodb.net/MySchoolAppDB?"
const url = "mongodb+srv://Ezejiohan:Passenger24@cluster0.yqqou7r.mongodb.net/"

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
}).catch((err)=>{
    console.log("the error:",err)
})

// mongoose.connection.once('open', () => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => console.log(`server started on port ${PORT}`));
// });

