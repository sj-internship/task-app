import express from 'express';
import connectDb from './mongo.js';
const app = express();
 
connectDb().then(async () => {
  app.listen(3000, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});