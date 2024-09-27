import React from "react";
// import PUC_Layout_1 from "../certificateLayouts/PUC_Layout_1";
// import Engg_Layout_1 from "../certificateLayouts/Engg_Layout_1";
// import PUC_Layout_2 from "../certificateLayouts/PUC_Layout_2";
import Temporary_PUC_Layout from "../certificateLayouts/Temporary_PUC_Layout";
import Temporary_ENGG_Layout from "../certificateLayouts/Temporary_ENGG_Layout";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

import {
    PDFViewer,
    PDFDownloadLink,
    Document,
    Page,
    StyleSheet,
} from "@react-pdf/renderer";

import background from "../certificateLayouts/background.jpg";
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
    }
    const initialValues: FormValues = {
        ID: "",
        type: "puc",
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
        onSubmit: (values) => { },
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setDetails(null);
        setLoader(true);
        try {
            const url = formik.values.type == "puc" ? getPUCDetailsById : getEnggDetailsById;
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
                                {formik.values.type === "puc" ? (
                                    <Page style={styles.puc_temp_page}>
                                        <Temporary_PUC_Layout student={details} />
                                    </Page>
                                ) : (
                                    <Page style={styles.engg_temp_page}>
                                        <Temporary_ENGG_Layout details={details} />
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
