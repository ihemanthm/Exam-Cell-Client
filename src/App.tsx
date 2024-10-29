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
import GradeSheet from "./components/GradeSheet";
import TemporaryCertificate from './components/TemporaryCertificate';
import Login from "./components/Login";
import SerialNumbersSubmission from "./components/SerialNumbersSubmission";
import RankListByBatch from "./components/RankListByBatch";
import StudentDetails from "./components/StudentDetails";
import Backup from "./components/Backup";
import ResultsPage from "./components/ResultsPage"

// // Protected Route Component
// function ProtectedRoute({ element, login }: { element: JSX.Element, login: boolean }) {
//   // return login ? element : <Navigate to="/" />;
//   return element;
// }

function App() {
  // const [login, setLogin] = useState(true);

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
          {/* <Route path="/" element={<Login setLogin={setLogin} />} /> */}

          {/* Protected Routes */}
          <Route
            path="/EnggUpload"
            element={<Engg_XLSXFileSelection />}
          />
          <Route
            path="/Layout1"
            element={<SingleCertificate />}
          />
          <Route
            path="/Layout2"
            element={<AllBatchCertificates />}
          />
          <Route
            path="/ZIPFile"
            element={<ZipSelection />}
          />
          <Route
            path="/"
            element={<PUC_XLSXSelection />}
          />
          <Route
            path="/gradeSheet"
            element={<GradeSheet />}
          />
          <Route
            path="/temporaryCertificate"
            element={<TemporaryCertificate />}
          />
          <Route
            path="/SerialNo"
            element={<SerialNumbersSubmission />}
          />
          <Route 
            path="/RankListByBatch"
            element={<RankListByBatch />}
          />
          <Route 
            path="/StudentDetails"
            element={<StudentDetails />}
          />
          <Route
            path="/Backup"
            element={<Backup />}
          />
          <Route
            path="/results"
            element={<ResultsPage />}
          />
        </Routes>
      </SnackbarProvider>
    </div>
  );
}

export default App;
