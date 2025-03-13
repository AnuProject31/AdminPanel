const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");



const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  salary: { type: Number, required: true },
  isDelete: {type: Boolean, required: false, default:  false},
  age: { type: Number, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

employeeSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};
const employeeModel = new mongoose.model("employees", employeeSchema)
module.exports = employeeModel;




// const mongoose = require ("mongoose");
// const bcrypt = require("bcryptjs");
// const employeeSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         require: true
//     },
//     email: {
//         type: String,
//         require: true,
//         unique: true, // Ensure email uniqueness
//       lowercase: true, // Normalize emails
//       trim: true
//     },
//     address: {
//         type: String,
//         require: true
//     },
//     salary: {
//         type: Number,
//         require: true
//     },
//     age: {
//         type: Number,
//         require: true
//     },
//     password: {
//         type: String,
//         require: true
//     }
// },
// {
//     timestamps: true
// });
// employeeSchema.pre("save", async function (next) {
//     if (this.isModified("password")) {
//       this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
//   });
// employeeSchema.pre("save", async function (next) {
//     if (this.isModified("password")) {
//       const salt = await bcrypt.genSalt(10);
//       this.password = await bcrypt.hash(this.password, salt);
//     }
//     next();
//   });
  
//   // 🔹 Compare Passwords (for Login)
//   employeeSchema.methods.comparePassword = async function (enteredPassword) {
//     return bcrypt.compare(enteredPassword, this.password);
//   };

// const employeeModel = new mongoose.model("employees", employeeSchema)
// module.exports=employeeModel;