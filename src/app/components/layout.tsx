"use client";
import React, { Children, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import PeopleIcon from "@mui/icons-material/People";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import Header from "./header";
import Dashboard from "./dashboard";
import Link from "next/dist/client/link";
import { useRouter } from "next/navigation";
import PropTypes from 'prop-types';
import Navbar from "./navbar";
import About from "../about/page";
import Productdata from "../productdata/page";
import Users from "../users/page";
import Setting from "../setting/page";

const drawerWidth = 240;
const Main = styled("main", {
  shouldForwardProp: (prop: any) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }: any) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Layout(props: { window?: any; children?: any; }) {
  const { window } = props;
  const { children } = props;
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const[activeComponent, setActiveComponent] = useState('/')
  const menuItem = [
    { title: "Dashboard", icon: <AvTimerIcon />, url: "/" },
    { title: "Users", icon: <PeopleIcon />, url: "/users" },
    { title: "Product Data", icon: <ListAltIcon />, url: "/productdata" },
    { title: "Setting", icon: <SettingsIcon />, url: "/setting" },
    { title: "About", icon: <InfoOutlineIcon />, url: "/about" },
  ];

  const renderContent = () => {
    switch(activeComponent){
      case '/':
        return <Dashboard />;
      case '/setting':
        return <Setting />;
      case '/about':
        return <About />
      case '/productdata':
        return <Productdata />
      case '/users':
        return <Users />
      default:
        return <Dashboard />;
    }
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
   <>
     <div>
      <Box sx={{ display: "flex" }}>
        {/* <CssBaseline /> */}
        <AppBar position="fixed" open={open} color="default">
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  mr: 2,
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              className="text-black"
            >
              Mantis
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <div className="flex items-center justify-center">
            <DrawerHeader>
              {/* <img src='./app/assets/logo/logo-dark.svg' alt="app-logo" /> */}
              <h5 className="m-1 font-semibold"> Mantis </h5>
              <IconButton onClick={handleDrawerClose}>
                <MenuIcon />
              </IconButton>
            </DrawerHeader>
          </div>
          <Divider />
          <List>
            {menuItem.map((item, index) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton onClick={() => setActiveComponent(item.url)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <div>
            {renderContent()}
          </div>
        </Main>
      </Box>
    </div>
   </>
  );
}

Layout.propTypes = {
  window: PropTypes.func,
  Children: PropTypes.array
}

export default Layout;
