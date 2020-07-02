const  mongoose = require('mongoose')
console.log(mongoose)
const userSchema = new mongoose.Schema(
    {
      name:String
    });
const userModel = mongoose.model('User', userSchema);

let User = {
    schema: userSchema,
    model : userModel 
}
exports.User = User