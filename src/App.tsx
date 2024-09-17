import React from "react";
import AppNavbar from "./components/Navbar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SnackbarListener from "./components/SnackBarListener";
import { SnackbarProvider } from "notistack";
import AllBatchCertificates from "./components/AllBatchCertificate";
import ZipSelection from "./components/ZIPFileSelection";
import PUC_XLSXSelection from "./components/PUC_XLSXFileSelection";
import SingleCertificate from "./components/SingleCertificate";
import Engg_XLSXFileSelection from "./components/Engg_XLSXFileSelection";
import Login from "./components/Login"
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
          <Route path="/" element={< Login/>} />
          <Route path="/EnggUpload" element={<Engg_XLSXFileSelection/>} />
          <Route path="/Layout1" element={<SingleCertificate/>} />
          <Route path="/Layout2" element={<AllBatchCertificates/>} />
          <Route path="/ZIPFile" element={<ZipSelection/>} />
          <Route path="PucUpload" element={<PUC_XLSXSelection />} />
        </Routes>
       
      </SnackbarProvider>
    </div>
  );
}

export default App;
