const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/formdata').then(()=>{
    console.log('database is connected');
});
const userdata = new mongoose.Schema({ 
    fullname: String,
    email: String,
    phone: Number,
    password:String
});
module.exports = mongoose.model('user', userdata);