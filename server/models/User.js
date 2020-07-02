const  mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
      name:String
    });
exports.User = mongoose.model('User', userSchema);