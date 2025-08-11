import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typograhy from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link as RouterLink} from "react-router-dom";
import { useAppSelector } from "../hooks";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
const NavBar:React.FC=()=>{
  const profile=useAppSelector(s => s.profile.data);
  let firstName="",lastName="";
  if (profile?.name){
    const parts=profile.name.trim().split(" ");
    firstName=parts[0]??"";
    lastName=parts.length>1?parts.slice(1).join(" "):"";
  }
  return(
    <Box sx={{
      flexGrow:1
    }}>
      <AppBar position="static" sx={{
        backgroundColor:"primary.main",
        boxShadow:"none",
        borderBottom:"1px solid rgba(255,255,255,0.12)",

      }}>
        <Toolbar>
          <Typograhy variant="h6" component={RouterLink} to="/" sx={{
            flexGrow:1,
            textDecoration:"none",
            color:"white",
            fontWeight:700,
            letterSpacing:".5px",
          }}>Profile Management
          </Typograhy>
          <Stack direction="row" spacing={2} alignItems="center" sx={{
            mr:2
          }}>
          <Avatar alt={`${firstName}${lastName}`} sx={{
            bgcolor:"secondary.main",
            width:32,
            height:32,
            fontSize:14}}>
              {firstName?.[0]}{lastName?.[0]}
            </Avatar>
            <Typograhy variant="body1" sx={{
              color:"white"
            }}>

              {firstName}{lastName}
            </Typograhy>
            </Stack>
            <Button component={RouterLink} to="/profile" sx={{
              color:"white",
              textTransform:"none",
              fontWeight:500,
              "&:hover":{backgroundColor:"primary.dark"
              },
            }}>Profile</Button>
            <Button component={RouterLink} to="/profile-form" variant="outlined" sx={{
              color:"white",
              borderColor:"white",
              textTransform:"none",
              fontWeight:500,
              borderRadius:"20px",ml:1,
              "&:hover":{backgroundColor:"white",
                color:"primary.main",
                borderColor:"white",
              },
            }}>Edit/Create</Button>
                    </Toolbar>
              </AppBar>

    </Box>
  );
};
export default NavBar;