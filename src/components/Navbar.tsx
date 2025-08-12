
import React, { useState } from "react";
import { AppBar,Toolbar,
  Typography,
Button,
  Avatar,
  Stack,IconButton,
  Drawer, Box,
  List,ListItem,ListItemButton,ListItemText,useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "../hooks";
const NavBar: React.FC=()=>{
  const profile= useAppSelector((s)=>s.profile.data);
  const theme=useTheme();
  const isMobile= useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen]=useState(false);


  let firstName="";
  let lastName="";
  if (profile?.name){
    const parts=profile.name.trim().split(" ");
    firstName=parts[0] ?? "";
    lastName=parts.length>1?parts.slice(1).join(" ") : "";}


  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);


  const menuItems=[{text: "Profile", link: "/profile"},
    {text: "Edit/Create", link: "/profile-form"},
  ];


  return(
    <AppBar
      position="static"
      sx={{boxShadow: "none",
        borderBottom: "1px solid rgba(255,255,255,0.12)",}}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            color:"inherit",
            textDecoration:"none",
            fontWeight:"700",
            whiteSpace:"nowrap",
            overflow:"hidden",
            textOverflow:"ellipsis",
            mr:2,}}>
          Profile Management
        </Typography>


        {isMobile ? (
          <>
            {profile?.name&&(
              <Stack direction="row"
                spacing={1}
                alignItems="center"
                sx={{ml: 1, maxWidth:150}}
              >
                <Avatar
                  alt={`${firstName}${lastName}`}
                  sx={{
                    bgcolor:"secondary.main",
                    width:50,
                    height:50,
                    fontSize:14,}}>
                  {firstName?.[0]}
                  {lastName?.[0]}
                </Avatar>
                <Typography
                  variant="body2"
                  sx={{color:"inherit",
                    whiteSpace:"nowrap",
                    overflow:"hidden",
                    textOverflow:"ellipsis",
                    fontSize:14,}}
                >
      {firstName} {lastName}
                </Typography>
              </Stack>  )}

            <IconButton


              color="inherit"
              edge="end"
              onClick={handleDrawerOpen}
              aria-label="open menu"
            >
                   <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerClose}
              ModalProps={{keepMounted:true }}
            >
              <Box sx={{ width:240,p:2}} role="presentation">
                {profile?.name &&(
                  <Stack
                    direction="row" spacing={1}
                    alignItems="center"
                    sx={{mb:2}} >
                    <Avatar
                      alt={`${firstName} ${lastName}`}
                      sx={{
    bgcolor: "secondary.main",
            width:40,
                        height:40,
                      }}
                    >
                      {firstName?.[0]}
                      {lastName?.[0]}
                    </Avatar>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        overflow: "hidden",
                        overflowWrap: "break-word",
                        whiteSpace: "normal",}}        >
                      {firstName} {lastName}
                    </Typography>
                  </Stack>
                )}

                <List>
                  {menuItems.map((item) =>(
                    <ListItem key={item.text} disablePadding>
                      <ListItemButton
                        component={RouterLink}
                        to={item.link}
                        onClick={handleDrawerClose}
                      >
                        <ListItemText primary={item.text}/>
        </ListItemButton>
            </ListItem>
                  ))}
                </List>
              </Box>            </Drawer>
          </>
        ) : (
          <Stack direction="row" spacing={2} alignItems="center" sx={{ ml: "auto"}}>
            <Button
              component={RouterLink}
              to="/profile"
              variant="outlined"
              sx={{        color: "inherit",
                borderColor: "rgba(255,255,255,0.7)",textTransform: "none",
                fontWeight: 500,
                borderRadius: "20px",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },}}
            >
              Profile
            </Button>

            <Button
              component={RouterLink}
              to="/profile-form"
              variant="outlined"
              sx={{
                color: "inherit",   borderColor: "rgba(255,255,255,0.7)",
                textTransform: "none",
                fontWeight: 500,     borderRadius: "20px",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
              }}
            >
              Edit/Create
            </Button>

            {profile?.name && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  alt={`${firstName} ${lastName}`}
                  sx={{ bgcolor: "secondary.main", width: 36, height: 36 }}
                >     {firstName?.[0]}
                  {lastName?.[0]}
                </Avatar>
                <Typography
             variant="body1"
                  sx={{
                    whiteSpace: "normal",
                    overflow: "hidden",
                    overflowWrap: "break-word",
             maxWidth: 140,  }}>
                  {firstName} {lastName}
                </Typography>
              </Stack>
            )}  </Stack>
        )}     </Toolbar>
    </AppBar>
  );
};



export default NavBar;
