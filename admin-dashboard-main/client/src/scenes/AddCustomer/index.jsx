import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../components/Header";

const AddCustomer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    salary: "",
    age: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const response = await axios.post("http://localhost:5001/insertEmployeeData", formData);
      console.log(response)
      if (response.data.status) {
        toast.success("Customer added successfully!");
        navigate("/customers", { state: { refresh: Date.now() } }); // Ensure refresh triggers
      } else {
        toast.error(response.data.message || "Failed to add customer.");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      toast.error("Failed to add customer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Header title="Add Customer" />
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        
        <label>Salary:</label>
        <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
        
        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit" style={styles.submitButton} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
  },
  submitButton: {
    backgroundColor: "blue",
    color: "white",
    padding: "10px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
  },
};

export default AddCustomer;























// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";
// import { useTheme } from "@mui/material/styles";
// import { Box } from "@mui/material";
// import Header from "../../components/Header";

// const AddCustomer = () => {
//   const theme = useTheme();
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//     return (
//     <div style={{ padding: "20px", backgroundColor: theme.palette.background.default, color: theme.palette.primary.main }}>
//       <Box m="1.5rem 2.5rem" style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
//         <Header title="Add Customer" />
        
//       </Box>
//     </div>
//   );
// };

// const styles = {
//   th: { padding: "10px", textAlign: "left" },
//   td: { padding: "10px" },
//   evenRow: { backgroundColor: "#f0f0f0" },
//   oddRow: { backgroundColor: "#ffffff" },
//   addButton: {
//     backgroundColor: "green",
//     color: "white",
//     border: "none",
//     padding: "10px",
//     cursor: "pointer",
//     borderRadius: "5px",
//     float: "right",
//     marginBottom: "10px",
//   },
//   editButton: {
//     backgroundColor: "blue",
//     color: "white",
//     border: "none",
//     padding: "5px 10px",
//     cursor: "pointer",
//     borderRadius: "5px",
//     marginRight: "5px",
//   },
//   deleteButton: {
//     backgroundColor: "red",
//     color: "white",
//     border: "none",
//     padding: "5px 10px",
//     cursor: "pointer",
//     borderRadius: "5px",
//   },
// };

// export default AddCustomer;