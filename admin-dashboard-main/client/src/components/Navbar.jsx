import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state";
import Logo from "../assets/images/LOGO.jpg";
import {
  AppBar,
  Toolbar,
  useTheme,
  InputBase,
  IconButton,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen, data, setFilteredData }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const mode = useSelector((state) => state.global.mode);

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const isOpen = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Handle Search Input Change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter Data Based on Search Input
    if (value === "") {
      setFilteredData(data); // Reset if empty
    } else {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().startsWith(value)
      );
      setFilteredData(filtered);
    }
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="1rem"
            p="0.1rem 1.5rem"
          >
            <InputBase
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              sx={{ width: "200px" }}
            />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={Logo}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  ANUSUA DUTTA
                </Typography>
                <Typography
                  fontWeight="bold"
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  ENGINEER
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
