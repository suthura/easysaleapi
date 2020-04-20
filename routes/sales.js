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


router.post('/getmysales', async(req, res) => {

    const verified = jwt.verify(req.body.token, process.env.TOKEN_SECRET);


    const sales = await Sale.find({
        userID: verified._id
    }).sort({ saletime: -1 });

    res.send(sales);
});

router.post('/getmyweeksales', async(req, res) => {

    function remDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() - days);
        console.log(result);

        return result;
    }

    const verified = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
    const date = req.body.currentdate;


    const sales = await Sale.find({
        userID: verified._id,
        saletime: {
            "$gte": remDays(date, 7),
            "$lt": date
        }
    }).sort({ saletime: -1 });

    res.send(sales);
});

module.exports = router;