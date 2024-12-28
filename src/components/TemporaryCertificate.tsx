import React from "react";
import TemporaryPucLayout from "../certificateLayouts/Temporary_PUC_Layout";
import TemporaryEnggLayout from "../certificateLayouts/Temporary_ENGG_Layout";
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
    }
    const initialValues: FormValues = {
        ID: "",
        type: "puc",
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
            const url = formik.values.type === "puc" ? getPUCDetailsById : getEnggDetailsById;
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
            if (error.status === 404) {
                dispatch(
                    setSnackBar({
                        message: "Student not found",
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
        puc_temp_page: {
            marginTop: 10,
            paddingBottom: 30,
            paddingLeft: 50,
            paddingRight: 50,
        },
        engg_temp_page: {
            marginTop: 20,
            textAlign: "justify",
            marginLeft: 20,
            marginRight: 40,
            backgroundColor: "transparent",
          },
    });
    return (
        <>
            <div className="home-pdf-container">
                <h1>Temporary Certificate</h1>
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
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Enter ID"
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
                                {formik.values.type === "puc" ? (
                                    <Page style={styles.puc_temp_page}>
                                        <TemporaryPucLayout student={details} />
                                    </Page>
                                ) : (
                                    <Page style={styles.engg_temp_page}>
                                        <TemporaryEnggLayout details={details} />
                                    </Page>
                                )}
                            </Document>
                        </PDFViewer>
                    </>
                )}
            </div>
        </>
    );
}
