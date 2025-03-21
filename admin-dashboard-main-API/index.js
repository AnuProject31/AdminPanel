const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const employee = require("./Models/Employees");
const conn = require("./dB/conn"); // MongoDB connection
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = require('./Middlewear/upload');
const cors = require("cors");

// const bodyParser = require("body-parser");

// Initialize app
const app = express();
const PORT = process.env.PORT || 5001;
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use('/uploads', express.static('uploads'));
app.use(cors({ origin: "*" }));

// Routes
app.get("/home", (req, res) => {
  console.log("Home Routing");
  res.send("Home Page");
});

app.get("/status", (req, res) => {
  res.send({ status: "Running" });
});

app.get("/about", (req, res) => {
  console.log("About Routing");
  res.send("About Page");
});

app.get("/contact", (req, res) => {
  console.log("Contact Routing");
  res.send("Contact Page");
});

app.get("/blog", (req, res) => {
  console.log("Blog Routing");
  res.send("Blog Page");
});

// Endpoint to upload a single image------
// app.post('/upload', upload.single('ProfilePicture'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No image uploaded');
//   }
//   res.status(200).send({
//     message: 'Image uploaded successfully',
//     file: req.file
//   });
// });
// -----------------------------------------
// Endpoint to upload and update profile picture------
const mongoose = require("mongoose");

app.post('/upload/:id', upload.single('ProfilePicture'), async (req, res) => {
  try {
    let userId = req.params.id.trim(); // Remove any leading/trailing spaces or characters

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ message: "Invalid user ID format" });
    }

    if (!req.file) {
      return res.status(400).send({ message: 'No image uploaded' });
    }

    // Update user profile picture
    const updatedUser = await employee.updateOne({ _id: userId }, { $set: { ProfilePicture: req.file.filename } });
    
    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send({
      message: 'Profile picture updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).send({ message: 'Server error', error: error.message });
  }
});
// Global error handler to catch Multer errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes("Only image files")) {
    return res.status(400).send({ message: err.message });
  }
  next(err);
});
//-------------------------------------------------------------------------------upload Images
//RegisterData---

// Registration Route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, address, salary, age } = req.body;
    console.log("response", req.body)
    if (await employee.findOne({ email })) {
      return res.status(400).json({ status: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = new employee({ name, email, password: hashedPassword, address, salary, age });
    await newEmployee.save();

    res.status(201).json({ status: true, message: "Employee registered successfully" });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
});
//RegisterDataEnd---
//Login----------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await employee.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.json({ status: true, message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
});
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await employee.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ status: false, message: "Invalid email or password" });
//     }
  
    // const validPassword = await bcrypt.compare(password, user.password);
    // const validPassword = await bcrypt.compare(password.trim(), user.password.trim());
    // console.log("password:", password);
    // console.log("user.password:", user.password);
    // console.log("validPassword:", validPassword);
    
    // if (!validPassword) {
    //   return res.status(400).json({ status: false, message: "Invalid email or password" });
    // }
  
    // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       SECRET_KEY,
//       { expiresIn: "1h" }
//     );
  
//     res.json({ status: true, message: "Login successful", token });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ status: false, message: "Server error" });
//   }
  
// });
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   // Find user in the database
//   const user = await employee.findOne({ email });
//   if (!user) {
//     return res.status(400).send("Invalid credentials!");
//   }

//   // Compare the provided password with the hashed password
//   const validPassword = await bcrypt.compare(password, user.password);
//   if (!validPassword) {
//     return res.status(400).send("Invalid credentials!");
//   }

  
//   const token = jwt.sign({ userId: user._id }, "your_jwt_secret", { expiresIn: "1h" });

//   res.json({ message: "Login successful", token });
// });


// GET: All Employee Data
app.get("/getAllData", async (req, res) => {
  try {
    const employees = await employee.find({isDelete: false}).sort({_id: -1});
    res.status(200).json({
      status: true,
      message: "All Employee Details",
      data: employees,
    });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
});

// GET: Employee Data by ID
app.get("/getAllDataByID/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await employee.findById(id);
    if (result) {
      res.status(200).json({
        status: true,
        message: "Employee details retrieved successfully",
        data: result,
      });
    } else {
      res.status(404).json({ status: false, message: "Data not found" });
    }
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
});

// DELETE: Employee by ID
app.delete("/deleteData/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // const result = await employee.findByIdAndDelete(id);
    const result = await employee.updateOne({ _id: id }, { $set: { isDelete: true} });
    if (result) {
      res.status(200).json({
        status: true,
        message: "Employee deleted successfully",
        data: result,
      });
    } else {
      res.status(404).json({ status: false, message: "Data not found" });
    }
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
});

// POST: Insert Employee Data
  // app.post("/insertEmployeeData", async (req, res) => {
  //   try {
  //     const { name, email, address, salary, age, password } = req.body;
  //     if (!name || !email || !address || !salary || !age || !password) {
  //       return res.status(400).json({ status: false, message: "All fields are required" });
  //     }
  //     if (await employee.findOne({ email })) {
  //       return res.status(400).json({ status: false, message: "Email already exists" });
  //     }
  //     const hashedPassword = await bcrypt.hash(password, 10);
  //     const newEmployee = new employee({ name, email, address, salary, age, password: hashedPassword });
  //     await newEmployee.save();
  //     res.status(201).json({ status: true, message: "Employee registered successfully" });
  //   } catch (err) {
  //     res.status(500).json({ status: false, error: err.message });
  //   }
  // });
  // Insert Employee Data Endpoint
app.post("/insertEmployeeData", async (req, res) => {
  try {
    const { name, email, address, salary, age, password } = req.body;

    // Validate all required fields
    if (!name || !email || !address || !salary || !age || !password) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }

    // Ensure password is a valid string
    const passwordStr = String(password);
    if (passwordStr.trim().length === 0) {
      return res.status(400).json({ status: false, message: "Invalid password format" });
    }

    // Convert salary and age to numbers
    const salaryNum = Number(salary);
    const ageNum = Number(age);

    if (isNaN(salaryNum) || isNaN(ageNum)) {
      return res.status(400).json({ status: false, message: "Salary and age must be valid numbers" });
    }

    // Check if email already exists
    const existingEmployee = await employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ status: false, message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(passwordStr, 10);

    // Create new employee
    const newEmployee = new employee({
      name,
      email,
      address,
      salary: salaryNum,
      age: ageNum,
      password: hashedPassword,
    });

    await newEmployee.save();
    res.status(201).json({ status: true, message: "Employee registered successfully" });
  } catch (err) {
    console.error("Error inserting employee:", err);
    res.status(500).json({ status: false, error: err.message });
  }
});
//  -------------------------------------
// POST: Update Employee Data by ID
// app.post("/updateEmployeeData/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { name, email, address, salary, age } = req.body;

//     const updateResult = await employee.updateOne({ _id: id }, { $set: { name, email, address, salary, age } });
//     if (updateResult.matchedCount === 0) {
//       res.status(404).json({ status: false, message: "Employee not found" });
//     } else {
//       res.status(200).json({ status: true, message: "Employee updated successfully" });
//     }
//   } catch (err) {
//     res.status(500).json({ status: false, error: err.message });
//   }
// });
app.put("/updateEmployeeData/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, address, salary, age } = req.body;

    const updatedEmployee = await employee.findByIdAndUpdate(
      id,
      { name, email, address, salary, age },
      { new: true } // ✅ Returns the updated document
    );

    if (!updatedEmployee) {
      return res.status(404).json({ status: false, message: "Employee not found" });
    }

    res.status(200).json({ status: true, message: "Employee updated successfully", data: updatedEmployee });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
});
//----------------------------------- UpdateEnd ---
// GET: Employee Data by Name
app.get("/getDataByName", async (req, res) => {
  try {
    const { name } = req.body;
    const result = await employee.find({ name });

    if (result.length > 0) {
      res.status(200).json({
        status: true,
        message: "Employee data fetched successfully",
        data: result,
      });
    } else {
      res.status(404).json({ status: false, message: "Employee not found" });
    }
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
});

// GET: Employee Data by Address and Salary
app.get("/getEmployeesByAddressAndSalary", async (req, res) => {
  try {
    const { address, salary } = req.body;

    const result = await employee.find({
      $and: [{ address }, { salary: { $gt: salary } }],
    });

    if (result.length > 0) {
      res.status(200).json({
        status: true,
        message: "Employees fetched successfully",
        data: result,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "No employees found with the specified criteria",
      });
    }
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
});

// GET: Employees Sorted by Age (Descending)
app.get("/getAllEmployeesSortedByAge", async (req, res) => {
  try {
    const result = await employee.find().sort({ age: -1 });
    res.status(200).json({
      status: true,
      message: "Employees fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
});

// GET: Employees by First Letter of Name
app.get("/getDataByFirstLetter/:letter", async (req, res) => {
  try {
    const { letter } = req.params;
    const result = await employee.find({ name: { $regex: `^${letter}`, $options: "i" } });

    if (result.length > 0) {
      res.status(200).json({
        status: true,
        message: "Employees found successfully",
        data: result,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "No employees found starting with the given letter",
      });
    }
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
});

// Start Server
// app.listen((`${process.env.PORT}`), () => {
//     console.log(`Server listening at port: ${process.env.PORT}`);
// })
app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});








































































































































































































// const http = require("http")
// const employee = require("./Models/Employees")
// const express = require("express");
// const bodyParser = require("body-parser");
// require('dotenv').config()
// const bcrypt = require("bcrypt")


// //mongodb connection------
// const conn = require("./dB/conn");



// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// // console.log("ENV DETAILS :" ,process.env.DATABASE_URL, process.env.PORT)
// app.get("/home",(request,response)=>{
//     console.log("Home Routing");
//     response.end("Home Page");
// });

// app.get("/status", (request, response) => {
//     const status = {
//        "Status": "Running"
//     };
    
//     response.send(status);
//  });

// app.get("/about",(request,response)=>{
//     console.log("About Routing");
//     response.send("About Page");
// });

// app.get("/contact",(request,response)=>{
//     console.log("Contact Routing");
//     response.send("Contact Page");
// });

// app.get("/blog",(request,response)=>{
//     console.log("Blog Routing");
//     response.send("Blog Page");
// });


// //Get API Create------
// app.get("/getAllData",async(rerquest,response)=>{
//     try {
//         const employees= await employee.find();
//         return response.status(200).json({
//             status: true,
//             messege: "All Employee Details",
//             data: employees,
//           });
//     } catch (error){
//         return response.status(500).json({
//             status: false,
//             error: err,
//           });
//     }
// });

// //Get API By ID------
// app.get("/getAllDataByID/:id",async(request,response)=>{
//     try {
//         const id = request.params.id;
//         const employees= await employee.findById(id);
//         if(employees){
//             return response.status(200).json({
//                 status: true,
//                 messege: "Employee details retrived Successfully",
//                 data: employees,
//               });

//         }
//         else{
//             return response.status(404).json({
//                 status: false,
//                 messege: "Data not found",
//               });
//         }
//     } catch (error){
//         return response.status(500).json({
//             status: false,
//             error: error,
//           });
//     }
// });

// //Delete By ID-----
// app.delete("/deleteData/:id", async (request,response)=>{
//     try {
//         const id = request.params.id;
//         const result= await employee.findByIdAndDelete(id);
//         if(result){
//             return response.status(200).json({
//                 status: true,
//                 messege: "Employee deleted successfully",
//                 data: result,
//         });
//         }
//          else {
//             return response.status(404).json({
//                 status: false,
//                 messege: "Data not found",
                
//               });
//         }
//         } catch (error){
//         return response.status(500).json({
//             status: false,
//             error: error,
//           });
//     } 
// });

// //INSERT DATA-----
// app.post('/insertEmployeeData', async (req, res) => {
//     try {
//       // Insert data
//         const data = req.body;
//         const password = req.body.password;
//         const saltRounds = 10;
//         console.log("Password Is:" , password);
//         bcrypt.hash(password, saltRounds, function(err, hash) {
//             console.log("Hash password: ", hash)
    
//         });
//         // if (req.body.name=="" || req.body.address=="" || req.body.salary==0 || req.body.age==0 || req.body.password==0){
//         //     return res.status(404).json({
//         //         status: false,
//         //         messege: "Please provide data",
//         //       });
            
//         // } else {
//         //     const newUser = {
//         //         name: req.body.name,
//         //         address: req.body.address,
//         //         salary: req.body.salary,
//         //         age: req.body.age,
//         //         password: req.body.password,
//         //     };
//         //     const newData = new employee(newUser);
//         //     // Insert the new user into the collection
//         //     const result= await newData.save();
//         //     return res.status(401).json({
//         //         status: true,
//         //         messege: "Employee Data Inserted",
//         //         data: result,       
//         // });
//         // }   
//     } catch (err) {
//         return res.status(500).json({
//             status: false,
//             error: error,
//           });
//     }
//   });


// // employee.find(function (err, employee) {
// //     if (err) return console.error(err);
// //     console.log(employee);
// // })   



// //Update the Data------
// app.post('/getAllDataByupdate/:id', async (req, res) => {
//     try {
//         const id = req.params.id; 
//         const { name, address, salary, age } = req.body;
//         const updateData = await employee.updateOne(
//             { _id: id },
//             { 
//                 $set: { name, address, salary, age } 
//             }
//         );
//         if (updateData.matchedCount === 0) {
//             return res.status(404).json({
//                 status: false,
//                 message: "Employee not found",
//             });
//         }
//         return res.status(200).json({
//             status: true,
//             message: "Employee updated successfully",
//         });
//     } catch (err) {
//         console.error("Error:", err); 
//         return res.status(500).json({
//             status: false,
//             error: err.message, 
//         });
//     }
// });


// //GET DATA BY NAME-----
// app.get('/getDataByName', async (req, res) => {

//     try{
//         const name = req.body.name;
//         console.log("Name is:", name);
//         const result= await employee.find({
//             name: name
//         });
//         if(result.length>0){
//             return res.status(200).json({
//                 status: true,
//                 message: "Employee data fetched successfully",
//                 data: result,
//             });
//         } else {
//             return res.status(404).json({
//                 status: false,
//                 message: "Employee not found",
//             });
//         }
        
//     }
//     catch (err) {
//         return res.status(500).json({
//             status: false,
//             error: err,
//           });

//     }
// });
    

// //get data by age-----
// app.get('/getDataByAddressAge', async (req, res) => {
//     try{
//         const { age } = req.query;
//         const result= await employee.find(
//             {age: {$gt:25}},
//             {name: 1, address: 1, _id: 0}
//         );
//         console.log("REsult is:", result)
//         if(result.length>0){
//             return res.status(200).json({
//                 status: true,
//                 message: "Employee data fetched successfully",
//                 data: result,
//             });
//         } else {
//             return res.status(404).json({
//                 status: false,
//                 message: "Employee not found",
//             });
//         }   
//     }
//     catch (err) {
//         console.error("Error:", err);
//         return res.status(500).json({
//             status: false,
//             error: err.message,
//           });
//     }
// });


// //Get Data By Address & Salary-----
// app.get('/getEmployeesByAddressAndSalary', async (req, res) => {
//     try {
//         const { address, salary} = req.body;

//         const result = await employee.find({
//             $and: [
//                 { address: address },  // Condition 1: address is Kolkata
//                 { salary: { $gt: salary } }  // Condition 2: salary greater than 40000
//             ]
//         });
//         if (result.length > 0) {
//             return res.status(200).json({
//                 status: true,
//                 message: "Employees found successfully",
//                 data: result
//             });
//         } else {
//             return res.status(404).json({
//                 status: false,
//                 message: "No employees found with the specified criteria"
//             });
//         }
//     } catch (err) {
//         console.error("Error:", err);
//         return res.status(500).json({
//             status: false,
//             error: err.message 
//         });
//     }
// });

// // get data to display all data in decending order respect to age------
// app.get('/getAllEmployeesSortedByAge', async (req, res) => {
//     try {
//         // Query to find all employees and sort them in descending order by age
//         const result = await employee.find().sort({ age: -1 });  // -1 means descending order

//         // If results are found
//         if (result.length > 0) {
//             return res.status(200).json({
//                 status: true,
//                 message: "Employees fetched successfully",
//                 data: result,
//             });
//         } else {
//             return res.status(404).json({
//                 status: false,
//                 message: "No employees found",
//             });
//         }
//     } catch (err) {
//         console.error("Error:", err);  // Log error for debugging
//         return res.status(500).json({
//             status: false,
//             error: err.message,  // Send error message
//         });
//     }
// });



// //Get Data By First Letter Of Name-----
// app.get('/getDataByFirstLetter/:letter', async (req, res) => {
//     try {
//         const letter = req.params.letter; 
//         if (!letter) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Invalid or missing character.",
//             });
//         }
//         const result = await employee.find({
//             name: { $regex: `^${letter}`, }
//         });
//         if (result.length > 0) {
//             return res.status(200).json({
//                 status: true,
//                 message: "Employees found successfully",
//                 data: result,
//             });
//         } else {
//             return res.status(404).json({
//                 status: false,
//                 message: "No employees found starting with the given letter",
//             });
//         }
//     } catch (err) {
//         console.error("Error:", err);
//         return res.status(500).json({
//             status: false,
//             error: err.message,
//         });
//     }
// });




// //Show User------
// async function showUsers(){
//     try {
//         const employees= await employee.find();
//         console.log("Users:", employees);
//     } catch (error){
//         console.log("Error fetching users:", error);
//     }
    
// }
// // showUsers();


// //Delete User-----
// async function deleteUsersById(userId){
//      try {
//         const result= await employee.findByIdAndDelete(userId);
//         if(result){
//             console.log("User deleted:", result);
//         } else {
//             console.log("User not found");
//         }
//         console.log("Users:", employee);
//     } catch (error){
//         console.log("Error deleting users:", error);
//     } 
// }
// // deleteUsersById('6700b417c8dbd31487c73bf9');



// //insert----
// // const { MongoClient } = require('mongodb');
// // MongoDB URL
// // const url = 'mongodb://localhost:27017';  // Replace with your MongoDB URI
// async function insertData() {
    
//     try { 
//         //store data----
//         const newUser = {
//             name: 'Anu',
//             address: 'Agarpara',
//             salary: '50000000',
//             age: '24',
//         };
//         const newData = new employee(newUser);

//         // Insert the new user into the collection
//         const result= await newData.save();
//         console.log(`User inserted`);
//     } catch (err) {
//         console.error('Error inserting data:', err);
//     } 
// }  
// // Run the function to insert data
// //insertData();


// //update-----
// async function updateData(){
//     try {
//         await employee.updateOne({_id: ('6700b417c8dbd31487c73bf8')}, { $set: {name: 'SRINIKA', address: 'NORTH 24 PARGANAS', salary:500000, age: 24}});
//     }
//     catch (err) {
//         console.error('Error inserting data:', err);

//     }
// }
// //updateData();


// // Creating server -------
// // const server = http.createServer((req, res) => {
// //     // Sending the response
// //     res.write("This is the response from the server")
// //     res.end();
// // })



// // Server listening to port 3000
// app.listen((`${process.env.PORT}`), () => {
//     console.log(`Server listening at port: ${process.env.PORT}`);
// })