import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

/* useStyles is a hook returned by makeStyles. 
makeStyles can receive a function and if we want some properties 
from our theme that provided to us using the ThemeProvider component, 
we can use theme as the function parameter, and then take what we want from
the theme structur e and add our own functionality relevant to the specific 
component that we are styling. */

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
      transition: "all .2s ease-out",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
      transition: "all .2s ease-out",
    },
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em",
      transition: "all .2s ease-out",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
      transition: "all .2s ease-out",
    },
  },
  logoContainer: {
    padding: 0,
    "&hover": {
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
    /* we want consistent spacing so we don't use rem here
    sizes of spacing: generally with px,
    sizes of elements: generally with rem because we want them to be responsive. */
  },
  estimate: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  menu: {
    ...theme.mixins.toolbar,
    backgroundColor: theme.palette.common.arcBlue,
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },

  drawer: {
    backgroundColor: theme.palette.common.arcBlue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.arcOrange,
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const iOS = process.browser && /iPad|iPho ne|iPod/.test(navigator.userAgent);
  const handleChange = (event, newSelectedTab) => {
    props.setSelectedTab(newSelectedTab);
  };

  const handleServicesMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleServicesMenuItemClick = (index) => {
    props.setSelectedMenuItemIndex(index);
    props.setSelectedTab(1);
    handleClose();
  };

  const handleDrawerListItemClick = (index) => {
    setOpenDrawer(false);
    props.setSelectedTab(index);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };
  const menuOptions = [
    {
      name: "Services",
      link: "/services",
      tabIndex: 1,
      menuIndex: 0,
    },
    {
      name: "Custom Software Development",
      link: "/customsoftware",
      tabIndex: 1,
      menuIndex: 1,
    },
    {
      name: "iOS/Android App Development",
      link: "/mobileapps",
      tabIndex: 1,
      menuIndex: 2,
    },
    {
      name: "Website Development",
      link: "/websites",
      tabIndex: 1,
      menuIndex: 3,
    },
  ];

  const routes = [
    { name: "Home", link: "/", tabIndex: 0 },
    {
      name: "Services",
      link: "/services",
      tabIndex: 1,
      ariaOwns: anchorEl ? "simple-menu" : undefined,
      ariaPopup: anchorEl ? "true" : undefined,
      onMouseOver: (event) => handleServicesMenuClick(event),
    },
    { name: "The Revolution", link: "/revolution", tabIndex: 2 },
    { name: "About Us", link: "/about", tabIndex: 3 },
    { name: "Contact Us", link: "/contact", tabIndex: 4 },
  ];

  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case route.link:
          if (props.selectedTab !== route.tabIndex) {
            props.setSelectedTab(route.tabIndex);
          }
          if (
            route.menuIndex &&
            route.menuIndex !== props.selectedMenuItemIndex
          ) {
            props.setSelectedMenuItemIndex(route.menuIndex);
          }
          break;
        default:
          break;
      }
    });
  }, [
    props.selectedTab,
    props.selectedMenuItemIndex,
    menuOptions,
    routes,
    props,
  ]);

  const tabs = (
    <React.Fragment>
      <Tabs
        value={props.selectedTab}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        {routes.map((route, index) => (
          <Tab
            key={index}
            className={classes.tab}
            component={Link}
            to={route.link}
            label={route.name}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopup}
            onMouseOver={route.onMouseOver}
          />
        ))}
      </Tabs>
      <Button
        component={Link}
        to="/estimate"
        variant="contained"
        color="secondary"
        className={classes.estimate}
        onClick={() => props.setSelectedTab(5)}
      >
        Free Estimate
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
        keepMounted
        style={{ zIndex: 1302 }}
      >
        {menuOptions.map((element, index) => (
          <MenuItem
            key={index}
            onClick={() => handleServicesMenuItemClick(index)}
            selected={
              index === props.selectedMenuItemIndex && props.selectedTab === 1
            }
            component={Link}
            classes={{ root: classes.menuItem }}
            to={element.link}
          >
            {element.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onOpen={() => setOpenDrawer(true)}
        onClose={() => setOpenDrawer(false)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin}></div>
        <List disablePadding>
          {routes.map((route, index) => (
            <ListItem
              key={index}
              selected={props.selectedTab === index}
              onClick={() => handleDrawerListItemClick(index)}
              divider
              button
              component={Link}
              classes={{ selected: classes.drawerItemSelected }}
              to={route.link}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
          <ListItem
            classes={{
              root: classes.drawerItemEstimate,
              selected: classes.drawerItemSelected,
            }}
            onClick={() => handleDrawerListItemClick(5)}
            divider
            button
            component={Link}
            to={"/estimate"}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              className={classes.logoContainer}
              onClick={() => props.setSelectedTab(0)}
              disableRipple
            >
              <img className={classes.logo} src={logo} alt="company logo" />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
          <Menu></Menu>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};

export default Header;
