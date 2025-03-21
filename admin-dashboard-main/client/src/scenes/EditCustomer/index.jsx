import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../components/Header";

const EditCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id; // Ensure id exists

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    salary: "",
    age: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch Data from Backend
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5001/getAllDataByID/${id}`);
        if (response.data.data) {
          setFormData(response.data.data); // ✅ Correctly set formData with fetched data
        } else {
          toast.error("Customer not found!");
        }
      } catch (error) {
        toast.error("Failed to fetch customer data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) getData();
  }, [id]);

  // Handle input change ✅
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // ✅ Update form data dynamically
    }));
  };

  // Handle form submission ✅
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(`http://localhost:5001/updateEmployeeData/${id}`, formData);
      
      if (response.data.status) {
        alert("Data Edited Successfully")
        toast.success("Customer updated successfully!");
        
        // ✅ Redirect to customer list after successful update
        navigate("/customers", { state: { refresh: Date.now() } });
      } else {
        toast.error(response.data.message || "Failed to update customer.");
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      toast.error("Failed to update customer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Header title="Edit Customer" />
      <form onSubmit={handleSubmit} style={styles.form}>
      <p>{id}</p>
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

        <button type="submit" style={styles.submitButton} disabled={loading}>
          {loading ? "Updating..." : "Update"}
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

export default EditCustomer;


























// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Header from "../../components/Header";

// const EditCustomer = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const id = location.state.id;
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     address: "",
//     salary: "",
//     age: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [salary, setSalary] = useState("");
//   const [age, setAge] = useState("");

//   // Fetch Data from Backend--------------
//   const getData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5001/getAllDataByID/${id}`);
//       console.log(response.data.data)
//       setName(response.data.data.name)
//       setEmail(response.data.data.email)
//       setAddress(response.data.data.address)
//       setSalary(response.data.data.salary)
//       setAge(response.data.data.age)
//       // setEmployees(response.data.data || []);--------------
//       // setFilteredEmployees(response.data.data || []); // Initially, filtered data is the same as full data----------
//     } catch (err) {
//       // setError(err);--------------------
//     } finally {
//       setLoading(false);
//     }
//   };

  

//   // Handle input change---------------
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   // console.log(formData)---------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {

//       const response = await axios.post("http://localhost:5001/updateEmployeeData", formData);
//       // console.log(response)-------------------
//       if (response.data.status) {
//         toast.success("Customer editing successfully!");
//         navigate("/customers", { state: { refresh: Date.now() } }); // Ensure refresh triggers
//       } else {
//         toast.error(response.data.message || "Failed to edit customer.");
//       }
//     } catch (error) {
//       console.error("Error editing customer:", error);
//       toast.error("Failed to edit customer.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <Header title="Edit Customer" />
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <p>{id}</p>
//         <label>Name:</label>
//         <input type="text" name="name" value={name} onChange={handleChange} required />
        
//         <label>Email:</label>
//         <input type="email" name="email" value={email} onChange={handleChange} required />

//         <label>Address:</label>
//         <input type="text" name="address" value={address} onChange={handleChange} required />
        
//         <label>Salary:</label>
//         <input type="number" name="salary" value={salary} onChange={handleChange} required />
        
//         <label>Age:</label>
//         <input type="number" name="age" value={age} onChange={handleChange} required />

//         <button type="submit" style={styles.submitButton} disabled={loading}>
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     width: "300px",
//   },
//   submitButton: {
//     backgroundColor: "blue",
//     color: "white",
//     padding: "10px",
//     border: "none",
//     cursor: "pointer",
//     borderRadius: "5px",
//     marginTop: "10px",
//   },
// };

// export default EditCustomer;