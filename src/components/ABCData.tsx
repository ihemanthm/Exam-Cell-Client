import { useState } from 'react';
import { useFormik } from 'formik';
import "../styles/FileSelection.css";
import { useDispatch } from 'react-redux';
import { setSnackBar } from '../store/features/snackbar/snackbar';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
export default function ABCData() {
    const [loader, setLoader] = useState<boolean>(false);
    const dispatch = useDispatch();

    const getABCData = process.env.REACT_APP_GET_ABC_DATA;

    interface FormValues {
        batch: string,
    }

    const initialValues: FormValues = {
        batch: "",
    }

    const formik = useFormik<FormValues>({
        initialValues,
        onSubmit: async (values) => {
            await handleSubmit(values.batch);
        }
    });

    const handleSubmit = async (batch: string) => {
        setLoader(true);
        try {

            const response:any = await axios.get(`${getABCData}?batch=${batch}`, { responseType: 'blob' });
            dispatch(
                setSnackBar({
                    message: `${formik.values.batch} ABC Data File is generating ,Please wait ....`,
                    variant: "info",
                })
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${batch}_ABC_DATA.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            
        } catch (error) {
            dispatch(setSnackBar({ message: "Error Fetching Batch Data", variant: "warning" }));
        } finally {
            setLoader(false);
        }
    }
    return (
        <>
            <div className="home-pdf-container">
                <h1>ABC Students Data</h1>
                <form
                    onSubmit={formik.handleSubmit}
                    className="search-form"
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <div className="input-box" style={{ marginBottom: "30px" }}>
                        <input
                            type="text"
                            placeholder="Enter Batch No(RXX)"
                            name="batch"
                            className="input-field"
                            id="batch"
                            onChange={formik.handleChange}
                            required
                        />
                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            {loader ? (
                                <CircularProgress size={27} sx={{ color: "white" }} />
                            ) : (
                                "Generate"
                            )}
                        </button>
                    </div>
                    {formik.errors.batch && (
                        <div style={{ color: "red" }}>{formik.errors.batch}</div>
                    )}
                </form>
            </div>
        </>
    )
}

