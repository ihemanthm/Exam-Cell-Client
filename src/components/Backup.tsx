import React from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";


import "../styles/FileSelection.css";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { setSnackBar } from "../store/features/snackbar/snackbar";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

export default function Backup() {
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useDispatch();

  const pucBackup = process.env.REACT_APP_UPDATE_PUC_BACKUP;
  const enggBackup = process.env.REACT_APP_UPDATE_ENGG_BACKUP;

  interface FormValues {
    type: string;
  }
  const initialValues: FormValues = {
    type: "puc",
  };

  const formik = useFormik<FormValues>({
    initialValues,
    onSubmit: (values) => { },
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    try {
      const fullUrl =
        formik.values.type == "puc" ? pucBackup : enggBackup;

      const response: Record<string, any>= await axios.get(fullUrl || '', {
        responseType: 'blob', // Important for downloading files
      });
      dispatch(
        setSnackBar({
          message: `${formik.values.type} Excel file is generating ,Please wait ....`,
          variant: "info",
        })
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const today=new Date();
      link.setAttribute('download', `${formik.values.type}_${today.getDate()+'-'+today.getMonth()+'-'+today.getUTCFullYear()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setLoader(false);
    } catch (error: any) {
      setLoader(false);
      dispatch(
        setSnackBar({
          message: "Faied to search student",
          variant: "error",
        })
      );
    }
  };
  return (
    <>
      <div className="home-pdf-container">
        <h1>Backup Data</h1>
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
                  />
                }
                label="Engineering"
                required={false}
              />
            </RadioGroup>
          </div>
          <div className="input-box">
            <button type="submit" className="submit-btn">
              {loader ? (
                <CircularProgress size={27} sx={{ color: "white" }} />
              ) : (
                "Backup"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
