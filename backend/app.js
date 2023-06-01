//This file will be used to connect to MongoDB
const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//MyRoutes
const authRoutes = require('./routes/authentication.js');
const userRoutes = require('./routes/user.js');
const categoryRoutes = require("./routes/category.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");

//DB Connection
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true

}).then(() => {
    console.log("Connection to MongoDB Successful!")
}); 

//Middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());


//Routes
app.use("/api",authRoutes); 
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);

//Ports

app.listen(process.env.MONGO_PORT, () => {
    console.log(`The server is up and running at port: ${process.env.MONGO_PORT}`);
});