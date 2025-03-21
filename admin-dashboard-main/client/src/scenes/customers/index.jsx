// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { RingLoader } from "react-spinners";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useTheme } from "@mui/material/styles";
// import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
// import { Search } from "@mui/icons-material";
// import Header from "../../components/Header";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

// const CompaniesList = () => {
//   const theme = useTheme();
//   const [employees, setEmployees] = useState([]); // Full data
//   const [filteredEmployees, setFilteredEmployees] = useState([]); // Filtered data
//   const [searchTerm, setSearchTerm] = useState(""); // Search term
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     getData();
//   }, [location.state?.refresh]); // Re-fetch when `refresh` state changes

//   // Fetch Data from Backend
//   const getData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5001/getAllData");
//       setEmployees(response.data.data || []);
//       setFilteredEmployees(response.data.data || []); // Initially, filtered data is the same as full data
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   // Handle Search Input Change
//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);

//     if (value === "") {
//       setFilteredEmployees(employees); // Reset if search is empty
//     } else {
//       const filtered = employees.filter((item) =>
//         item.name.toLowerCase().includes(value)
//       );
//       setFilteredEmployees(filtered);
//     }
//   };

//   // Delete Employee
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this data?")) {
//       try {
//       const response = await axios.delete(`http://localhost:5001/deleteData/${id}`);
//       console.log(response)
//         if(response.data.status === true){
//           alert(response.data.message)
//           toast.success("This data was deleted successfully!");
//           getData();
//         } 
//          // Refresh data
//       } catch (error) {
//         toast.error("Delete failed!");
//       }
//     }
//   };

//   // Edit Employee
//   const handleEdit = (customer) => {
//     navigate("/editcustomer", { state: { id: customer._id } }); // Pass customer ID
//   };

//   // Add Employee
//   const handleAdd = () => {
//     navigate("/addcustomer");
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <RingLoader color="red" size={50} />
//       </div>
//     );
//   }

//   if (error) {
//     return <div style={{ color: "red", textAlign: "center" }}>Error: {error.message}</div>;
//   }

//   return (
//     <div
//       style={{
//         padding: "20px",
//         backgroundColor: theme.palette.background.default,
//         color: theme.palette.primary.main,
//       }}
//     >
//       <Box m="1.5rem 2.5rem">
//         <Header title="Customer List" subtitle="List of all customers" />

//         {/* Search Input */}
//         <Box mt="20px" mb="20px">
//           <TextField
//             variant="outlined"
//             placeholder="Search Customers..."
//             value={searchTerm}
//             onChange={handleSearch}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <IconButton>
//                     <Search />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               width: "300px",
//               backgroundColor: "white",
//               borderRadius: "5px",
//             }}
//           />
//         </Box>

//         {/* Button Section */}
//         <Box mt="20px">
//           <button onClick={handleAdd} style={styles.addButton}>Add</button>
//         </Box>

//         {/* Table Section */}
//         <table
//           style={{
//             height: "200%",
//             width: "100%",
//             backgroundColor: theme.palette.background.alt,
//             color: theme.palette.text.primary,
//             marginTop: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
//               <th style={styles.th}>Name</th>
//               <th style={styles.th}>Email</th>
//               <th style={styles.th}>Address</th>
//               <th style={styles.th}>Salary</th>
//               <th style={styles.th}>Age</th>
//               <th style={styles.th}>Date</th>
//               <th style={styles.th}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEmployees.length > 0 ? (
//               filteredEmployees.map((emp, index) => (
//                 <tr key={index} style={index % 2 === 0 ? { backgroundColor: theme.palette.action.hover } : {}}>
//                   <td style={styles.td}>{emp.name}</td>
//                   <td style={styles.td}>{emp.email}</td>
//                   <td style={styles.td}>{emp.address}</td>
//                   <td style={styles.td}>{emp.salary}</td>
//                   <td style={styles.td}>{emp.age}</td>
//                   <td style={styles.td}>{new Date(emp.createdAt).toLocaleDateString()}</td>
//                   <td>
//                     <button onClick={() => handleEdit(emp)} style={styles.editButton}>Edit</button>
//                     <button onClick={() => handleDelete(emp._id)} style={styles.deleteButton}>Delete</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>No Employees Found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </Box>
//     </div>
//   );
// };

// // Styles for Buttons and Table Elements
// const styles = {
//   th: { padding: "10px", textAlign: "left" },
//   td: { padding: "10px" },
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
import { Box, IconButton, InputAdornment, TextField, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CompaniesList = () => {
  const theme = useTheme();
  const [employees, setEmployees] = useState([]); // Full data
  const [filteredEmployees, setFilteredEmployees] = useState([]); // Filtered data
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // 5 items per page
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getData();
  }, [location.state?.refresh]);

  // Fetch Data from Backend
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/getAllData");
      setEmployees(response.data.data || []);
      setFilteredEmployees(response.data.data || []); // Initially set filtered data as full data
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle Search Input Change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setFilteredEmployees(employees); // Reset if search is empty
    } else {
      const filtered = employees.filter((item) =>
        item.name.toLowerCase().includes(value)
      );
      setFilteredEmployees(filtered);
    }
    setCurrentPage(1); // Reset to first page after search
  };

  // Delete Employee
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      try {
        const response = await axios.delete(`http://localhost:5001/deleteData/${id}`);
        if (response.data.status === true) {
          alert(response.data.message)
          toast.success("Data deleted successfully!");
          getData();
        }
      } catch (error) {
        toast.error("Delete failed!");
      }
    }
  };

  // Edit Employee
  const handleEdit = (customer) => {
    navigate("/editcustomer", { state: { id: customer._id } });
  };

  // Add Employee
  const handleAdd = () => {
    navigate("/addcustomer");
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <RingLoader color="red" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center" }}>Error: {error.message}</div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main,
      }}
    >
      <Box m="1.5rem 2.5rem">
        <Header title="Customer List" subtitle="List of all customers" />

        {/* Search Input */}
        <Box mt="20px" mb="20px">
          <TextField
            variant="outlined"
            placeholder="Search Customers..."
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "300px",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
          />
        </Box>

        {/* Add Button */}
        <Box mt="20px">
          <Button onClick={handleAdd} variant="contained" color="primary" sx={styles.addButton}>
            Add
          </Button>
        </Box>

        {/* Table Section */}
        <table
          style={{
            width: "100%",
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.text.primary,
            marginTop: "10px",
            borderRadius: "5px",
          }}
        >
          <thead>
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
            {currentEmployees.length > 0 ? (
              currentEmployees.map((emp, index) => (
                <tr key={index} style={index % 2 === 0 ? { backgroundColor: theme.palette.action.hover } : {}}>
                  <td style={styles.td}>{emp.name}</td>
                  <td style={styles.td}>{emp.email}</td>
                  <td style={styles.td}>{emp.address}</td>
                  <td style={styles.td}>{emp.salary}</td>
                  <td style={styles.td}>{emp.age}</td>
                  <td style={styles.td}>{new Date(emp.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleEdit(emp)} style={styles.editButton}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(emp._id)} style={styles.deleteButton}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Buttons */}
        <Box mt="20px" display="flex" justifyContent="center">
          <Button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            variant="contained"
            color="secondary"
            sx={{ marginRight: "10px" }}
          >
            Previous
          </Button>
          <span style={{ margin: "10px", fontSize: "18px", color: theme.palette.text.primary }}>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            variant="contained"
            color="secondary"
          >
            Next
          </Button>
        </Box>
      </Box>
    </div>
  );
};

// Styles for Buttons and Table Elements
const styles = {
  th: { padding: "10px", textAlign: "left" },
  td: { padding: "10px" },
  addButton: {
    padding: "10px",
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
