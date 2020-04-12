const router = require('express').Router();
var nodemailer = require('nodemailer');
const User = require('../model/User');
const PassReset = require('../model/PassReset');
const jwt = require('jsonwebtoken');



router.post('/sendresetmail', async(req, res) => {

    console.log(req.body.email);

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {

        console.log("emailExists");

        const resetCode = Math.floor(Math.random() * Math.floor(999999));

        var transport = nodemailer.createTransport({
            host: "hardcodelk.com",
            port: 465,
            auth: {
                user: "folk@hardcodelk.com",
                pass: "folk@1234"
            }
        });

        var mailOptions = {
            from: '"Folk Team" <folk@hardcodelk.com>',
            to: req.body.email,
            subject: 'Reset Password',
            text: 'Hey there, This is your password reset email',
            html: '<b>Hey there! </b><br> This is your password reset email<br />Use This Code For Login:' + resetCode,
        };

        transport.sendMail(mailOptions, async(error, info) => {
            if (error) {
                res.send({ status: "failed" });
                return console.log(error);
            }

            const PASSRESET = new PassReset({
                email: req.body.email,
                resetcode: resetCode
            });
            try {
                const savePASSRESET = await PASSRESET.save();

                res.send({ status: "sent" });
                console.log('Message sent');
            } catch (err) {
                res.status(400).send(err);
            }
        });
    } else {
        res.send({ status: "nouser" });
    }
});

router.post('/verifyemail', async(req, res) => {

    const resetExists = await PassReset.findOne({
        email: req.body.email,
        resetcode: req.body.code
    });
    if (resetExists) {
        await PassReset.deleteOne(resetExists);

        const user = await User.findOne({ email: req.body.email });

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

        res.header('auth-token', token).send({
            loginstatus: 'olduser',
            token: token
        });
    } else {
        res.send({
            message: 'invalid code'
        });
    }
});


module.exports = router;