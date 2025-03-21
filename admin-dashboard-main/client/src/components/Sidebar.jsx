// import React,{useState,useEffect} from 'react'
// import {
//     Box,
//     Divider,
//     Drawer,
//     IconButton,
//     List,
//     ListItem,
//     ListItemButton,
//     ListItemIcon,
//     ListItemText,
//     Typography,
//     useTheme
// } from '@mui/material'

// import { 
//     SettingsOutlined, 
//     ChevronLeft,
//     ChevronRightOutlined,
//     HomeOutlined,
//     ShoppingCartOutlined,
//     Groups2Outlined,
//     ReceiptLongOutlined,
//     PublicOutlined,
//     PointOfSaleOutlined,
//     TodayOutlined,
//     CalendarMonthOutlined,
//     AdminPanelSettingsOutlined,
//     TrendingUpOutlined,
//     PieChartOutlined,
// } from '@mui/icons-material'
// import { useLocation,useNavigate } from 'react-router-dom'
// import FlexBetween from './FlexBetween'
// // import ProfileImage from 'assets/profile.jpeg'
// import Logo from '../assets/images/LOGO.jpg'

// const navItems =[
//     {
//         text:"Dashboard",
//         icon:<HomeOutlined/>
//     },
//     {
//         text:"Client Facing",
//         icon:null
//     },
//     {
//         text:"Products",
//         icon:<ShoppingCartOutlined/>
//     },
//     {
//         text:"Customers",
//         icon:<Groups2Outlined/>
//     },
//     {
//         text:"Transactions",
//         icon:<ReceiptLongOutlined/>
//     },
//     {
//         text:"Geography",
//         icon:<PublicOutlined/>
//     },
//     {
//         text:"Sales",
//         icon:null
//     },
//     {
//         text:"Overview",
//         icon:<PointOfSaleOutlined/>
//     },
//     {
//         text:"Daily",
//         icon:<TodayOutlined/>
//     },
//     {
//         text:"Monthly",
//         icon:<CalendarMonthOutlined/>
//     },
//     {
//         text:"Breakdown",
//         icon:<PieChartOutlined/>
//     },
//     {
//         text:"Management",
//         icon:null
//     },
//     {
//         text:"Admin",
//         icon:<AdminPanelSettingsOutlined/>
//     },
//     {
//         text:"Performance",
//         icon:<TrendingUpOutlined/>
//     }
// ]

// const Sidebar = ({
//     user,
//     drawerWidth,
//     isSidebarOpen,
//     setIsSidebarOpen,
//     isNonMobile
// }) =>{
//     const { pathname } = useLocation()
//     const [active,setActive] = useState("")
//     const navigate = useNavigate()
//     const theme = useTheme()

//     useEffect(() =>{
//         setActive(pathname.substring(1))
//     },[pathname])

//     return(
//     <Box component="nav">
//         {
//             isSidebarOpen && (
//             <Drawer
//                 open={isSidebarOpen}
//                 onClose={() =>setIsSidebarOpen(false)}
//                 variant="persistent"
//                 anchor="left"
//                 sx={{
//                     width:drawerWidth,
//                         "& .MuiDrawer-paper":{
//                         color: theme.palette.secondary[200],
//                         backgroundColor:theme.palette.background.alt,
//                         boxSizing:"border-box",
//                         borderWidth:isNonMobile ? 0 : "2px",
//                         width:drawerWidth
//                     }
//                 }}
//             >
//             <Box width="100%">
//                 <Box m="1.5rem 2rem 2rem 3rem">
//                     <FlexBetween color={theme.palette.secondary.main}>
//                         <Box display="flex" alignItems="center" gap="0.5rem">
//                             <Typography variant="h4" fontWeight="bold">
//                                 {/* ECOMVISION */}
//                                 ADMIN
//                             </Typography>
//                         </Box>
//                         {!isNonMobile && (
//                             <IconButton onClick ={()=> setIsSidebarOpen(!isSidebarOpen) }>
//                                 <ChevronLeft/>
//                             </IconButton>
//                         )
//                         }
//                     </FlexBetween>
//                 </Box>
//                 <List>
//                     {
//                         navItems.map(({text,icon}) =>{
//                             if(!icon){
//                                 return(
//                                     <Typography key={text} sx={{ m:"2.25rem 0 1rem 3rem" }}>
//                                         {text}
//                                     </Typography>
//                                 )
//                             }
//                             const lcText= text.toLowerCase()

//                             return (
//                                 <ListItem key={text} disablePadding>
//                                     <ListItemButton onClick={ () =>{navigate(`/${lcText}`)
//                                         setActive(lcText)
//                                     }}
//                                     sx={{ 
//                                         backgroundColor:active === lcText ? theme.palette.secondary[300]:"transparent",
//                                         color:
//                                             active === lcText 
//                                             ? theme.palette.primary[600]
//                                             : theme.palette.secondary[100]
//                                     }}
//                                     >
//                                         <ListItemIcon
//                                             sx={{ 
//                                                 ml:"2rem",
//                                                 color:
//                                                     active === lcText 
//                                                     ? theme.palette.primary[600]
//                                                     : theme.palette.secondary[200]
//                                             }}
//                                         >
//                                             {icon}
//                                         </ListItemIcon>
//                                         <ListItemText primary={text} />
//                                             {active === lcText && (
//                                                 <ChevronRightOutlined sx={{ ml:"auto" }}/>
//                                             )}
//                                     </ListItemButton>
//                                 </ListItem>
//                             )
//                         })
//                     }
//                 </List>
//             </Box>
//             <Box position="relative" bottom="0.5rem">
//                 <Divider/>
//                 <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
//                     <Box
//                         component="img"
//                         alt="profile"
//                         src={Logo}
//                         height="40px"
//                         width="40px"
//                         borderRadius="50%"
//                         sx={{ objectFit:"cover" }}
//                     />
//                     <Box textAlign="left">
//                         <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: theme.palette.secondary[100] }}>{user.name}</Typography>
//                         <Typography fontWeight="bold" fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>{user.occupation}</Typography>
//                     </Box>
//                     <SettingsOutlined sx={{ color: theme.palette.secondary[300], fontSize:"25px" }}/>
//                 </FlexBetween>
//             </Box>            
//         </Drawer>
//         )}
//     </Box>
//     )
// }

// export default Sidebar
import React, { useState, useEffect } from 'react';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from '@mui/material';
import { 
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import Logo from '../assets/images/LOGO.jpg';

const navItems = [
    { text: "Dashboard", icon: <HomeOutlined /> },
    { text: "Client Review", icon: null },
    { text: "Products", icon: <ShoppingCartOutlined /> },
    { text: "Order", icon: <ShoppingCartOutlined /> },
    { text: "Customers", icon: <Groups2Outlined /> },
    { text: "Transactions", icon: <ReceiptLongOutlined /> },
];

const Sidebar = ({ user, drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth
                        }
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Typography variant="h4" fontWeight="bold">
                                    ADMIN
                                </Typography>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                            {text}
                                        </Typography>
                                    );
                                }
                                const lcText = text.toLowerCase();

                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${lcText}`);
                                                setActive(lcText);
                                            }}
                                            sx={{
                                                backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                                                color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[100]
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem",
                                                    color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[200]
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && <ChevronRightOutlined sx={{ ml: "auto" }} />}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                    <Box position="relative" bottom="0.5rem">
                        <Divider />
                        <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
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
                                <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: theme.palette.secondary[100] }}>
                                    ANUSUA DUTTA
                                </Typography>
                                <Typography fontWeight="bold" fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
                                    ENGINEER
                                </Typography>
                            </Box>
                        </FlexBetween>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;
