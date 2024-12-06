import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, Grid, Paper, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    city: "",
    zipCode: "",
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={3}>
        {/* Shipping Address Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: "1rem", borderRadius: "8px", boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              name="name"
              value={shippingAddress.name}
              onChange={handleChange}
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              name="address"
              value={shippingAddress.address}
              onChange={handleChange}
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              name="city"
              value={shippingAddress.city}
              onChange={handleChange}
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              label="Zip Code"
              variant="outlined"
              fullWidth
              name="zipCode"
              value={shippingAddress.zipCode}
              onChange={handleChange}
              sx={{ marginBottom: "1rem" }}
            />
          </Paper>
        </Grid>

        {/* Order Summary Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: "1rem", borderRadius: "8px", boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <List>
              {cart.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.title}
                    secondary={`$${item.price} x ${item.quantity}`}
                  />
                </ListItem>
              ))}
            </List>
            <Box sx={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${total}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Checkout Button */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Box>
    </Container>
  );
};

export default Checkout;