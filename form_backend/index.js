const express = require('express');
const userdata = require('./model/user_data');
const cors = require('cors');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AuthenticateToken = require('./auth');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors('http://localhost:5173/'));
const userRoute = require('./route/userRoute')
app.use('/api',userRoute);
app.post('/post', async (req, res) => {
    const { fullname, email, phone, password } = req.body;
    console.log(fullname, email, phone, password);
    const hashedpassword = await bcrypt.hash(password, 10)
    // console.log('hased pass : ', hashedpassword)
    const add_data = await userdata.create({
        fullname,
        email,
        phone,
        password: hashedpassword
    });
    console.log('data submit', add_data);
    res.send('compleated', add_data);
});

// login part
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await userdata.findOne({ email }).select('+password');

    console.log(user)
    if (!user) {
        return res.send('User is not found')
    }



    bcrypt.compare(password, user.password).then(function (result) {
        if (result == true) {
            var token =  jwt.sign(
                { token: user.email }, 'shhhhh'
            )
            res.status(200).json({ message: 'login successfully', success: true , token,user});
        } else {
            res.status(500).json({ message: 'getting error whle login,', success: false })
        }
    })




});

// app.get('/getdata',AuthenticateToken, async (req, res) => {
//     const getdata = await userdata.find().select('-password');
//     console.log(getdata, 'all data');
//     res.json(getdata);
// });
app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { fullname, email, phone, password } = req.body;
    console.log(fullname, email, phone, password)
    const updatedata = await userdata.findByIdAndUpdate({ _id: id }, {
        fullname,
        email,
        phone,
        password
    },
        { new: true });
    console.log('updated', updatedata);
    // res.status(200).json({message:'data updated successfully',success:true});
    res.send('user Updated : ', updatedata)
})

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const data = await userdata.findByIdAndDelete({ _id: id })
    console.log('true');
    res.status(200).json({ message: 'user deleted successfully', success: true })
});


app.get('/find/:id',async(req,res)=>{    // route, middelware, logic
     const {id} = req.params;
     const find_user = await userdata.findOne({_id:id});
     console.log(find_user,'data');
     res.send(find_user,'data-user');
});
app.listen(2000, () => {
    console.log('server is running...');
})