const express = require('express');
const {config} = require('./config');
const {mongo} = require('./mongo');
const app = express();
mongo.connect()
.then(() => {
  app.use(require('./router'))
  app.listen(config.db.PORT, () =>{
    console.log(`Task-app listening on port ${config.db.PORT}!`);
    
  }
  );
})
.catch(err=>{
  console.log('Database connection error');
  console.log(err);
});