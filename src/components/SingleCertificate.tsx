import React from "react";
import PUC_Layout_1 from "../certificateLayouts/PUC_Layout_1";
import Engg_Layout_1 from "../certificateLayouts/Engg_Layout_1";
import Button from "@mui/material/Button";
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  StyleSheet,
} from "@react-pdf/renderer";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import "../styles/FileSelection.css";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { setSnackBar } from "../store/features/snackbar/snackbar";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

export default function SingleCertificate() {
  const [details, setDetails] = useState<any | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useDispatch();

  const getDetailsById = process.env.REACT_APP_GET_PUC_DETAILS_BY_ID;
  const getEnggDetailsById = process.env.REACT_APP_GET_ENGG_DETAILS_BY_ID;

  interface ResponseData {
    message?: string;
  }
  interface FormValues {
    ID: string;
  }
  const initialValues: FormValues = {
    ID: "",
  };
  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    const pattern = /^R\d{6}$/;
    if (!pattern.test(values.ID)) {
      errors.ID = "Invalid ID";
    } else {
      errors.ID = "";
    }
    return errors;
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validate,
    onSubmit: (values) => {},
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDetails(null);
    setLoader(true);
    try {
      const response = await axios.get(getEnggDetailsById + formik.values.ID);
      console.log(response);
      setDetails(response.data);
      setLoader(false);
    } catch (error: any) {
      setLoader(false);
      if (error.status == 404) {
        dispatch(
          setSnackBar({
            message: "User not found",
            variant: "warning",
          })
        );
      } else {
        dispatch(
          setSnackBar({
            message: "Faied to search student",
            variant: "error",
          })
        );
      }
    }
  };
  const styles = StyleSheet.create({
    page: {
      marginTop: 60,
      paddingBottom: 30,
      paddingLeft: 40,
      paddingRight: 50,
      textAlign: "justify",
      backgroundColor: "transparent",
    },
    engg_page: {
      marginTop: 80,
      textAlign: "justify",
      marginLeft: 20,
      marginRight: 40,
      backgroundColor: "transparent",
    },
  });
  return (
    <>
      <div className="home-pdf-container">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="input-box">
            <input
              type="text"
              placeholder="ID (RXXXXXX)"
              name="ID"
              className="input-field"
              id="ID"
              onChange={formik.handleChange}
              value={formik.values.ID}
              required
              pattern="R\d{6}"
            />
            <button type="submit" className="submit-btn">
              {loader ? (
                <CircularProgress size={27} sx={{ color: "white" }} />
              ) : (
                "Search"
              )}
            </button>
            {details && (
              <button
                type="reset"
                onClick={() => {
                  setDetails(null);
                  formik.resetForm();
                }}
                className="submit-btn"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* {details && (
          <>
            <PDFViewer
              style={{
                width: "80%",
                height: "100vh",
              }}
            >
              <Document>
                <Page size="A4" style={styles.page}>
                  <PUC_Layout_1 student={details} />
                </Page>
              </Document>
            </PDFViewer>

            <PDFDownloadLink
              document={
                <Document>
                  <Page size="A4" style={styles.page}>
                    <PUC_Layout_1 student={details} />
                  </Page>
                </Document>
              }
              fileName={`${details.ID}_memo.pdf`}
            >
              <Button
                variant="contained"
                sx={{ backgroundColor: "black", color: "white" }}
                endIcon={<DownloadForOfflineRoundedIcon />}
              >
                Download
              </Button>
            </PDFDownloadLink>
          </>
        )} */}

        {details && (
          <PDFViewer
            style={{
              width: "80%",
              height: "100vh",
            }}
          >
            <Document>
              <Page size="A4" style={styles.engg_page}>
                <Engg_Layout_1 details={details} />
              </Page>
            </Document>
          </PDFViewer>
        )}
      </div>
    </>
  );
}
