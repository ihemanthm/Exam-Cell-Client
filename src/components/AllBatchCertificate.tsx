import React from "react";
import AllbatchPDFFIle from "../certificateLayouts/AllbatchPDFFIle";
import Button from "@mui/material/Button";
import { PDFViewer, Document } from "@react-pdf/renderer";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import "../styles/FileSelection.css";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { setSnackBar } from "../store/features/snackbar/snackbar";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { set } from "mongoose";

export default function AllBatchCertificate() {
  const [details, setDetails] = useState<any | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [pdfLoading,setPdfLoading]=useState<boolean>(false);
  const [rangeCert, setRangeCert] = useState({
    start: 0,
    end: 0,
  });
  const dispatch = useDispatch();

  const getBatchDetails=process.env.REACT_APP_GET_PUC_BATCH;

  interface FormValues {
    REGULATION: string;
    range: number;
  }
  const initialValues: FormValues = {
    REGULATION: "",
    range: 1,
  };
  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    const pattern = /^R\d{2}$/;
    if (!pattern.test(values.REGULATION)) {
      errors.REGULATION = "Invalid ID";
    } else {
      errors.REGULATION = "";
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
    setRangeCert({
      start: formik.values.range * 100 - 99,
      end: formik.values.range * 100,
    });
    try {
      let response = await axios.get(
        getBatchDetails+formik.values.REGULATION
      );

      setDetails(response.data);
      dispatch(
        setSnackBar({
          message: `Please wait, ${formik.values.REGULATION} PDF is loading.`,
          variant: "info",
        })
      );
      setLoader(false);
      setPdfLoading(true);
    } catch (error) {
      const err = error as any;
      setLoader(false);
      if (err.status === 404) {
        dispatch(
          setSnackBar({
            message: `${formik.values.REGULATION} batch has no records`,
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
      setDetails(null);
    }
  };
  return (
    <>
      <div className="home-pdf-container">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter the Batch (RXX)"
              name="REGULATION"
              className="input-field field"
              id="REGULATION"
              onChange={formik.handleChange}
              value={formik.values.REGULATION}
              required
              pattern="R\d{2}"
              disabled={details}
            />
            <select
              name="range"
              className="range"
              required
              onChange={formik.handleChange}
              value={formik.values.range}
              disabled={details}
            >
              <option value={1}>1-100</option>
              <option value={2}>101-200</option>
              <option value={3}>201-300</option>
              <option value={4}>301-400</option>
              <option value={5}>401-500</option>
              <option value={6}>501-600</option>
              <option value={7}>601-700</option>
              <option value={8}>701-800</option>
              <option value={9}>801-900</option>
              <option value={10}>901-1000</option>
              <option value={11}>1001-1100</option>
            </select>
            <button type="submit" className="submit-btn" disabled={details}>
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

        {details && (
          <>
            <PDFViewer
              style={{
                width: "80%",
                height: "100vh",
              }}
            >
              <Document>
                <AllbatchPDFFIle
                  details={details && details}
                  start={rangeCert.start}
                  end={rangeCert.end}
                />
              </Document>
            </PDFViewer>
          </>
        )}


        
      </div>
    </>
  );
}
