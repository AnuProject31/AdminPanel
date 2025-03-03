

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { RingLoader } from "react-spinners";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useTheme } from "@mui/material/styles";

// const CompaniesList = () => {
//   const theme = useTheme();
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch Data from Backend
//   const getData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5001/getAllData");
//       setEmployees(response.data.data || []);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   // Delete Employee
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this data?")) {
//       try {
//         await axios.delete(`http://localhost:5001/deleteData/${id}`);
//         toast.success("This data was deleted successfully!", { autoClose: 2000 });
//         getData(); // Refresh data
//       } catch (error) {
//         toast.error("Delete failed!");
//       }
//     }
//   };

//   // Edit Employee
//   const handleEdit = async (emp) => {
//     const updatedData = {
//       ...emp,
//       name: prompt("Edit Name", emp.name) || emp.name,
//       email: prompt("Edit Email", emp.email) || emp.email,
//       address: prompt("Edit Address", emp.address) || emp.address,
//       salary: prompt("Edit Salary", emp.salary) || emp.salary,
//       age: prompt("Edit Age", emp.age) || emp.age,
//     };

//     if (window.confirm("Are you sure you want to update this data?")) {
//       try {
//         const response = await axios.put(`http://localhost:5001/updateEmployeeData/${emp._id}`, updatedData);
//         if (response.data.status) {
//           toast.success("Data updated successfully!");
//           setEmployees(employees.map(item => (item._id === emp._id ? { ...updatedData, createdAt: emp.createdAt } : item))); // Keep createdAt unchanged
//         } else {
//           toast.error("Update failed!");
//         }
//       } catch (error) {
//         toast.error("Update failed!");
//       }
//     }
//   };

//   // Add Employee
//   const handleAdd = async () => {
//     const newEmp = {
//       name: prompt("Enter Name"),
//       email: prompt("Enter Email"),
//       address: prompt("Enter Address"),
//       salary: prompt("Enter Salary"),
//       age: prompt("Enter Age"),
//       password: "default123", // Default password for validation
//     };

//     if (!newEmp.name || !newEmp.email || !newEmp.address || !newEmp.salary || !newEmp.age) {
//       return toast.error("All fields are required!");
//     }

//     if (window.confirm("Are you sure you want to add this data?")) {
//       try {
//         const response = await axios.post("http://localhost:5001/insertEmployeeData", newEmp);
//         if (response.data.status) {
//           toast.success("New employee added successfully!");
//           getData(); // Refresh data
//         } else {
//           toast.error(response.data.message);
//         }
//       } catch (error) {
//         toast.error("Adding failed!");
//       }
//     }
//   };

//   if (loading) {
//     return <div style={{ textAlign: "center", marginTop: "50px" }}><RingLoader color="red" size={50} /></div>;
//   }

//   if (error) {
//     return <div style={{ color: "red", textAlign: "center" }}>Error: {error.message}</div>;
//   }

//   return (
//     <div style={{ padding: "20px", backgroundColor: theme.palette.background.default, color: theme.palette.primary.main }}>
//       {/* <h1 style={{ textAlign: "left", color: theme.palette.secondary.main }}>Customer List</h1>
//       <h3 style={{ textAlign: "left", color: theme.palette.secondary.light }}>List of all customers</h3> */}
//       <Box m="1.5rem 2.5rem" style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
//       <Header title="Customer List" subtitle="List of all customers" />
//       <Box mt="40px"></Box>
//       <button onClick={handleAdd} style={styles.addButton}>Add</button>
//       <table style={{ width: "100%", backgroundColor: theme.palette.background.alt, color: theme.palette.text.primary }}>
//         <thead>
//           <tr style={{ borderBottom: `2px solid ${theme.palette.primary.main}` }}>
//             <th style={styles.th}>Name</th>
//             <th style={styles.th}>Email</th>
//             <th style={styles.th}>Address</th>
//             <th style={styles.th}>Salary</th>
//             <th style={styles.th}>Age</th>
//             <th style={styles.th}>Date</th>
//             <th style={styles.th}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.length > 0 ? (
//             employees.map((emp, index) => (
//               <tr key={emp._id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
//                 <td style={styles.td}>{emp.name}</td>
//                 <td style={styles.td}>{emp.email}</td>
//                 <td style={styles.td}>{emp.address}</td>
//                 <td style={styles.td}>{emp.salary}</td>
//                 <td style={styles.td}>{emp.age}</td>
//                 <td style={styles.td}>{new Date(emp.createdAt).toLocaleDateString()}</td>
//                 <td>
//                   <button onClick={() => handleEdit(emp)} style={styles.editButton}>Edit</button>
//                   <button onClick={() => handleDelete(emp._id)} style={styles.deleteButton}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>No Employees Found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
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

// export default CompaniesList;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import Header from "../../components/Header";

const CompaniesList = () => {
  const theme = useTheme();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Data from Backend
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/getAllData");
      setEmployees(response.data.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Delete Employee
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      try {
        await axios.delete(`http://localhost:5001/deleteData/${id}`);
        toast.success("This data was deleted successfully!", { autoClose: 2000 });
        getData(); // Refresh data
      } catch (error) {
        toast.error("Delete failed!");
      }
    }
  };

  // Edit Employee
  const handleEdit = async (emp) => {
    const updatedData = {
      ...emp,
      name: prompt("Edit Name", emp.name) || emp.name,
      email: prompt("Edit Email", emp.email) || emp.email,
      address: prompt("Edit Address", emp.address) || emp.address,
      salary: prompt("Edit Salary", emp.salary) || emp.salary,
      age: prompt("Edit Age", emp.age) || emp.age,
    };

    if (window.confirm("Are you sure you want to update this data?")) {
      try {
        const response = await axios.put(`http://localhost:5001/updateEmployeeData/${emp._id}`, updatedData);
        if (response.data.status) {
          toast.success("Data updated successfully!");
          setEmployees(employees.map(item => (item._id === emp._id ? { ...updatedData, createdAt: emp.createdAt } : item))); // Keep createdAt unchanged
        } else {
          toast.error("Update failed!");
        }
      } catch (error) {
        toast.error("Update failed!");
      }
    }
  };

  // Add Employee
  const handleAdd = async () => {
    const newEmp = {
      name: prompt("Enter Name"),
      email: prompt("Enter Email"),
      address: prompt("Enter Address"),
      salary: prompt("Enter Salary"),
      age: prompt("Enter Age"),
      password: "default123", // Default password for validation
    };

    if (!newEmp.name || !newEmp.email || !newEmp.address || !newEmp.salary || !newEmp.age) {
      return toast.error("All fields are required!");
    }

    if (window.confirm("Are you sure you want to add this data?")) {
      try {
        const response = await axios.post("http://localhost:5001/insertEmployeeData", newEmp);
        if (response.data.status) {
          toast.success("New employee added successfully!");
          getData(); // Refresh data
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Adding failed!");
      }
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}><RingLoader color="red" size={50} /></div>;
  }

  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>Error: {error.message}</div>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: theme.palette.background.default, color: theme.palette.primary.main }}>
      <Box m="1.5rem 2.5rem" style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
        <Header title="Customer List" subtitle="List of all customers" />

        {/* Button Section (Wrapped in Box for Structure) */}
        <Box mt="40px">
          <button onClick={handleAdd} style={styles.addButton}>Add</button>
        </Box>

        {/* Table Section */}
        <table style={{ width: "100%", backgroundColor: theme.palette.background.alt, color: theme.palette.text.primary }}>
          <thead>
            {/* <tr style={{ borderBottom: `2px solid ${theme.palette.primary.main}` }}> */}
            <tr style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Salary</th>
              <th style={styles.th}>Age</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp, index) => (
                // <tr key={emp._id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <tr key={index} style={index % 2 === 0 ? { backgroundColor: theme.palette.action.hover } : {}}>
                  <td style={styles.td}>{emp.name}</td>
                  <td style={styles.td}>{emp.email}</td>
                  <td style={styles.td}>{emp.address}</td>
                  <td style={styles.td}>{emp.salary}</td>
                  <td style={styles.td}>{emp.age}</td>
                  <td style={styles.td}>{new Date(emp.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleEdit(emp)} style={styles.editButton}>Edit</button>
                    <button onClick={() => handleDelete(emp._id)} style={styles.deleteButton}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>No Employees Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </Box>
    </div>
  );
};

const styles = {
  th: { padding: "10px", textAlign: "left" },
  td: { padding: "10px" },
  evenRow: { backgroundColor: "#f0f0f0" },
  oddRow: { backgroundColor: "#ffffff" },
  addButton: {
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "5px",
    float: "right",
    marginBottom: "10px",
  },
  editButton: {
    backgroundColor: "blue",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
    marginRight: "5px",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default CompaniesList;
