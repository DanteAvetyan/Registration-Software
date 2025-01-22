import React from "react";
import { AppBar, Toolbar, Typography, Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link component={RouterLink} to="/" color="inherit" underline="none">
                        Home
                    </Link>
                </Typography>
                <Button component={RouterLink} to="/calendar" color="inherit">
                    Calendar
                </Button>
                <Button component={RouterLink} to="/cart" color="inherit">
                    Cart
                </Button>
                <Button component={RouterLink} to="/signin" color="inherit">
                    Sign in
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
