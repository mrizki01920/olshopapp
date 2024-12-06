import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Button, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { getProducts } from './ApiService';  // Sesuaikan dengan ApiService yang Anda miliki

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response);  // Pastikan format data sesuai dengan kebutuhan
    };
    fetchProducts();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Welcome to Our Store!
        </Typography>
        <Typography variant="h5" color="textSecondary">
          Explore the latest products and great deals!
        </Typography>
      </Box>

      {/* Grid Layout for Products */}
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ boxShadow: 3, transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardMedia
                component="img"
                alt={product.title}
                height="200"
                image={product.image}
                sx={{ objectFit: 'contain' }}
              />
              <CardContent>
                <Typography variant="h6" noWrap sx={{ fontWeight: 'bold' }}>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.description.substring(0, 100)}...
                </Typography>
                <Typography variant="h6" color="primary" sx={{ marginTop: 1 }}>
                  ${product.price}
                </Typography>

                {/* View Details Button */}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" fullWidth>
                      View Details
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;