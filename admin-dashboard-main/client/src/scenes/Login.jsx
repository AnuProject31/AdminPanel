import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, useTheme } from "@mui/material";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ✅ Save authentication status (NO PASSWORD CHECK)
    localStorage.setItem("isAuthenticated", "true");
    
    // ✅ Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor={theme.palette.background.default}>
      <Box width="400px" p={4} bgcolor={theme.palette.background.alt} borderRadius="8px" boxShadow={3}>
        <Typography variant="h4" textAlign="center" mb={3}>Admin Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth 
            label="Email" 
            type="email" 
            variant="outlined" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            margin="normal" 
            required 
          />
          <TextField 
            fullWidth 
            label="Password" 
            type="password" 
            variant="outlined" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            margin="normal" 
            required 
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
