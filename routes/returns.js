const router = require('express').Router();
const Return = require('../model/Return');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.post('/addreturn', async(req, res) => {

    console.log(req.body);
    const verified = jwt.verify(req.body.token, process.env.TOKEN_SECRET);

    const retuen = new Return({
        name: req.body.name,
        description: req.body.description,
        returnDate: req.body.returnDate,
        userID: verified._id,
    });
    try {
        const savedItem = await retuen.save();

        res.send({
            messege: 'success'
        });
    } catch (err) {
        res.send({
            messege: 'error'
        });
    }
});


router.post('/getmine', async(req, res) => {

    console.log(req.body);
    const verified = jwt.verify(req.body.token, process.env.TOKEN_SECRET);

    const returns = await Return.find({
        userID: verified._id
    });

    res.send(returns);

});


router.post('/removereturn', async(req, res) => {

    try {
        await Return.deleteOne({
            _id: req.body.returnID
        });
        res.send({ "message": "success" });
    } catch (error) {
        res.send({ error });
    }
});

module.exports = router;