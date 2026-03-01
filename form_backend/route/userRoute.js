const router = require('express').Router();
const userdata = require('../model/user_data');
const AuthenticateToken = require('../auth');
const userController = require('../controller/userController');
router.get('/getdata', userController.getAllUSer); 
router.post('/post', userController.addNewUser);

router.get('/find/:id',userController.finduserbyid);

router.post('/login', userController.loginuser);
// app.get('/getdata',AuthenticateToken, async (req, res) => {
//     const getdata = await userdata.find().select('-password');
//     console.log(getdata, 'all data');
//     res.json(getdata);
// });
router.put('/update/:id', userController.updatebyid);

router.delete('/delete/:id',userController.deletebyid);


router.get('/find/:id',userController.getbyid);



module.exports = router;