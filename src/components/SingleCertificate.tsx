import React from "react";
import PUC_Layout_1 from "../certificateLayouts/PUC_Layout_1";
import Engg_Layout_1 from "../certificateLayouts/Engg_Layout_1";
import PUC_Layout_2 from "../certificateLayouts/PUC_Layout_2";
import Button from "@mui/material/Button";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

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

  const getPUCDetailsById = process.env.REACT_APP_GET_PUC_DETAILS_BY_ID;
  const getEnggDetailsById = process.env.REACT_APP_GET_ENGG_DETAILS_BY_ID;

  interface ResponseData {
    message?: string;
  }
  interface FormValues {
    ID: string;
    type: string;
    layout: string;
  }
  const initialValues: FormValues = {
    ID: "",
    type: "",
    layout: "L1",
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
      const url =
        formik.values.type == "puc" ? getPUCDetailsById : getEnggDetailsById;

      const response = await axios.get(url + formik.values.ID);
      setDetails(response.data);
      dispatch(
        setSnackBar({
          message: `${formik.values.ID} PDF is generating ,Please wait ....`,
          variant: "info",
        })
      );
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
    PUC_Layout_1_page: {
      marginTop: 60,
      paddingBottom: 30,
      paddingLeft: 50,
      paddingRight: 50,
      backgroundColor: "transparent",
    },
    engg_page: {
      marginTop: 80,
      textAlign: "justify",
      marginLeft: 20,
      marginRight: 40,
      backgroundColor: "transparent",
    },
    PUC_Layout_2_page: {
      marginTop: 130,
      paddingBottom: 30,
      paddingLeft: 50,
      paddingRight: 50,
      backgroundColor: "transparent",
    },
  });
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
            style={{ display: "flex", marginBottom: "10px" }}
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
          <div className="layout-radios">
            {formik.values.type === "puc" && (
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
          </div>
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

        {details && (
          <>
            <PDFViewer
              style={{
                width: "80%",
                height: "100vh",
              }}
            >
              <Document>
                {formik.values.type === "puc" &&
                formik.values.layout == "L1" ? (
                  <Page size="A4" style={styles.PUC_Layout_1_page}>
                    <PUC_Layout_1 student={details} />
                  </Page>
                ) : formik.values.type === "puc" &&
                  formik.values.layout == "L2" ? (
                  <Page
                    size="A4"
                    orientation="landscape"
                    style={styles.PUC_Layout_2_page}
                  >
                    <PUC_Layout_2 student={details} />
                  </Page>
                ) : (
                  <Page style={styles.engg_page}>
                    <Engg_Layout_1 details={details} />
                  </Page>
                )}
              </Document>
            </PDFViewer>

            <PDFDownloadLink
              document={
                <Document>
                  {formik.values.type === "puc" &&
                  formik.values.layout == "L1" ? (
                    <Page size="A4" style={styles.PUC_Layout_1_page}>
                      <PUC_Layout_1 student={details} />
                    </Page>
                  ) : formik.values.type === "puc" &&
                    formik.values.layout == "L2" ? (
                    <Page
                      size="A4"
                      orientation="landscape"
                      style={styles.PUC_Layout_2_page}
                    >
                      <PUC_Layout_2 student={details} />
                    </Page>
                  ) : (
                    <Page style={styles.engg_page}>
                      <Engg_Layout_1 details={details} />
                    </Page>
                  )}
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
        )}

        {/* {details && (
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
        )} */}
      </div>
    </>
  );
}
