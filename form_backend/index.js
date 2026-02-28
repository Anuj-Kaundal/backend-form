const express = require('express');
const userdata = require('./model/user_data');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
const AuthenticateToken = require('./auth');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors('http://localhost:5173/'));
const userRoute = require('./route/userRoute')
// user, admin, superadmin, 
app.use('/api',userRoute);






app.listen(2000, () => {
    console.log('server is running...');
})