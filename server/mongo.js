import mongoose from 'mongoose';
import User from './models/User.js';
import Task from './models/Task.js';
 
const connectDb = () => {
  return mongoose.connect("mongodb://localhost:27017/myDb", {useUnifiedTopology: true});
};
 
const models = { User, Task };
 
export default connectDb
