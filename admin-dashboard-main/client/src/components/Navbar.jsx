// import React from "react";
// import {
//   LightModeOutlined,
//   DarkModeOutlined,
//   Menu as MenuIcon,
// } from "@mui/icons-material";
// import FlexBetween from "components/FlexBetween";
// import { useDispatch, useSelector } from "react-redux";
// import { setMode } from "state";
// import Logo from "../assets/images/LOGO.jpg";
// import {
//   AppBar,
//   Toolbar,
//   useTheme,
//   IconButton,
//   Box,
//   Typography,
// } from "@mui/material";

// const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const mode = useSelector((state) => state.global.mode);

//   return (
//     <AppBar
//       sx={{
//         position: "static",
//         background: "none",
//         boxShadow: "none",
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "space-between" }}>
//         {/* LEFT SIDE */}
//         <FlexBetween>
//           <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//             <MenuIcon />
//           </IconButton>
//         </FlexBetween>

//         {/* RIGHT SIDE */}
//         <FlexBetween gap="1.5rem">
//           {/* Theme Toggle */}
//           <IconButton onClick={() => dispatch(setMode())}>
//             {mode === "dark" ? (
//               <DarkModeOutlined sx={{ fontSize: "25px" }} />
//             ) : (
//               <LightModeOutlined sx={{ fontSize: "25px" }} />
//             )}
//           </IconButton>

//           {/* Profile Info (WITHOUT DROPDOWN) */}
//           <FlexBetween gap="1rem">
//             <Box
//               component="img"
//               alt="profile"
//               src={Logo}
//               height="40px"
//               width="40px"
//               borderRadius="50%"
//               sx={{ objectFit: "cover" }}
//             />
//             <Box textAlign="left">
//               <Typography
//                 fontWeight="bold"
//                 fontSize="0.85rem"
//                 sx={{ color: theme.palette.secondary[100] }}
//               >
//                 ANUSUA DUTTA
//               </Typography>
//               <Typography
//                 fontWeight="bold"
//                 fontSize="0.75rem"
//                 sx={{ color: theme.palette.secondary[200] }}
//               >
//                 ENGINEER
//               </Typography>
//             </Box>
//           </FlexBetween>
//         </FlexBetween>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;
// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state";
import DefaultLogo from "../assets/images/LOGO.jpg"; // Default logo
import {
  AppBar,
  Toolbar,
  useTheme,
  IconButton,
  Box,
  Typography,
} from "@mui/material";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const mode = useSelector((state) => state.global.mode);

  // State for profile image
  const [profileImage, setProfileImage] = useState(DefaultLogo);

  // Load profile image from localStorage
  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profileImage", reader.result); // Save image in localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input on click
  const handleImageClick = () => {
    document.getElementById("imageUploadInput").click();
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
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          {/* Theme Toggle */}
          <IconButton onClick={() => dispatch(setMode())}>
            {mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          {/* Profile Info with Image Upload */}
          <FlexBetween gap="1rem">
            {/* Hidden File Input for Image Upload */}
            <input
              id="imageUploadInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />

            {/* Clickable Profile Image */}
            <Box
              component="img"
              alt="profile"
              src={profileImage}
              height="40px"
              width="40px"
              borderRadius="50%"
              sx={{ objectFit: "cover", cursor: "pointer" }}
              onClick={handleImageClick}
            />
            
            {/* User Info */}
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
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
