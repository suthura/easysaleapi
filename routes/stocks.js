const router = require('express').Router();
const Item = require('../model/Item');
const { registerValidation } = require('../Validation/registerValidation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.post('/addItem', async(req, res) => {

    console.log(req.body);
    const verified = jwt.verify(req.body.token, process.env.TOKEN_SECRET);

    const item = new Item({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        stock: req.body.stock,
        userID: verified._id,
    });
    try {
        const savedItem = await item.save();

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

    const items = await Item.find({
        userID: verified._id
    });

    res.send(items);

});

router.post('/updateitem', async(req, res) => {

    var query = { _id: req.body.itemid };

    var newVal = {
        $set: {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            stock: req.body.stock
        }
    }

    await Item.updateOne(query, newVal, function(err) {
        if (err) {
            res.send(err);
        }
        res.send({ "message": "success" })
    });
});

router.post('/updateStock', async(req, res) => {

    var query = { _id: req.body.itemid };

    var newVal = {
        $set: {
            stock: req.body.newStock

        }
    }

    await Item.updateOne(query, newVal, function(err) {
        if (err) {
            res.send(err);
        }
        res.send({ "message": "success" })
    });
});

router.post('/removeitem', async(req, res) => {

    try {
        await Item.deleteOne({
            _id: req.body.itemid
        });
        res.send({ "message": "success" });
    } catch (error) {
        res.send({ error });
    }
});

module.exports = router;