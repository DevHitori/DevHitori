//models/Expense.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var VisitsSchema = new Schema({
  visits: Number,
  unique_visits: Number
});
module.exports = mongoose.model('Visits', VisitsSchema);
