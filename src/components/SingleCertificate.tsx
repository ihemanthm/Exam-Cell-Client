import React from "react";
import PDFFile from "../certificateLayouts/PDFFile";
import Button from "@mui/material/Button";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
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
      const response = await axios.get(
        `http://localhost:8000/api/v1/getStudentById/${formik.values.ID}`
      );
      if(!response.data)
      {
        dispatch(
          setSnackBar({
            message: "User not found",
            variant: "warning",
          })
        );
        setDetails(null);
      }
      else
      {
        setDetails(response.data);
      }
        setLoader(false);
    } catch (error) {
      setLoader(false);
      dispatch(
        setSnackBar({
          message: "Faied to search student",
          variant: "error",
        })
      );
      console.log(error);
    }
  };
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
            {details&&<button type="reset" onClick={()=>
              {
                setDetails(null);
                formik.resetForm();
              }
            } className="submit-btn">
              Cancel
            </button>}
          </div>
        </form>

        {details&&(
          <>
            <PDFViewer
              style={{
                width: "80%",
                height: "100vh",
              }}
            >
              <PDFFile student={details} />
            </PDFViewer>

            <PDFDownloadLink document={<PDFFile student={details}/>}fileName={`${details.ID}_memo.pdf`}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "black", color: "white" }}
                endIcon={<DownloadForOfflineRoundedIcon />}
              >
                Download
              </Button>
            </PDFDownloadLink>
          </>
        )}
      </div>
    </>
  );
}
