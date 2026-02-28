const router = require('express').Router();
const userdata = require('../model/user_data');
const AuthenticateToken = require('../auth');

router.get('/getdata', async (req, res) => {
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
});

module.exports = router;