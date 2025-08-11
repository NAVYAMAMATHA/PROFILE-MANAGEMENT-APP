import React,{useEffect,useState}from "react";
import {useForm,Controller,SubmitHandler}from "react-hook-form";
import {yupResolver}from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useAppDispatch,useAppSelector} from "../hooks";
import {saveProfile}from "../profile/Slice";
import {useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
type FormValues={
  name:string;
  email:string;
  age:number|null;};
const schema:yup.ObjectSchema<FormValues>=yup.object({
  name:yup.string().required("Name is required").min(3,"Minimum 3 characters"),
  email:yup.string().required("Email is required").email("Invalid email"),
  age:yup
    .number()
    .nullable()
    .defined(),});
    const ProfileForm:React.FC=()=>{
  const [Submitted,setSubmitted]=useState(false);
  const dispatch=useAppDispatch();
  const navigate=useNavigate();
  const profileState=useAppSelector((s) => s.profile);
  const {control,handleSubmit,reset,formState:{errors}}=useForm<FormValues>({
    resolver:yupResolver(schema),
    defaultValues:{ name: "", email: "", age: null}});
  useEffect(()=>{
    if(profileState.data){
      reset({
        name:profileState.data.name??"",
        email:profileState.data.email??"",
        age:profileState.data.age!==undefined&&profileState.data.age!==null
       ?profileState.data.age
       :null});}
  },[profileState.data, reset]);
  useEffect(() => {
    if (Submitted && profileState.status === "succeeded" && profileState.data) {
      navigate("/profile");}
  }, [profileState.status, profileState.data, navigate]);
  const onSubmit:SubmitHandler<FormValues> = (data) => {
    setSubmitted(true);
    dispatch(saveProfile(data));};
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{display:"grid",gap:2}}>
      {profileState.error && <Alert severity="error">{profileState.error}</Alert>}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Name" variant="standard" sx={{
    mb:2,
    backgroundColor:"#fff",
    borderRadius:1,
    "& .MuiOutlinedInput-root":{
      "& fieldset":{
        borderColor:"primary.main",},
      "&:hover fieldset":{
        borderColor:"primary.main",},
      "&.Mui-focused fieldset":{
        borderColor:"primary.main",
        borderWidth:2,},},}}
error={!!errors.name} helperText={errors.name?.message} />)}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Email" variant="standard" type="email" sx={{
    mb:2,
    backgroundColor:"#fff",
    borderRadius:1,
    "& .MuiOutlinedInput-root": {
      "& fieldset":{
        borderColor:"primary.main",},
      "&:hover fieldset":{
        borderColor:"primary.main",},
      "&.Mui-focused fieldset":{
        borderColor:"primary.main",
        borderWidth:2,}},}}
 error={!!errors.email} helperText={errors.email?.message} />)}
      />
      <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Age" variant="standard" type="number" sx={{
    mb:2,
    backgroundColor:"#fff",
    borderRadius:1,
    "& .MuiOutlinedInput-root":{
      "& fieldset": {
        borderColor:"primary.main",},
      "&:hover fieldset":{
        borderColor:"primary.main",},
      "&.Mui-focused fieldset": {
        borderColor:"primary.main",
        borderWidth:2,}},}}
 error={!!errors.age} helperText={errors.age?.message} />
        )}
      />
      <Box sx={{display:"flex",gap:2,alignItems:"center"}}>
        <Button variant="contained" type="submit" sx={{
      borderRadius:"50px",
      backgroundColor:"primary.main",
      color:"white",
      border:"1px solid primary.main",
      "&:hover":{
        backgroundColor:"white",
        color:"primary.main",
        border:"1px solid white",},
      transition:"all 0.3s ease",}}
       disabled={profileState.status === "loading"}>
          {profileState.status === "loading" ? <CircularProgress size={20} /> : "Save"}
        </Button>
       <Button
  variant="contained"
  onClick={() => navigate("/profile")}
  sx={{
      borderRadius:"50px",
      backgroundColor:"primary.main",
      color:"white",
      border:"1px solid primary.main",
      "&:hover":{
        backgroundColor:"white",
        color:"primary.main",
        border:"1px solid white",},
      transition:"all 0.3s ease",}} 
>
  Cancel
</Button>
      </Box>
    </Box>);};
export default ProfileForm;
