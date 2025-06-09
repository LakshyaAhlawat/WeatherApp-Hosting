const { response } = require('express');
const mongoose=require('mongoose');
const weatherSearchSchema=new mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  response:{
    type: Object, // Store the weather API response
    required: true
  },
  searchedAt: {
    type: Date,
    default: Date.now
  },
  
});

module.exports=mongoose.model('WeatherSearch',weatherSearchSchema);
// This model represents a weather search record, including the user who made the search,