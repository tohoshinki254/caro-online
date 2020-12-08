import React, {useState} from 'react'
import {makeStyles, Toolbar, AppBar, IconButton, Menu, MenuItem, Typography, ListItemIcon} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import {Link} from 'react-router-dom';
import decode from 'jwt-decode';
import { TOKEN_NAME } from '../../global/constants';

const MyAppBar = ({isLogined}) => {
    const classes = useStyle();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mouseOverIcon, setMouseOverIcon] = useState(false);
    const [mouseOverMenu, setMouseOverMenu] = useState(false);
    
    const handleMouseOver = (event) =>{
      setAnchorEl(event.currentTarget);
      setMouseOverIcon(true);
    }
    const handleMenuOver = () => {
        setMouseOverMenu(true);
    }
    const handleMouseLeave = () => {
        setMouseOverIcon(false);
    }
    const handleMenuLeave = () => {
        setMouseOverMenu(false);
    }
    const handleClose = () => {
        setMouseOverIcon(false);
        setMouseOverMenu(false);
    }

    const renderMenu = () => {
        const userInfo = decode(localStorage.getItem(TOKEN_NAME));
        return (
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={mouseOverIcon || mouseOverMenu}
          onClose={handleClose}
          className={classes.customWidth}
          MenuListProps={{
            onMouseEnter: handleMenuOver,
            onMouseLeave: handleMenuLeave
        }}
        >
            <MenuItem>
              <Typography style={{fontSize: '0.8em'}}>
                {`Hi, ${userInfo.name}`}
              </Typography>
            </MenuItem>
            <Link style={{ textDecoration: 'none', color: 'inherit' }}  to="/profile">
              <MenuItem>
                <ListItemIcon>
                  <AccountCircleIcon/>
                </ListItemIcon>
                <Typography  >
                  Profile
                </Typography>
              </MenuItem>
            </Link>
            <Link style={{ textDecoration: 'none', color: 'inherit' }}  to="/logout">
              <MenuItem>
                <ListItemIcon>
                  <ExitToAppRoundedIcon/>
                </ListItemIcon>
                <Typography>
                  Logout
                </Typography>
              </MenuItem>
            </Link>
          </Menu>  
        );
 
    }

    return (
        <div className={classes.root}>
          <AppBar classes={{colorDefault: classes.appBarColorDefault}} color='default' position='static'>
              <Toolbar className={classes.toolbar}>
                  <div className={classes.customLogo}>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/home">
                        <Typography className={classes.logoTitle} >Tic Tac Toe</Typography>
                    </Link>   
                  </div>
                  {
                    isLogined 
                    &&
                    <IconButton onMouseLeave={handleMouseLeave}  onMouseEnter={handleMouseOver} classes={{colorPrimary: classes.iconColorDefault}} style={{zIndex: 2000}}  color="primary">
                        <AccountCircle style={{fontSize: '2rem'}} />
                    </IconButton>
                  }


              </Toolbar>
          </AppBar>  
          {isLogined && renderMenu()}
        </div>
    );
}

const useStyle = makeStyles({
    root: {
        flexGrow: 1
    },
    toolbar: {
        minHeight: '30%'
    },
    appBarColorDefault: {
        background: '#2f78f7'
    },
    iconColorDefault:{
        color: '#ffffff'
    },
    customLogo: {
        paddingBottom: '0.5%',
        paddingTop: '0.5%',
        flexGrow: 1,
        cursor: 'pointer'
    },
    customWidth: {
      marginTop: '2.5%'
    },
    logoTitle: {
        fontFamily: 'NerkoOne',
        fontWeight: 'bold',
        fontSize: '1.5em',
        color: 'white'
    },
});

export default MyAppBar;