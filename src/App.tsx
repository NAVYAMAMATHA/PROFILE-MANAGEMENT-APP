import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProfileForm from "../src/Pages/Form";
import ProfilePage from "../src/Pages/Profile";
import NotFound from "../src/Pages/NotFoundPage";
import NavBar from "./components/Navbar";
import { useAppDispatch } from "./hooks";
import { fetchProfile } from "./profile/Slice";
import Container from "@mui/material/Container";



function App(){
  const dispatch=useAppDispatch();
  useEffect(()=>{
    dispatch(fetchProfile());
  },[dispatch]);



  return (
    <>
      <NavBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/profile-form" element={<ProfileForm />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Container>
    </>
  );
}


export default App;
