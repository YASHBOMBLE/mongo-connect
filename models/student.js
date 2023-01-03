import { model,mongoose, Schema } from "mongoose";

const studentSchema = new Schema({
  roll: Number,
  fullName: String,
  mobile: Number
})

const Student = mongoose.model("Student", studentSchema)

export default Student