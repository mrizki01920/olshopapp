import React, { useEffect, useState } from "react";
import { Button, Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (products) => {
    const totalAmount = products.reduce(
      (acc, product) => acc + (product.quantity || 0) * (product.price || 0),
      0
    );
    setTotal(totalAmount);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>Your Shopping Cart</Typography>

      {cart.length > 0 ? (
        <>
          <TableContainer sx={{ marginBottom: "2rem", borderRadius: "8px", boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell align="center">${item.price}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="center">${item.quantity * item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <Typography variant="h5">Total: ${total}</Typography>
            <Button variant="contained" color="primary" onClick={handleCheckout}>Proceed to Checkout</Button>
          </Box>
        </>
      ) : (
        <Typography>No products in cart</Typography>
      )}
    </Container>
  );
};

export default Cart;