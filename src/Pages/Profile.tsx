import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteProfile, fetchProfile } from "../profile/Slice";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
const ProfilePage:React.FC=()=>{
  const dispatch=useAppDispatch();
  const navigate=useNavigate();
  const {data,status,error }=useAppSelector(s=>s.profile);
  const [open,setOpen]=React.useState(false);
  React.useEffect(()=>{
    if(!data){dispatch(fetchProfile());}
  },[data,dispatch]);
  const handleDelete=async()=>{if(!data){
      setOpen(false);
      return;}
    await dispatch(deleteProfile(data.id));
    setOpen(false);
    navigate("/profile-form");
  };
  const handleEdit=()=>{
  console.log("Navigating to profile form for editing");
  navigate("/profile-form");};
  if(status==="loading"){
    return<CircularProgress />;}
  if(error){
    return<Alert severity="error">{error}</Alert>}
  if(!data){
    return(
      <Box sx={{display: "flex",
        justifyContent: "center",
        alignItems: "center",}}>
    <Box sx={{display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          p:3,width:300,
          backgroundColor:"white",
          boxShadow:3,
          borderRadius:2,
          border:"1px solid #ddd",}}>
        <Typography variant="h5">No profile found</Typography>
        <Typography sx={{mb:3}}>Please create your profile.</Typography>
        <Button variant="contained" onClick={()=>navigate("/profile-form")}>Create New Profile</Button>
      </Box>
      </Box>
    );}
  const names=data.name.split(" ");
  const firstName=names[0];
  const lastName=names.length > 1 ? names.slice(1).join(" ") : "";
  return (
    <Box sx={{display:"flex",
        justifyContent:"center",
        alignItems:"center",}}>
        <Box sx={{display:"flex",
          flexDirection:"column",
          alignItems:"flex-start",
          p:3,
          width:500,
          backgroundColor:"white",
          boxShadow:3,
          borderRadius:2,
          border:"1px solid #ddd",}}>
      <Typography variant="h4">Profile</Typography>
      <Typography><strong>First name:</strong> {firstName}</Typography>
      <Typography><strong>Last name:</strong> {lastName}</Typography>
      <Typography><strong>Email:</strong> {data.email}</Typography>
      <Typography><strong>Age:</strong> {data.age ?? "Not provided"}</Typography>

      <Box sx={{
      
      
      display:"flex",
      mt:2,gap:2 }}>
        <Button variant="contained" sx={{
      borderRadius:"50px",
      backgroundColor:"primary.main",
      color:"white",
      border:"1px solid primary.main",
      "&:hover":{
        backgroundColor:"white",
        color:"primary.main",
        border:"1px solid white",
      },
      transition:"all 0.3s ease",
    }} onClick={handleEdit}>Edit</Button>
        <Button variant="contained" color="error"  sx={{
    borderRadius:"50px",
    backgroundColor:"error.main",
    color:"white",
    border:"1px solid",
    borderColor:"error.main",
    "&:hover":{
      backgroundColor:"white",
      color:"error.main",
      borderColor:"error.main",
    },
    transition:"all 0.3s ease",
  }}onClick={()=>setOpen(true)}>Delete</Button>
  </Box>
</Box>
      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>Confirm delete?</DialogTitle>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default ProfilePage;
