const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../Validation/registerValidation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.post('/addItem', async(req, res) => {

    console.log(req.body);
    const verified = jwt.verify(req.body.token, process.env.TOKEN_SECRET);

    const user = new User({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        stock: req.body.stock,
        userID: verified._id,
    });
    try {
        const savedUser = await user.save();

        res.send({
            messege: 'success'
        });
    } catch (err) {
        res.send({
            messege: 'error'
        });
    }
});


module.exports = router;