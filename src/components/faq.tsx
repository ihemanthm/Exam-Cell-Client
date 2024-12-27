import { Box } from "@mui/material";
import React from "react";
import student from "../assets/studentDetails.png";
import tutionFee from "../assets/tutionFee.png";
import hostelFee from "../assets/hostelFee.png";
import scholrship from "../assets/sch.png";
// import mis from "../assets/mis.mp4";
// import CustomAccordion from "./CutsomAccordion";
const faqs = [
  {
    index: 1,
    file: student,
    question: "In which format student details should upload?",
  },
  {
    index: 2,
    file: tutionFee,
    question: "In which format Tution Fee Excel file should upload?",
  },
  {
    index: 3,
    file: hostelFee,
    question: "In which format Hostel Fee Excel file should upload?",
  },
  {
    index: 4,
    file: scholrship,
    question: "In which format Scholar ship details should upload?",
  },
//   {
//     index: 5,
//     file: mis,
//     question: "In which format MSI Excel file should upload",
//   },
];
export default function Faq() {
  return (
    ""
    // <Box width={"100%"}>
    //   {faqs.map((faq) => {
    //     // return <CustomAccordion faq={faq} />;
    //   })}
    // </Box>
  );
}