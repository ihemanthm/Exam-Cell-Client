import React, { useEffect } from "react";
import AllbatchPDFFIle from "../certificateLayouts/AllbatchPDFFIle";
import Button from "@mui/material/Button";
import { PDFViewer, Document, PDFDownloadLink } from "@react-pdf/renderer";
import "../styles/FileSelection.css";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { setSnackBar } from "../store/features/snackbar/snackbar";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

export default function AllBatchCertificate() {
  const [details, setDetails] = useState<any | null>(null);
  const [pdfDetails, setPDFDetails] = useState<any | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [showRangeSelect, setShowRangeSelect] = useState<boolean>(false);

  const dispatch = useDispatch();

  const getPUCBatchDetails = process.env.REACT_APP_GET_PUC_BATCH;
  const getEnggBatchDetails = process.env.REACT_APP_GET_ENGG_BATCH;

  interface StudentData {
    id: number;
    name: string;
  }

  interface FormValues {
    REGULATION: string;
    range: string;
    type: string;
    layout: string;
  }
  const initialValues: FormValues = {
    REGULATION: "",
    range: "",
    type: "",
    layout: "L1",
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

  const generateRangeOptions = () => {
    if (details && details.length === null) return [];
    const options = [];
    const numberOfRanges = Math.ceil(
      ((details && parseInt(details[details.length - 1].ID.slice(-4), 10)) -
        (details && parseInt(details[0].ID.slice(-4), 10))) /
        100
    ); // Calculate number of rangesd
    const remaining = details && details.length % 100;
    for (let i = 0; i < numberOfRanges; i++) {
      const start = i * 100 + 1;
      const end = Math.min((i + 1) * 100, details.length);

      options.push({
        label: `${start}-${end}`, // Range label
        value: `${start}-${end}`, // Range value as a string
      });
    }
    // if (remaining) {
    //   const start = numberOfRanges * 100 + 1;
    //   const end = details && details.length;
    //   options.push({
    //     label: `${start}-${end}`,
    //     value: `${start}-${end}`,
    //   });
    // }
    return options;
  };

  const rangeOptions = generateRangeOptions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!details) return;
    let array = [];
    const [start, end] = formik.values.range.split("-").map(Number);

    for (let i = 0; i < details.length; i++) {
      const ID = parseInt(details[i].ID.slice(-4), 10);
      if (ID >= start && ID <= end) {
        array.push(details[i]);
      }
    }

    if (array.length > 0) {
      setLoader(true); // Show loader while processing the PDF details
      setPDFDetails(array);
      setLoader(false);
      dispatch(
        setSnackBar({
          message: `${formik.values.REGULATION} batch pdf is generating please wait...`,
          variant: "info",
        })
      ); // Stop loader when done
    } else {
      // Handle case when no data matches the range
      dispatch(
        setSnackBar({
          message: "No students found in the selected range",
          variant: "warning",
        })
      );
      setLoader(false);
    }
  };
  const handleRange = async () => {
    try {
      if (formik.values.type === "" || formik.values.REGULATION === "") {
        dispatch(
          setSnackBar({
            message: `Select the fields properly`,
            variant: "warning",
          })
        );
        return;
      }
      setLoader(true);
      const url =
        formik.values.type == "puc" ? getPUCBatchDetails : getEnggBatchDetails;
      const response = await axios.get<StudentData[]>(
        `${url}${formik.values.REGULATION}`
      );
      console.log(response.data);
      setDetails(response.data);
      setShowRangeSelect(true);
      dispatch(
        setSnackBar({
          message: `Please wait,select range of ID `,
          variant: "info",
        })
      );
      setLoader(false);
    } catch (error) {
      setLoader(false);
      const err = error as any; // Ensure error is cast to any
      if (err.response?.status === 404) {
        dispatch(
          setSnackBar({
            message: `${formik.values.REGULATION} batch has no records`,
            variant: "warning",
          })
        );
      } else {
        dispatch(
          setSnackBar({
            message: "Failed to search student",
            variant: "error",
          })
        );
      }
      setDetails(null);
    }
    setShowRangeSelect(true);
  };
  return (
    <>
      <div className="home-pdf-container">
        <form
          onSubmit={handleSubmit}
          className="search-form"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div
            className="radio-buttons"
            style={{ display: "flex", marginBottom: "30px" }}
          >
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="type"
              className="radio-btn"
              value={formik.values.type}
            >
              <FormControlLabel
                value="puc"
                onChange={formik.handleChange}
                className="radio-btn"
                control={
                  <Radio
                    sx={{
                      color: "gray",
                      "&.Mui-checked": {
                        color: "black",
                      },
                    }}
                    required
                    disabled={details ? true : false}
                  />
                }
                label="PUC"
                required={false}
              />
              <FormControlLabel
                value="engg"
                onChange={formik.handleChange}
                className="radio-btn"
                control={
                  <Radio
                    sx={{
                      color: "gray",
                      "&.Mui-checked": {
                        color: "black",
                      },
                    }}
                    required
                    disabled={details ? true : false}
                  />
                }
                label="Engineering"
                required={false}
              />
            </RadioGroup>
          </div>
          <div className="input-box" style={{ marginBottom: "30px" }}>
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
            <button
              className="submit-btn"
              disabled={details}
              onClick={handleRange}
            >
              {loader && pdfDetails == null ? (
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
                  setShowRangeSelect(false);
                  setPDFDetails(null);
                  formik.resetForm();
                }}
                className="submit-btn"
              >
                Cancel
              </button>
            )}
          </div>

          {rangeOptions.length > 0 &&
            showRangeSelect &&
            formik.values.type === "puc" && (
              <div className="layouts" style={{ display: "flex" }}>
                <RadioGroup
                  defaultValue="L1"
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="layout"
                >
                  <FormControlLabel
                    value="L1"
                    onChange={formik.handleChange}
                    control={
                      <Radio
                        sx={{
                          color: "gray",
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    }
                    label="Layout 1"
                  />
                  <FormControlLabel
                    value="L2"
                    onChange={formik.handleChange}
                    control={
                      <Radio
                        sx={{
                          color: "gray",
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    }
                    label="Layout 2"
                  />
                </RadioGroup>
              </div>
            )}
          {rangeOptions.length > 0 && showRangeSelect && (
            <>
              <div className="ranges">
                <select
                  name="range"
                  className="range"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.range}
                  style={{ marginBottom: "30px" }}
                >
                  {rangeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="submit-btn"
                style={{ width: "70%" }}
              >
                {loader ? (
                  <CircularProgress size={27} sx={{ color: "white" }} />
                ) : (
                  "Generate PDF"
                )}
              </button>
            </>
          )}
        </form>

        {pdfDetails && pdfDetails.length > 0 && (
          <PDFViewer
            style={{
              width: "80%",
              height: "100vh",
            }}
          >
            <Document>
              <AllbatchPDFFIle type={formik.values.type} details={pdfDetails} layout={formik.values.layout}/>
            </Document>
          </PDFViewer>
        )}
      </div>
    </>
  );
}
