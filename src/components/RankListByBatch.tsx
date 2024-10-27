import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { setSnackBar } from "../store/features/snackbar/snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/FileSelection.css";
import { useDispatch } from "react-redux";

export default function RankListByBatch() {
    const [loader, setLoader] = useState<boolean>(false);
    const dispatch = useDispatch();
    const getRankList = process.env.REACT_APP_GET_RANKLIST_BATCH;

    interface FormValues {
        REGULATION: string;
    }

    const initialValues: FormValues = {
        REGULATION: "",
    };

    const formik = useFormik<FormValues>({
        initialValues,
        onSubmit: async (values) => {
            const pattern = /^R\d{2}$/;
            if (!pattern.test(values.REGULATION)) {
                dispatch(setSnackBar({ message: "Invalid Regulation", variant: "error", }));
                return;
            }
            await handleSubmit(values.REGULATION);
        }
    });

    const handleSubmit = async (REGULATION: string) => {
        setLoader(true);
        try {
            const fullUrl=`${getRankList}${REGULATION}`;
            console.log(fullUrl);
            const response: Record<string, any> = await axios.get(fullUrl, {
                responseType: 'blob', // Important for downloading files
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `RankList_${REGULATION}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            dispatch(setSnackBar({ message: "No Batch found", variant: "warning" }));
            console.log(error);
        } finally {
            setLoader(false);
        }
    };

    return (
        <>
            <div className="home-pdf-container">
                <h1>Batch wise Rank List</h1>
                <form
                    onSubmit={formik.handleSubmit}
                    className="search-form"
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <div className="input-box" style={{ marginBottom: "30px" }}>
                        <input
                            type="text"
                            placeholder="Enter the Batch (RXX)"
                            name="REGULATION"
                            className="input-field"
                            id="REGULATION"
                            onChange={formik.handleChange}
                            value={formik.values.REGULATION}
                            required
                        />
                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            {loader ? (
                                <CircularProgress size={27} sx={{ color: "white" }} />
                            ) : (
                                "Download"
                            )}
                        </button>
                    </div>
                    {formik.errors.REGULATION && (
                        <div style={{ color: "red" }}>{formik.errors.REGULATION}</div>
                    )}
                </form>
            </div>
        </>
    );
}
