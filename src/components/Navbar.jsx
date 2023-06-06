import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import {
  AppBar,
  Avatar,
  ListItemIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import cryptoLogo from "../assets/cryptoLogo1.webp";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  const sidebarContent = (
    <List sx={{ color: "white" }}>
      <ListItem>
        <Avatar src={cryptoLogo} sx={{ height: "60px", width: "80px" }} />
        <ListItemText
          primary={
            <Typography variant="h5" fontWeight="600" fontSize="30px">
              CryptoVerse
            </Typography>
          }
          sx={{ ml: "10px" }}
        />
      </ListItem>
      <Link to="/">
        <ListItem
          sx={{ cursor: "pointer", "&: hover": { bgcolor: "#0089ff" } }}
        >
          <ListItemIcon>
            <HomeIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </Link>
      {isAuthenticated && (
        <Link to="/dashboard">
          <ListItem
            sx={{ cursor: "pointer", "&: hover": { bgcolor: "#0089ff" } }}
          >
            <ListItemIcon>
              <DashboardIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
      )}
      {isAuthenticated && (
        <Link to="/cryptocurrencies">
          <ListItem
            sx={{ cursor: "pointer", "&: hover": { bgcolor: "#0089ff" } }}
          >
            <ListItemIcon>
              <TrendingUpIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Cryptocurrencies" />
          </ListItem>
        </Link>
      )}
      {isAuthenticated && (
        <Link to="/exchanges">
          <ListItem
            sx={{ cursor: "pointer", "&: hover": { bgcolor: "#0089ff" } }}
          >
            <ListItemIcon>
              <CurrencyExchangeIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Exchanges" />
          </ListItem>
        </Link>
      )}
      {isAuthenticated && (
        <Link to="/news">
          <ListItem
            sx={{ cursor: "pointer", "&: hover": { bgcolor: "#0089ff" } }}
          >
            <ListItemIcon>
              <NewspaperIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="News" />
          </ListItem>
        </Link>
      )}
      {isAuthenticated && (
        <Link to="/profile">
          <ListItem
            sx={{ cursor: "pointer", "&: hover": { bgcolor: "#0089ff" } }}
          >
            <ListItemIcon>
              <Avatar
                src={user.picture}
                sx={{ height: "25px", width: "25px" }}
              />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>
      )}
    </List>
  );

  return (
    <div>
      {isMobile ? (
        <AppBar >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <MenuIcon onClick={toggleSidebar} />
            {isAuthenticated ? (
              <LogoutIcon
                onClick={() =>
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  })
                }
                sx={{ height: "30px", width: "30px", cursor: "pointer" }}
              />
            ) : (
              <LoginIcon
                onClick={() => loginWithRedirect()}
                sx={{ height: "30px", width: "30px", cursor: "pointer" }}
              />
            )}
          </Toolbar>
        </AppBar>
      ) : (
        <Drawer
          sx={{ "& .MuiDrawer-paper": { width: "300px", bgcolor: "#070733" } }}
          anchor="left"
          open={true}
          variant="persistent"
        >
          {sidebarContent}
        </Drawer>
      )}

      {isMobile && (
        <Drawer
          sx={{ "& .MuiDrawer-paper": { width: "300px", bgcolor: "#070733" } }}
          anchor="left"
          open={isOpen}
          onClose={toggleSidebar}
          onClick={toggleSidebar}
        >
          {sidebarContent}
        </Drawer>
      )}
    </div>
  );
};

export default Sidebar;
