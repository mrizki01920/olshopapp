import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  CardContent,
  Box,
  Snackbar,
  Alert,
  TextField,
} from '@mui/material';

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1); // State untuk jumlah produk
  const [isAdded, setIsAdded] = useState(false); // State apakah produk sudah ditambahkan
  const [showSuccess, setShowSuccess] = useState(false); // State untuk snackbar animasi sukses

  useEffect(() => {
    // Fetch product details by ID
    const fetchProductDetails = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    fetchProductDetails();
  }, [id]);

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (quantity > 0) { // Pastikan jumlah produk valid
      const updatedCart = JSON.parse(localStorage.getItem('cart')) || []; // Ambil cart dari localStorage
      updatedCart.push({ ...product, quantity }); // Tambahkan produk dengan quantity
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Simpan cart yang diperbarui ke localStorage
      setCart(updatedCart); // Update state cart
      setIsAdded(true); // Ubah tombol menjadi "Added to Cart"
      setShowSuccess(true); // Tampilkan animasi sukses
    }
  };

  // Update quantity
  const handleQuantityChange = (event) => {
    const value = Math.max(1, parseInt(event.target.value) || 1); // Minimal 1
    setQuantity(value);
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  // Jika data belum dimuat, jangan tampilkan apapun
  if (!product) return null;

  return (
    <Container>
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={product.image}
            alt={product.title}
            sx={{
              height: 200,
              width: '100%',
              objectFit: 'contain',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: 1,
            }}
          />
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              {product.title}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {product.description}
            </Typography>
            <Typography variant="h6" sx={{ color: 'green', marginBottom: 2 }}>
              ${product.price}
            </Typography>

            {/* Input Quantity */}
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              InputProps={{ inputProps: { min: 1 } }} // Minimal nilai 1
              sx={{ marginBottom: 2, width: '100%' }}
            />

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              color={isAdded ? 'success' : 'primary'} // Warna tombol berubah jika sudah ditambahkan
              fullWidth
              onClick={handleAddToCart}
              disabled={isAdded} // Nonaktifkan tombol jika produk sudah ditambahkan
              sx={{
                '&:hover': { backgroundColor: isAdded ? '#2e7d32' : '#1565c0' },
                transition: 'transform 0.2s',
                '&:active': { transform: 'scale(0.95)' },
              }}
            >
              {isAdded ? 'Added to Cart' : 'Add to Cart'}
            </Button>
          </CardContent>
        </Grid>
      </Grid>

      {/* Snackbar (Animasi Sukses) */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Product added to cart successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Details;