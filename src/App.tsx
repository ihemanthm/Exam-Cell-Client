import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // Import Navigate for redirection
import AppNavbar from "./components/Navbar";
import "./App.css";
import SnackbarListener from "./components/SnackBarListener";
import { SnackbarProvider } from "notistack";
import AllBatchCertificates from "./components/AllBatchCertificate";
import ZipSelection from "./components/ZIPFileSelection";
import PucXlsxSelection from "./components/PUC_XLSXFileSelection";
import SingleCertificate from "./components/SingleCertificate";
import EnggXlsxSelection from "./components/Engg_XLSXFileSelection";
import GradeSheet from "./components/GradeSheet";
import TemporaryCertificate from "./components/TemporaryCertificate";
import Login from "./components/Login";
import SerialNumbersSubmission from "./components/SerialNumbersSubmission";
import RankListByBatch from "./components/RankListByBatch";
import StudentDetails from "./components/StudentDetails";
import Backup from "./components/Backup";
import ResultsPage from "./components/ResultsPage";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { loggedStatus } from "./store/features/user/user";
import { useSelector } from "react-redux";
import { RootState } from "./store/Store";
import Footer from "./components/footer";
import Faq from "./components/faq";
function App() {
  const dispatch = useDispatch();
  const logged = useSelector((state: RootState) => state.logStatus.logged);
  console.log(`logged : ${logged}`);
  interface DecodedToken {
    exp?: number;
  }

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp === undefined) {
        return false;
      }

      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  };
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      if (isTokenExpired(localStorage.getItem("authToken") as string)) {
        dispatch(
          loggedStatus({
            logged: false,
            token: "",
            name: "",
            email: "",
          })
        );
        localStorage.removeItem("authToken");
      }
    }
  });
  return (
    <div>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      >
        <SnackbarListener />
        <AppNavbar />
        <div className="app-container">
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={!logged ? <Login /> : <Navigate to="/home" />}
              />
              <Route
                path="/home"
                element={logged ? <Faq /> : <Navigate to="/" />}
              />
              <Route
                path="/EnggUpload"
                element={logged ? <EnggXlsxSelection /> : <Navigate to="/" />}
              />
              <Route
                path="/Layout1"
                element={logged ? <SingleCertificate /> : <Navigate to="/" />}
              />
              <Route
                path="/Layout2"
                element={
                  logged ? <AllBatchCertificates /> : <Navigate to="/" />
                }
              />
              <Route
                path="/ZIPFile"
                element={logged ? <ZipSelection /> : <Navigate to="/" />}
              />
              <Route
                path="/PUCUpload"
                element={logged ? <PucXlsxSelection /> : <Navigate to="/" />}
              />
              <Route
                path="/gradeSheet"
                element={logged ? <GradeSheet /> : <Navigate to="/" />}
              />
              <Route
                path="/temporaryCertificate"
                element={
                  logged ? <TemporaryCertificate /> : <Navigate to="/" />
                }
              />
              <Route
                path="/SerialNo"
                element={
                  logged ? <SerialNumbersSubmission /> : <Navigate to="/" />
                }
              />
              <Route
                path="/RankListByBatch"
                element={logged ? <RankListByBatch /> : <Navigate to="/" />}
              />
              <Route
                path="/StudentDetails"
                element={logged ? <StudentDetails /> : <Navigate to="/" />}
              />
              <Route
                path="/Backup"
                element={logged ? <Backup /> : <Navigate to="/" />}
              />
              <Route
                path="/results"
                element={logged ? <ResultsPage /> : <Navigate to="/" />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          {logged ? <Footer /> : ""}
        </div>
      </SnackbarProvider>
    </div>
  );
}

export default App;
