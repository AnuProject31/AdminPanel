import React, { useEffect, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "components/Header";

const Orders = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const sampleOrders = [
      { orderid: 1, user: "Anusua", items: "Laptop", totalPrice: "235001", status: "Order successfully submitted", address: "Agarpara" },
      { orderid: 2, user: "Arnab", items: "Electronic gadget", totalPrice: "500000", status: "Order successfully submitted", address: "Agarpara" },
      { orderid: 3, user: "Aradhya", items: "Girl Dress", totalPrice: "42500", status: "Order successfully submitted", address: "Agarpara" },
      { orderid: 4, user: "Rubi", items: "Women Saree", totalPrice: "35004", status: "Order successfully submitted", address: "Halisahar" },
      { orderid: 5, user: "Srinika", items: "Toy", totalPrice: "235000", status: "Order successfully submitted", address: "Kolkata" },
      { orderid: 6, user: "Goutam", items: "Scooty", totalPrice: "123500", status: "Order successfully submitted", address: "Halisahar" }
    ];
    setOrders(sampleOrders);
  }, []);

  return (
    <Box m="1.5rem 2.5rem" bgcolor={theme.palette.background.default} color={theme.palette.text.primary}>
      <Header title="Order List" subtitle="List of all orders" />
      <Box mt={4}>
        <TableContainer component={Paper} style={{ backgroundColor: theme.palette.background.alt }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
                <TableCell><b>Order ID</b></TableCell>
                <TableCell><b>User</b></TableCell>
                <TableCell><b>Items</b></TableCell>
                <TableCell><b>Total Price</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Address</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <TableRow key={index} style={index % 2 === 0 ? { backgroundColor: theme.palette.action.hover } : {}}>
                    <TableCell>{order.orderid}</TableCell>
                    <TableCell>{order.user}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>${order.totalPrice}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.address}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center", padding: "20px" }}>No orders found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Orders;

