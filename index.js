import express from "express"
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

import student from "./models/student.js"

const app = express();

app.use(express.json());
mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log("mongo DB connected")
})
app.get('/health',(req,res)=>{
   res.json({
    status : 'ok',
    message: 'All good'
   })
})

app.post('/create-student', async(req,res)=>{
    const {roll,fullName,Mobile} = req.body

    const newstudent = new student({
        roll: roll,
        fullName: fullName,
        Mobile: Mobile
    })

    const savedStudent = await newstudent.save()

    res.json({
        success:true,
        data:savedStudent
    })
})

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})
