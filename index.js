import express from "express"
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

import Student from "./models/Student.js"

const app = express();
app.use(express.json())

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser: true}, ()=>{
  console.log('connected to mongodb')
})

app.get("/health", (req, res)=>{
  res.json({
    status: 'OK',
    message: 'All Good'
  })
})

app.post('/create-student', async(req, res)=>{
  const {roll, fullName, mobile} = req.body

  const newStudent = new Student({
    roll: roll,
    fullName: fullName,
    mobile: mobile
  })

  const savedStudent = await newStudent.save()

  res.json({
   success: true,
   data: savedStudent
  })
})

app.post('/update-student',async (req,res)=>{
  const {roll,fullName,mobile} = req.body;

  const result = await Student.updateOne(
    {
      roll : roll
    },
    {
    fullName : fullName,
    mobile : mobile
  })
  
})

app.post('/delete-student',async (req,res)=>{
  const {roll} = req.body;
  const result = await Student.deleteOne(
    {
      roll:roll
    }
  )
  res.send({
    success : true,
    message : "Student deleted successfully"
  })
})

app.listen(5000, ()=>{
  console.log('Server started running on PORT 5000')
})