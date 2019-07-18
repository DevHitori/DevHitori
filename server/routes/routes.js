require('dotenv').config()
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Visits = require('../../models/Visits');
var Order = require('../../models/orders');
const { catchAsync } = require('../utils');
var mongoose = require('mongoose');
// /payment/paypal?paymentId=PAYID-LUWRNMA13343502FY8385918&token=EC-1V11016209747594T&PayerID=6MGRBMJY4CUUN


router.get('/', function(req, res){
  res.render('index')
});
//
// router.get('/api/visits', (req, res, next) => {
// const { query } = req;
// const { unique } = query;
// y=0;
// if (!unique){
//   y = 1;
// }
//
// Visits.findOneAndUpdate(
//   { _id :'5c99a0da097a84738073b318'},
//   { $inc : { visits : 1, unique_visits : y } }, {new: true},
//   (err, doc) => {
//     if (err) {
//         console.log("Something wrong when updating data!");
//     }
//
//     return res.send({
//       visits: doc.visits,
//       unique_visits: doc.unique_visits
//     });
//
// });
//
// });


router.get('/payment/paypal', (req, res, next) => {
const { query } = req;
const { paymentId} = query;
// await mongoose.connect('mongodb+srv://Discord:ieQTvpPBftEZpvnl@cluster0-4w1ts.mongodb.net/testingPaypal3?retryWrites=true&w=majority', {useNewUrlParser: true});


if (paymentId) {

Order.findOneAndUpdate(
  { paymentID :paymentId},
  { $set : { paid : true} },
   (err, doc) => {
    if (err) {
        res.send('error')
    }


   // mongoose.connect(process.env.DB, {useNewUrlParser: true});
    res.send('Successfully Paid')
});
}
});



module.exports = router;
