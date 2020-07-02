//TODO: refactor here
const mongoose = require('mongoose');
var schema = new mongoose.Schema({ name: 'string'});
var User = mongoose.model('user', schema);

console.log('costam')
mongoose.connect('mongodb://localhost/mydb', {useUnifiedTopology: true,useNewUrlParser: true});
console.log('costam')

testModel.findOne(function(error, result) { /* ... */ });
