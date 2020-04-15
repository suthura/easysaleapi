const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../Validation/registerValidation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.post('/register', async(req, res) => {

    console.log(req.body);

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email Already Exists');

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedpassword,
        usertype: req.body.usertype
    });
    try {
        const savedUser = await user.save();

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

        res.header('auth-token', token).send({
            loginstatus: 'olduser',
            status: user.status,
            token: token,
            usertype: user.usertype
        });
    } catch (err) {
        res.send({
            messege: 'error'
        });
    }
});

router.post('/login', async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
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



module.exports = router;