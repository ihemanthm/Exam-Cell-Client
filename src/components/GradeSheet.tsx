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
    const formik = useFormik<FormValues>({
        initialValues,
        onSubmit: (values) => { },
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setDetails(null);
        setLoader(true);
        try {

            const response = await axios.get(getEnggDetailsById + formik.values.ID);
            console.log(response.data);
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
            marginTop: 78,
            paddingBottom: 30,
            paddingLeft: 50,
            paddingRight: 50,
            backgroundColor: "transparent",
        },
    });

    interface Subjects {
        PNO: number,
        PCODE: string,
        PNAME: string,
        EXAMMY: Date,
        CR: number,
        GR: string,
        GRPTS: number,
        TGRP: number,
        ATTEMPT: string,
    }
    interface Record {
        SEM: number,
        SGPA: number,
        CGPA: number,
        TCR: number,
        OBTAINED_CR : number,
        EXAMMY:number,
        SUBJECTS: Subjects[]
    }
    interface StudentRecord {
        REGULATION: string;
        SNAME: string;
        FNAME: string;
        ID: string;
        GRP: string;
        DOB: Date;
        DOJ: Date;
        OBTAINED_CREDITS: number[],
        TOTAL_CREDITS: number[],
        RECORDS: Record[]
    }
    return (
        <>
            <div className="home-pdf-container">
                <h1>Engineering Grade Sheets</h1>
                <form
                    onSubmit={handleSubmit}
                    className="search-form"
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
                    <PDFViewer style={{ width: "80%", height: "100vh", }}>
                        <Document>
                            {(() => {

                                //centralized student structure
                                const student: StudentRecord = {
                                    REGULATION: details.REGULATION,
                                    SNAME: details.SNAME,
                                    FNAME: details.FNAME,
                                    ID: details.ID,
                                    GRP: details.GRP,
                                    DOB: details.DOB,
                                    DOJ: details.DOJ,
                                    OBTAINED_CREDITS: details.OBTAINED_CREDITS,
                                    TOTAL_CREDITS: details.TOTAL_CREDITS,
                                    RECORDS: []
                                };

                                details.ENGG_RECORDS.forEach((sem: any) => {
                                    const currentRecord: Record = {
                                        SEM: sem.SEM,
                                        SGPA: sem.SGPA,
                                        CGPA: sem.CGPA,
                                        TCR: sem.TCR,
                                        EXAMMY:sem.EXAMMY,
                                        OBTAINED_CR : sem.OBTAINED_CR,
                                        SUBJECTS: sem.SUBJECTS || [] ,
                                    };

                                    // Push the current record into the student's records
                                    student.RECORDS.push(currentRecord);

                                    // Check for remedial records
                                    let record = details.REMEDIAL_RECORDS.find((rem_sem: any) => rem_sem.SEM === sem.SEM);
                                    if (record) {
                                        record.REMEDIAL_DATES.forEach((attempt: any) => {
                                            if (attempt.SUBJECTS.length > 0) {
                                                let OBTAINED_CR =0;
                                                attempt.SUBJECTS.forEach((sub:any)=>{
                                                    OBTAINED_CR += sub.TGRP;
                                                })
                                                const remRecord: Record = {
                                                    SEM: record.SEM,
                                                    SGPA: attempt.SGPA,
                                                    CGPA: attempt.CGPA,
                                                    TCR:0,
                                                    EXAMMY:attempt.EXAMMY,
                                                    OBTAINED_CR,
                                                    SUBJECTS: attempt.SUBJECTS
                                                };
                                                student.RECORDS.push(remRecord);
                                            }
                                        });
                                    }
                                });

                                // Map over student.RECORDS to create pages
                                return student.RECORDS.map((record: Record, idx: number) => (
                                    <Page size="A4" style={styles.gradeSheet} key={idx}>
                                        <Grade_Sheet details={student} index={idx} />
                                    </Page>
                                ));
                            })()}
                        </Document>
                    </PDFViewer>
                )};
            </div>
        </>
    );
}
