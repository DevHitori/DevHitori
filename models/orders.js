const mongoose = require("mongoose");

const NewOrdersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  discordID: {type: String, required: true},
  discordName: {type: String, required:true},
  ign:{type:String},
  facebookId: {type:String},
  facebookPass: {type:String},
  authenCode:{type:String},
  device: {type:String},
  largePacks: {type: String, required: true},
  mediumPacks: {type: String, default: null},
  paid: {type: Boolean, required: true},
  paymentdetails:{type: Object, default: null},
  typeOfLarge:{type: String},
  typeOfMedium:{type: String},
  timeStamps: {type:Object, required: true}
});

module.exports = mongoose.model("new_orders", NewOrdersSchema);
