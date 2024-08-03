const express = require('express');
const router = express.Router();
const Orders = require("../models/Orders.js")

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    
    // Log the type and content of req.body.order_data
    console.log("Type of order_data:", typeof data);
    console.log("Content of order_data:", data);

    // Ensure data is an array
    if (!Array.isArray(data)) {
        data = [];
    }

    await data.splice(0, 0, { order_data: req.body.order_data });


    let eId = await Orders.findOne({ 'email': req.body.email });
    console.log(eId);

    if (eId == null) {
        try {
            await Orders.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            console.log(error.message);
            res.status(400).send(error.message);
        }
    } else {
        try {
            await Orders.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            ).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
});

router.post('/myorderData',async(req,res)=>{
    try{
        let myData = await order.findOne({'email':req.body.email})
        res.json({orderData:myData})

    }catch(error){
        res.status(400).send(error.message);
    }
})

module.exports = router;