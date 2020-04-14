const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const mailRoute = require('./routes/resetpass');
const stockRoute = require('./routes/stocks');
cors = require('cors')
const corsOptions = {
    origin: true,
    credentials: true
};

app.options('*', cors(corsOptions));
//set access to all  connect to this api
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Origin, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        Response.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

var bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));

dotenv.config();

//connect to db
mongoose.connect(
    process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to db'));

//middleware
app.use(express.json());
//dsc
app.use('/uploads', express.static('uploads'));

//route middleware
app.use('/api/auth', authRoute);
app.use('/api/stocks', stockRoute);




app.listen(process.env.PORT || 5000, () => console.log("Server up and running"));