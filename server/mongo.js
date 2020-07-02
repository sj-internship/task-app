//TODO: refactor here
const mongoose = require('mongoose');
let testModel = mongoose.model('users', (req,res)=>{
    name:String
})
console.log('costam')
mongoose.connect('mongodb://localhost/mydb', {useUnifiedTopology: true,useNewUrlParser: true});
console.log('costam')

testModel.findOne(function(error, result) { /* ... */ });
