
const userdata = require('../model/user_data');

const userController = {
    getAllUSer: async (req, res) => {
        try {
            const getdata = await userdata.find().select('-password');

            console.log(getdata, 'all data');

            res.status(200).json({
                success: true,
                message: "All users fetched successfully",
                data: getdata
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message
            });
        }
    },

    addNewUser: async (req, res) => {
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
    },

    finduserbyid:async(req,res)=>{    // route, middelware, logic
         const {id} = req.params;
         const find_user = await userdata.findOne({_id:id});
         console.log(find_user,'data');
         res.send(find_user,'data-user');
    },

    loginuser:async (req, res) => {
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
    },

    updatebyid:async (req, res) => {
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
    },

    getbyid:async(req,res)=>{    // route, middelware, logic
         const {id} = req.params;
         const find_user = await userdata.findOne({_id:id});
         console.log(find_user,'data');
         res.send(find_user,'data-user');
    },
    
    deletebyid :  async (req, res) => {
        const { id } = req.params;
        const data = await userdata.findByIdAndDelete({ _id: id })
        console.log('true');
        res.status(200).json({ message: 'user deleted successfully', success: true })
    }

}

module.exports = userController;