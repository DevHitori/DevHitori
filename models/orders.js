const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: {type: String, required: true},
  gamename:{type:String},
  facebookId: {type:String},
  facebookPass: {type:String},
  authenCode:{type:String},
  device: {type:String},
  largePacks: {type: String, required: true},
  mediumPacks: {type: String, default: null},
  paid: {type: Boolean, required: true},
  paymentdetails:{type: Object, default: null},
  paymentID:{type: String, default: null}
});

module.exports = mongoose.model("orders", ordersSchema);
