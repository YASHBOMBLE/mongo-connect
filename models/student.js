import {model, Schema} from "mongoose";

const studentSchema = new Schema({
    roll: Number,
    fullName: String,
    Mobile: Number
})

const student = model("student",studentSchema)

export default student