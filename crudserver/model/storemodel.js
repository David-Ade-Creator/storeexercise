const mongoose = require('mongoose');

// answer schema
const storeScheama = new mongoose.Schema(
  {
    storename: {
      type: String,
      required: true
    },
    aptname: {
        type: String,
        trim: true
      },
    locality: {
        type: String,
        trim: true,
        required:true
    },
    street: {
        type: String,
        trim: true
    },
    zipcode: {
        type:String,
        required:true
    },
    lat:{
      type:Number,
      required:true
    },
    lng:{
      type:Number,
      required:true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Store', storeScheama);