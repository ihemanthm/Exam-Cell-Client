import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // Import Navigate for redirection
import AppNavbar from "./components/Navbar";
import "./App.css";
import SnackbarListener from "./components/SnackBarListener";
import { SnackbarProvider } from "notistack";
import AllBatchCertificates from "./components/AllBatchCertificate";
import ZipSelection from "./components/ZIPFileSelection";
import PUC_XLSXSelection from "./components/PUC_XLSXFileSelection";
import SingleCertificate from "./components/SingleCertificate";
import Engg_XLSXFileSelection from "./components/Engg_XLSXFileSelection";
import Login from "./components/Login";

// Protected Route Component
function ProtectedRoute({ element, login }: { element: JSX.Element, login: boolean }) {
  return login ? element : <Navigate to="/" />; // Redirect to login if not logged in
}

function App() {
  const [login, setLogin] = useState(false);

  return (
    <div>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      >
        <SnackbarListener />
        {login && <AppNavbar setLogin={setLogin} />}

        <Routes>
          {/* Login Route is always accessible */}
          <Route path="/" element={<Login setLogin={setLogin} />} />

          {/* Protected Routes */}
          <Route
            path="/EnggUpload"
            element={<ProtectedRoute login={login} element={<Engg_XLSXFileSelection />} />}
          />
          <Route
            path="/Layout1"
            element={<ProtectedRoute login={login} element={<SingleCertificate />} />}
          />
          <Route
            path="/Layout2"
            element={<ProtectedRoute login={login} element={<AllBatchCertificates />} />}
          />
          <Route
            path="/ZIPFile"
            element={<ProtectedRoute login={login} element={<ZipSelection />} />}
          />
          <Route
            path="/PucUpload"
            element={<ProtectedRoute login={login} element={<PUC_XLSXSelection />} />}
          />
        </Routes>
      </SnackbarProvider>
    </div>
  );
}

export default App;
