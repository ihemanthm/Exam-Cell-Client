import React, { useState } from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import "../styles/FileSelection.css";
import { useFormik } from "formik";
import axios from "axios";
import { setSnackBar } from "../store/features/snackbar/snackbar";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { StyleSheet } from "@react-pdf/renderer";

export default function SerialNumbersSubmission() {
  const [details, setDetails] = useState<any | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useDispatch();

  const updateEnggCertificate =
    process.env.REACT_APP_UPDATE_ENGG_CERTIFICATE || "";
  const updatePUCCertificate =
    process.env.REACT_APP_UPDATE_PUC_CERTIFICATE || "";

  const getPUCDetailsById = process.env.REACT_APP_GET_PUC_DETAILS_BY_ID;
  const getEnggDetailsById = process.env.REACT_APP_GET_ENGG_DETAILS_BY_ID;

  interface FormValues {
    ID: string;
    type: string;
    CERTIFICATE_NUMBER: string;
    CONSOLIDATE_CERTIFICATE_NO: string;
    PROVISIONAL_CERTIFICATE_NO: string;
    ORIGINAL_DEGREE_CERTIFICATE_NO: string;
    ISSUED_SEM_CARDS_NUMBER: number;
  }

  interface PUCDetails {
    CERTIFICATE_NUMBER: string;
  }

  interface EngineeringDetails {
    CONSOLIDATE_CERTIFICATE_NO: string;
    PROVISIONAL_CERTIFICATE_NO: string;
    ORIGINAL_DEGREE_CERTIFICATE_NO: string;
    ISSUED_SEM_CARDS_NUMBER: number;
  }

  const initialValues: FormValues = {
    ID: "",
    type: "puc",
    CERTIFICATE_NUMBER: "",
    CONSOLIDATE_CERTIFICATE_NO: "",
    PROVISIONAL_CERTIFICATE_NO: "",
    ORIGINAL_DEGREE_CERTIFICATE_NO: "",
    ISSUED_SEM_CARDS_NUMBER: 0,
  };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    const pattern = /^R\d{6}$/;
    if (!pattern.test(values.ID)) {
      errors.ID = "Invalid ID";
    }
    return errors;
  };

  const styles = StyleSheet.create({
    inputField: {
      display: "flex",
      flexDirection: "column",
      marginBottom: 20,
    },
    label: {
      fontWeight: "bold",
    },
  });

  const formik = useFormik<FormValues>({
    initialValues,
    validate,
    onSubmit: async (values) => {
      try {
        let data: any; // Declare the data variable

        if (values.type === "puc") {
          data = {
            ID: values.ID,
            CERTIFICATE_NUMBER: values.CERTIFICATE_NUMBER,
          };
        } else {
          data = {
            ID: values.ID,
            CONSOLIDATE_CERTIFICATE_NO: values.CONSOLIDATE_CERTIFICATE_NO,
            PROVISIONAL_CERTIFICATE_NO: values.PROVISIONAL_CERTIFICATE_NO,
            ORIGINAL_DEGREE_CERTIFICATE_NO:
              values.ORIGINAL_DEGREE_CERTIFICATE_NO,
            ISSUED_SEM_CARDS_NUMBER: values.ISSUED_SEM_CARDS_NUMBER,
          };
        }
        const url =
          values.type === "puc" ? updatePUCCertificate : updateEnggCertificate;
        const response = await axios.put(url, data);
        console.log("URL:", response);
        setLoader(true);
        dispatch(
          setSnackBar({
            message: "Student Certificate details are uploaded successfully",
            variant: "success",
          })
        );
        setDetails(null);
      } catch (error: any) {
        dispatch(
          setSnackBar({
            message: "Failed to update Certificate details",
            variant: "error",
          })
        );
      } finally {
        setLoader(false);
      }
    },
  });

  const handleSearchSubmit = async () => {
    setLoader(true);
    setDetails(null);
    try {
      const url =
        formik.values.type === "puc" ? getPUCDetailsById : getEnggDetailsById;
      const response = await axios.get(url + formik.values.ID); // Specify the expected type

      // Set field values based on the type
      if (formik.values.type === "puc") {
        formik.setFieldValue(
          "CERTIFICATE_NUMBER",
          (response.data as PUCDetails).CERTIFICATE_NUMBER
        );
      } else if (formik.values.type === "engg") {
        const engineeringData = response.data as EngineeringDetails; // Cast to EngineeringDetails
        formik.setFieldValue(
          "CONSOLIDATE_CERTIFICATE_NO",
          engineeringData.CONSOLIDATE_CERTIFICATE_NO
        );
        formik.setFieldValue(
          "PROVISIONAL_CERTIFICATE_NO",
          engineeringData.PROVISIONAL_CERTIFICATE_NO
        );
        formik.setFieldValue(
          "ORIGINAL_DEGREE_CERTIFICATE_NO",
          engineeringData.ORIGINAL_DEGREE_CERTIFICATE_NO
        );
        formik.setFieldValue(
          "ISSUED_SEM_CARDS_NUMBER",
          engineeringData.ISSUED_SEM_CARDS_NUMBER
        );
      }

      setDetails(response.data);
      dispatch(
        setSnackBar({
          message: `${formik.values.ID} Found`,
          variant: "info",
        })
      );
    } catch (error: any) {
      if (error.response?.status === 404) {
        dispatch(
          setSnackBar({
            message: "Student not found",
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
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="home-pdf-container">
      <h1>Update Serial Numbers</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="search-form"
        style={styles.inputField}
      >
        <div
          className="radio-buttons"
          style={{ display: "flex", marginBottom: "10px" }}
        >
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="type"
            className="radio-btn"
            value={formik.values.type}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="puc"
              control={
                <Radio
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                  required={false}
                  disabled={details ? true : false}
                />
              }
              label="PUC"
            />
            <FormControlLabel
              value="engg"
              control={
                <Radio
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                  required={false}
                  disabled={details ? true : false}
                />
              }
              label="Engineering"
            />
          </RadioGroup>
        </div>
        <div className="input-box" style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="ID (RXXXXXX)"
            name="ID"
            className="input-field"
            disabled={details}
            id="ID"
            onChange={formik.handleChange}
            value={formik.values.ID}
            required
          />
          <button
            className="submit-btn"
            disabled={loader||details}
            onClick={handleSearchSubmit}
          >
            {loader ? (
              <CircularProgress size={27} sx={{ color: "white" }} />
            ) : (
              "Search"
            )}
          </button>
          {details && (
            <button
              type="button"
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

        {details && formik.values.type === "engg" && (
          <>
            <div className="input-box" style={styles.inputField}>
              <label
                htmlFor="consolidateCertificateNumber"
                style={styles.label}
              >
                Consolidate Certificate Number
              </label>
              <input
                type="text"
                placeholder="Enter Consolidate Certificate Number"
                name="CONSOLIDATE_CERTIFICATE_NO"
                className="input-field"
                id="consolidateCertificateNumber"
                onChange={formik.handleChange}
                value={formik.values.CONSOLIDATE_CERTIFICATE_NO}
              />
            </div>
            <div className="input-box" style={styles.inputField}>
              <label
                htmlFor="provisionalCertificateNumber"
                style={styles.label}
              >
                Provisional Certificate Number
              </label>
              <input
                type="text"
                placeholder="Enter Provisional Certificate Number"
                name="PROVISIONAL_CERTIFICATE_NO"
                className="input-field"
                id="provisionalCertificateNumber"
                onChange={formik.handleChange}
                value={formik.values.PROVISIONAL_CERTIFICATE_NO}
              />
            </div>
            <div className="input-box" style={styles.inputField}>
              <label htmlFor="originalCertificateNumber" style={styles.label}>
                Original Certificate Number
              </label>
              <input
                type="text"
                placeholder="Enter Original Certificate Number"
                name="ORIGINAL_DEGREE_CERTIFICATE_NO"
                className="input-field"
                id="originalCertificateNumber"
                onChange={formik.handleChange}
                value={formik.values.ORIGINAL_DEGREE_CERTIFICATE_NO}

              />
            </div>
            <div className="input-box" style={styles.inputField}>
              <label htmlFor="semCardsIssued" style={styles.label}>
                No of Sem Cards Issued
              </label>
              <input
                type="text"
                placeholder="Enter No of Sem Cards Issued"
                name="ISSUED_SEM_CARDS_NUMBER"
                className="input-field"
                id="semCardsIssued"
                onChange={formik.handleChange}
                value={formik.values.ISSUED_SEM_CARDS_NUMBER}
              />
            </div>
          </>
        )}

        {details && formik.values.type === "puc" && (
          <div className="input-box" style={styles.inputField}>
            <label htmlFor="candidateCertificateNumber" style={styles.label}>
              PUC Certificate Number
            </label>
            <input
              type="text"
              placeholder="Enter PUC Certificate Number"
              name="CERTIFICATE_NUMBER"
              className="input-field"
              id="candidateCertificateNumber"
              onChange={formik.handleChange}
              value={formik.values.CERTIFICATE_NUMBER}
            />
          </div>
        )}

        {details && (
          <div style={{ marginLeft: 290, marginTop: "10px" }}>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
}