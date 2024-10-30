import React, { useState } from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../store/features/snackbar/snackbar";
import Puc_Results from "../certificateLayouts/Puc_Results"; // Import Puc_Results
import Engg_Results from "../certificateLayouts/Engg_Results"; // Import Engg_Results
import "../styles/FileSelection.css";

export default function ResultsPage() {
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

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    const pattern = /^R\d{6}$/;
    if (!pattern.test(values.ID)) {
      errors.ID = "Invalid ID";
    }
    return errors;
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validate,
    onSubmit: async (values) => {
      setLoader(true);
      setDetails(null);
      try {
        const url = values.type === "puc" ? getPUCDetailsById : getEnggDetailsById;
        const response = await axios.get(url + values.ID);
        setDetails(response.data);
        dispatch(
          setSnackBar({
            message: `${values.ID} details fetched successfully.`,
            variant: "info",
          })
        );
        setLoader(false);
      } catch (error: any) {
        setLoader(false);
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
              message: "Failed to search student",
              variant: "error",
            })
          );
        }
      }
    }
  });

  return (
    <>
      <div>
        <h1 style={{textAlign:"center"}}>Results</h1>
        <form
          onSubmit={formik.handleSubmit}
          className="search-form"
          style={{ display: "flex", flexDirection: "column", alignItems:"center" ,marginTop:30,marginLeft:250}}
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
              onChange={formik.handleChange}
              value={formik.values.ID}
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
                type="button"
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
          <div>
            {formik.values.type === "puc" ? (
              <Puc_Results details={details} />
            ) : (
              <Engg_Results details={details} />
            )}
          </div>
        )}
      </div>
    </>
  );
}
 