const router = require('express').Router();
const Sale = require('../model/Sale');
// const { postValidation } = require('../Validation/postValidation');
const jwt = require('jsonwebtoken');
// const Geo = require('geo-nearby');


router.post('/newsale', async(req, res) => {


    const verified = jwt.verify(req.body.token, process.env.TOKEN_SECRET);


    const sale = new Sale({
        userID: verified._id,
        saledata: req.body.saledata,
        total: req.body.total,
        saletime: req.body.saletime
    });
    try {
        // console.log(post);
        const savesale = await sale.save();

        res.send({
            status: 'success',
            _id: sale._id
        });
    } catch (err) {
        res.status(400).send(err);
    }
});




module.exports = router;