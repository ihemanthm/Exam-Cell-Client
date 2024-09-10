import React from "react";
import AppNavbar from "./components/Navbar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SnackbarListener from "./components/SnackBarListener";
import { SnackbarProvider } from "notistack";
import AllBatchCertificates from "./components/AllBatchCertificate";
import ZipSelection from "./components/ZIPFileSelection";
import XLSXSelection from "./components/XLSXFileSelection";
import SingleCertificate from "./components/SingleCertificate";

function App() {
  return (
    <div>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      >
        <SnackbarListener />
        <AppNavbar />
        
        <Routes>
          <Route path="/" element={< XLSXSelection/>} />
          <Route path="/ZipFile" element={<ZipSelection/>} />
          <Route path="/Layout1" element={<SingleCertificate/>} />
          <Route path="/Layout2" element={<AllBatchCertificates/>} />
        </Routes>
       
      </SnackbarProvider>
    </div>
  );
}

export default App;
