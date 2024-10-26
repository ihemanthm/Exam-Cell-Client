import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { setSnackBar } from "../store/features/snackbar/snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/FileSelection.css";
import { useDispatch } from "react-redux";

export default function RankListByBatch() {
    const [studentData, setStudentData] = useState<null | {}>(null);
    const [loader, setLoader] = useState<boolean>(false);
    const dispatch = useDispatch();
    const getStudent = process.env.REACT_APP_GET_ENGG_DETAILS_BY_ID;

    interface FormValues {
        ID: string;
    }

    const initialValues: FormValues = {
        ID: "",
    };

    const formik = useFormik<FormValues>({
        initialValues,
        onSubmit: async (values) => {
            const pattern = /^R\d{6}$/;
            if (!pattern.test(values.ID)) {
                dispatch(setSnackBar({ message: "Invalid ID", variant: "error", }));
                return;
            }
            await handleSubmit(values.ID);
        }
    });

    
const handleSubmit = async (id: string) => {
    setLoader(true);
    try {
        const response = await axios.get(`${getStudent}${id}`);
        const fetchedStudentData = response.data;

        if (!fetchedStudentData) {
            dispatch(setSnackBar({ message: "No Student found", variant: "warning" }));
        } else {
            setStudentData(fetchedStudentData);
        }
    } catch (error) {
        dispatch(setSnackBar({ message: "Error fetching student", variant: "warning" }));
    } finally {
        setLoader(false);
    }
};

// Component to render student data
const StudentComponent = ({ data }: { data: any }) => {
    // You can manage loading and student data state here
    return (
        <div>
            <h1>Student ID : {data.ID}</h1>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
};

    return (
        <>
            <div className="home-pdf-container">
                <h1>Get Student Details</h1>
                <form
                    onSubmit={formik.handleSubmit}
                    className="search-form"
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <div className="input-box" style={{ marginBottom: "30px" }}>
                        <input
                            type="text"
                            placeholder="Enter student ID (RXXXXXX)"
                            name="ID"
                            className="input-field"
                            id="ID"
                            onChange={formik.handleChange}
                            value={formik.values.ID}
                            required
                        />
                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            {loader ? (
                                <CircularProgress size={27} sx={{ color: "white" }} />
                            ) : (
                                "Search"
                            )}
                        </button>
                    </div>
                    {formik.errors.ID && (
                        <div style={{ color: "red" }}>{formik.errors.ID}</div>
                    )}
                </form>
                {studentData && <StudentComponent data={studentData} />}
            </div>
        </>
    );
}
