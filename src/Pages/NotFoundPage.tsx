
import React from "react";
import { Box,Typography,Button}from "@mui/material";
import {Link as link} from "react-router-dom";
const NotFound:React.FC=()=>{
  return(
    <Box textAlign="center" sx={{mt:8}}>
      <Typography variant="h3">404</Typography>
      <Typography variant="h6">Page not found</Typography>
      <Button component={link} to="/profile" sx={{mt:2}} >Go to Profile</Button>
    </Box>
  );
};
export default NotFound;
