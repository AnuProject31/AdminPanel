import React, { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "themes";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "scenes/layout";
import Login from "./scenes/Login";
import Dashboard from "scenes/dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Products from "scenes/products";
import Order from "scenes/order";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";

function App() {
  // Fix: Use the correct state selector
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* Show login page as default */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/order" element={<Order />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/transactions" element={<Transactions />} />
              </Route>
            </Route>

            {/* Redirect to login if route doesn't exist */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
