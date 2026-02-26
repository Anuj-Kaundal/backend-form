const route = require('express');
const Route = express(); 
const userdata = require('../model/user_data');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AuthenticateToken = require('../auth');
Route.get('/getdata',AuthenticateToken, async (req, res) => {
    const getdata = await userdata.find().select('-password');
    console.log(getdata, 'all data');
    res.json(getdata);
});