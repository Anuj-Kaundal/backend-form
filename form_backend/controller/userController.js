
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
    }

}

module.exports = userController;