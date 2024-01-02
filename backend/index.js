import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/bookroute.js'

import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/books', booksRoute);


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    author:Boolean,
})

const User = new mongoose.model("User", userSchema)

//routes routes
app.post("/Login",async(request,response)=>{
 const {email,password}=request.body;
 User.findOne({email:email})
 .then(user =>{
  if(user){
    if(user.password===password){
      response.json(user)
    }else{
      return response.status(404).json({ message: 'invalid data' });
    }
  }
 })

  })
app.post("/Register",async(request,response)=>{
  console.log("ooo")
  try {
    if (
      !request.body.name||
      !request.body.email||
      !request.body.password
    ) {
      return response.status(400).send({
        message: 'Send all required fields: name, email, password',
      });
    }
    const newUser = {
      tinametle: request.body.name,
      email: request.body.email,
      password: request.body.password,
      author:request.body.author
    };

    const user = await User.create(newUser);

    return response.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
}) 