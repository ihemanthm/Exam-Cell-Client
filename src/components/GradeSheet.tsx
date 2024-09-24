import React from "react";
import Button from "@mui/material/Button";
import Grade_Sheet from "../certificateLayouts/Grade_Sheet";

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

export default function GradeSheet() {
    const [details, setDetails] = useState<any | null>(null);
    const [loader, setLoader] = useState<boolean>(false);
    const dispatch = useDispatch();

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
        onSubmit: (values) => { },
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setDetails(null);
        setLoader(true);
        try {

            const response = await axios.get(getEnggDetailsById + formik.values.ID);
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
        gradeSheet: {
            marginTop: 60,
            paddingBottom: 30,
            paddingLeft: 50,
            paddingRight: 50,
            backgroundColor: "transparent",
        },
    });


    interface BioData {

        REGULATION: string;
        SNAME: string;
        FNAME: string;
        ID: string;
        GRP: string;
        DOB: Date;
    }

    return (
        <>
            <div className="home-pdf-container">
                <form
                    onSubmit={handleSubmit}
                    className="search-form"
                    style={{ display: "flex", flexDirection: "column" }}
                >
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
                {details &&(
                    <PDFViewer style={{ width: "80%", height: "100vh", }}>
                        <Document>
                            {details && details.ENGG_RECORDS.map((sem: any, index: number) => {
                                return (
                                    <Page size="A4" style={styles.gradeSheet}>
                                        <Grade_Sheet details={details} semno={index + 1} />
                                    </Page>)
                            })};
                        </Document>
                    </PDFViewer>
                )};

                {/* {details && (
                    <>
                        <Page style={styles.gradeSheet}>
                            <Grade_Sheet details={details} />
                        </Page>

                        <PDFDownloadLink
                            document={
                                <Document>
                                    <Page style={styles.gradeSheet}>
                                        <Grade_Sheet details={details} />
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
            </div>
        </>
    );
}
