const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Task') ;
const {DATABASE_URL} = require ('./config')
const connectDb = () => {
  return mongoose.connect(DATABASE_URL, {useUnifiedTopology: true});
};
 
exports.connectDb = connectDb
