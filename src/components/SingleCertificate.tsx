import React from "react";
import PucLayout1 from "../certificateLayouts/PUC_Layout_1";
import EnggLayout1 from "../certificateLayouts/Engg_Layout_1";
import PucLayout2 from "../certificateLayouts/PUC_Layout_2";
import Card from '@mui/material/Card';
import EnggLayout2 from "../certificateLayouts/Engg_Layout_2";
import CardMedia from '@mui/material/CardMedia';
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

import {
  PDFViewer,
  Document,
  Page,
  StyleSheet,
} from "@react-pdf/renderer";
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

  interface FormValues {
    ID: string;
    type: string;
    layout: string;
  }
  const initialValues: FormValues = {
    ID: "",
    type: "puc",
    layout: "L1",
  };

  const formik = useFormik<FormValues>({
    initialValues,
    onSubmit: (values) => { },
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDetails(null);
    setLoader(true);
    try {
      const url =
        formik.values.type === "puc" ? getPUCDetailsById : getEnggDetailsById;

      const response:any = await axios.get(url + formik.values.ID);
      if(formik.values.type === "puc" && response.data.CURRENT_REMS>0){
        dispatch(
          setSnackBar({
            message: `Remedial Records found`,
            variant: "warning",
          })
        );
      }
      else if(formik.values.type==="engg" && formik.values.layout==="L2" && response.data.CURRENT_REMS>0){
        dispatch(
          setSnackBar({
            message: `Remedial Records found`,
            variant:"warning",
          })
        );
      }
      else{
        setDetails(response.data);
        dispatch(
          setSnackBar({
            message: `${formik.values.ID} PDF is generating ,Please wait ....`,
            variant: "info",
          })
        );
      }
    } catch (error: any) {
      if (error.status === 404) {
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
    finally{
      setLoader(false);
    }
  };
  const styles = StyleSheet.create({
    PUC_Layout_1_page: {
      marginTop: 77,
      paddingBottom: 30,
      paddingLeft: 50,
      paddingRight: 50,
      backgroundColor: "transparent",
    },
    engg_page: {
      marginTop: 80,
      textAlign: "justify",
      marginLeft: 10,
      marginRight: 25,
      backgroundColor: "transparent",
    },
    PUC_Layout_2_page: {
      marginTop: 70,
      paddingBottom: 60,
      paddingLeft: 38,
      paddingRight: 35,
      backgroundColor: "transparent",
    },
    engg_page_2: {
      marginTop: 30,
      textAlign: "justify",
      marginLeft: 20,
      marginRight: 0,
      backgroundColor: "transparent",
    },
  });
  return (
    <>
      <div className="home-pdf-container">
        <h1>Single Certificate</h1>
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
                    label={
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Card variant="outlined">
                          <CardMedia
                            component="img"
                            height="100"
                            width="100"
                            image={require("../portrait.png")}
                            alt="Portrait Layout"
                          />
                        </Card>
                        <span>Layout 1</span>
                      </div>
                    }
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
                    label={
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Card variant="outlined">
                          <CardMedia
                            component="img"
                            height="100"
                            width="100"
                            image={require("../landscape.png")}
                            alt="Landscape Layout"
                          />
                        </Card>
                        <span>Layout 2</span>
                      </div>
                    }
                  />
                </RadioGroup>
              </div>
            )}
            {formik.values.type === "engg" && (
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
                    label={
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Card variant="outlined">
                          <CardMedia
                            component="img"
                            height="100"
                            width="100"
                            image={require("../assets/Engg_Layout_Portrait.png")}
                            alt="Portrait Layout"
                          />
                        </Card>
                        <span>Layout 1</span>
                      </div>
                    }
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
                    label={
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Card variant="outlined">
                          <CardMedia
                            component="img"
                            height="100"
                            width="100"
                            image={require("../assets/Engg_Layout_Landscape.png")}
                            alt="Landscape Layout"
                          />
                        </Card>
                        <span>Layout 2</span>
                      </div>
                    }
                  />
                </RadioGroup>
              </div>
            )}
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="ID"
              name="ID"
              className="input-field"
              id="ID"
              onChange={formik.handleChange}
              value={formik.values.ID}
              required
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
                  formik.values.layout === "L1" ? (
                  <Page size="A4" style={styles.PUC_Layout_1_page}>
                    <PucLayout1 student={details} />
                  </Page>
                ) : formik.values.type === "puc" &&
                  formik.values.layout === "L2" ? (
                  <Page
                    size="A4"
                    orientation="landscape"
                    style={styles.PUC_Layout_2_page}
                  >
                    <PucLayout2 student={details} />
                  </Page>
                ) : formik.values.type === "engg" &&
                formik.values.layout === "L1" ?(
                  <Page style={styles.engg_page} size="A4"
                 >
                    <EnggLayout1 details={details} />
                  </Page>
                ):(
                  <Page style={styles.engg_page_2} 
                  orientation="landscape">
                    <EnggLayout2 details={details} />
                  </Page>
                  )
                }
              </Document>
            </PDFViewer>
          </>
        )}
      </div>
    </>
  );
}
