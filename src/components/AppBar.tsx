import * as React from 'react';
import {useContext} from 'react';
import {auth} from '../firebaseSettings';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from "../ROUTES";
import {UserContext} from "../helpers/UserContext";

enum Pages {
    CALCULATOR = 'calculator', ACCOUNT = 'account'
}

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const user = context?.user;
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (page) => {
        setAnchorElNav(null);
        switch (page) {
            case Pages.CALCULATOR:
                navigate(ROUTES.CALCULATOR);
                break;
            case Pages.ACCOUNT:
                navigate(ROUTES.ACCOUNT);
                break;
        }

    };


    return (<AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: {xs: 'none', md: 'flex'},
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    TrueNorth
                </Typography>

                {user ? <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom', horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top', horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: {xs: 'block', md: 'none'},
                        }}
                    >
                        {Object.values(Pages).map((page) => (
                            <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                                <Typography textAlign="center">{page.toLocaleUpperCase()}</Typography>
                            </MenuItem>))}
                    </Menu>
                </Box> : null}
                <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                        mr: 2,
                        display: {xs: 'flex', md: 'none'},
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    TrueNorth
                </Typography>
                {user ? <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                    {Object.values(Pages).map((page) => (<Button
                        key={page}
                        onClick={() => handleCloseNavMenu(page)}
                        sx={{my: 2, color: 'white', display: 'block'}}
                    >
                        {page.toLocaleUpperCase()}
                    </Button>))}
                </Box> : null}
                <Box
                    sx={{flexDirection: {xs: 'column', sm: 'row'}, justifyContent: 'flex-end'}}
                    display={'flex'}
                    id="signOutSection"
                >
                    {user?.uid ? (<Button
                        color="primary"
                        variant="contained"
                        onClick={() => auth.signOut()}
                        href={'/'}
                        key={'signout'}
                    >
                        LOG OUT
                    </Button>) : null

                    }
                </Box>

            </Toolbar>
        </Container>
    </AppBar>);
}

export default ResponsiveAppBar;