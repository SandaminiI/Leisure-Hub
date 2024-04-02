const mongoose = require("mongoose"); //kalin wage mongoos add karanna

const Schema = mongoose.Schema; //schema set karanna

const RateSchema = new Schema({
  filmname: {
    type: String, //type
    required: true, //validation
  },
  name: {
    type: String, //type
    required: true, //validation
  },
  gmail: {
    type: String, //type
    required: true, //validation
  },
  ratestar: {
    type: String, //type
    required: true, //validation
  },
  comment: {
    type: String, //type
    required: true, //validation
  },
});

module.exports = mongoose.model("Rate", RateSchema); //schema eka send karanna
