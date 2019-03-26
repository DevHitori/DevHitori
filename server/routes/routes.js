var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Visits = require('../../models/Visits');


router.get('/', function(req, res){
  res.render('index')
});

router.get('/api/visits', (req, res, next) => {
const { query } = req;
const { unique } = query;
y=0;
if (!unique){
  y = 1;
}

Visits.findOneAndUpdate(
  { _id :'5c99a0da097a84738073b318'},
  { $inc : { visits : 1, unique_visits : y } }, {new: true},
  (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }

    return res.send({
      visits: doc.visits,
      unique_visits: doc.unique_visits
    });

});

});



module.exports = router;
