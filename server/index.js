const express = require('express');
const {PORT} = require('./config')
const {models, connectDb} = require('./mongo')
const app = express();
 
app.get('/api/tasks', (req, res)=> {
  const users = models.User.find()
  console.log(users)
})

connectDb()
.then(async () => {
  app.listen(PORT, () =>
    console.log(`Task-app listening on port ${PORT}!`),
  );
})
.catch(err=>{
  console.log('Database connection error')
  console.log('err')
});