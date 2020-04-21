const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../Validation/registerValidation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.post('/adminlogin', async(req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        usertype: "admin"
    });
    if (!user) return res.status(400).send({ message: 'Email Not Exist' });

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) return res.status(400).send({ message: 'Password Not Valid' });

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);


    res.header('auth-token', token).send({
        loginstatus: 'olduser',
        status: user.status,
        token: token,
        usertype: user.usertype
    });
});

router.post('/getusers', async(req, res) => {

    const users = await User.find();

    res.send(users);

});


router.post('/updatestatus', async(req, res) => {

    var query = { _id: req.body.userid };

    var newVal = {
        $set: {
            status: req.body.status

        }
    }

    await User.updateOne(query, newVal, function(err) {
        if (err) {
            res.send(err);
        }
        res.send({ "message": "success" })
    });
});



module.exports = router;