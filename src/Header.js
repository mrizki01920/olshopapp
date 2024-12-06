import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Logo dan Nama Website */}
            <Typography variant="h6">
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <HomeIcon sx={{ mr: 1 }} /> Ole Shop
                </Box>
              </Link>
            </Typography>

            {/* Icon Menu untuk Mobile */}
            <IconButton color="inherit" edge="end" onClick={toggleDrawer} sx={{ display: { xs: 'block', md: 'none' } }}>
              <MenuIcon />
            </IconButton>

            {/* Navbar Links untuk Desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                <Button color="inherit" startIcon={<HomeIcon />}>
                  Home
                </Button>
              </Link>
              <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
                <Button color="inherit" startIcon={<ShoppingCartIcon />}>
                  Cart
                </Button>
              </Link>
              <Link to="/checkout" style={{ color: 'white', textDecoration: 'none' }}>
                <Button color="inherit">Checkout</Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Toolbar>

      {/* Drawer untuk perangkat mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <List sx={{ width: 250 }}>
          <ListItem button onClick={toggleDrawer}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              <ListItemText primary="Home" />
            </Link>
          </ListItem>
          <ListItem button onClick={toggleDrawer}>
            <Link to="/cart" style={{ color: 'inherit', textDecoration: 'none' }}>
              <ListItemText primary="Cart" />
            </Link>
          </ListItem>
          <ListItem button onClick={toggleDrawer}>
            <Link to="/checkout" style={{ color: 'inherit', textDecoration: 'none' }}>
              <ListItemText primary="Checkout" />
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;