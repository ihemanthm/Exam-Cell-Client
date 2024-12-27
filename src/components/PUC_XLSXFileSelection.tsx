import React from "react";
import "../styles/FileSelection.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@mui/material";
import { useMemo } from "react";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { setSnackBar } from "../store/features/snackbar/snackbar";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";

export default function XLSXFileSelection() {
  const [file, setFile] = useState<File | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useDispatch();

  const uploadFile:any=process.env.REACT_APP_UPLOAD_PUC_XLSX;
  
  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };
  const {
    getRootProps,
    getInputProps,
    open,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [], // For .xlsx files
    },
    onDrop: (acceptFiles) => {
      setFile(acceptFiles[0]);
    },
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
  });
  const style = useMemo(
    () => ({
      ...(isFocused ? { borderColor: "black" } : {}),
      ...(isDragAccept
        ? { borderColor: "green", backgroundColor: "rgb(242, 253, 242)" }
        : {}),
      ...(isDragReject
        ? { borderColor: "red", backgroundColor: "rgb(250, 228, 228)" }
        : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  const handleSubmit = async () => {
    if (file === null) {
      console.error("No file selected.");
      return;
    }
    const formData = new FormData();
    formData.append("puc", file);
    setDialogOpen(false);
    setLoader(true);
    try {
        await axios.post(
        uploadFile,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(
        setSnackBar({
          message: "File upload to database successfully",
          variant: "success",
        })
      );
      setLoader(false);
      setFile(null);
    } catch (error) {
      setLoader(false);
      dispatch(
        setSnackBar({
          message: "Faied to upload file",
          variant: "error",
        })
      );
      setFile(null);
    }
  };
  return (
    <div className="main-container">
      <h1>Upload PUC Excel Sheet</h1>
      <div {...getRootProps({ style })} className="file-select-box">
        <input {...getInputProps()} />
        <FileCopyOutlinedIcon
          sx={{
            fontSize: "3rem",
            color: "black",
            margin: "1rem",
            fill: file == null ? "black" : "green",
          }}
        />
        {file == null ? (
          <div className="input-text">
            <span>Drag file here to add them into database </span>
            <span>
              {" "}
              Or
              <Button
                sx={{
                  color: "blue",
                  margin: "0%",
                  textTransform: "lowercase",
                  "&:hover": {
                    textDecoration: "underline",
                    backgroundColor: "transparent",
                  },
                }}
                onClick={open}
              >
                choose your file
              </Button>
            </span>
          </div>
        ) : (
          <div className="input-text">
            <span>{file.name} is ready to upload</span>
            <Button
              sx={{
                color: "blue",
                margin: "0%",
                textTransform: "lowercase",
                "&:hover": {
                  textDecoration: "underline",
                  backgroundColor: "transparent",
                },
              }}
              onClick={() => {
                setFile(null);
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "black",
          cursor: file == null ? "not-allowed" : "pointer",
          color: "white",
          minWidth:"5rem",
          "&:disabled": {
            color: "black",
            cursor: "not-allowed",
          },
        }}
        endIcon={!loader ? <CloudUploadIcon /> : ""}
        disabled={file === null}
        onClick={handleClickOpen}
      >
        {loader ? (
          <CircularProgress size={27} sx={{ color: "white" }} />
        ) : (
          "Upload File"
        )}
      </Button>
      <div>
        <Dialog
          open={dialogOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"File Submission "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`You are about to submit the file ${
                file && file.name
              }. Do you want to proceed?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} autoFocus>
              Upload
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
