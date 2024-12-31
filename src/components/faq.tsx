import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import puc from '../assets/puc.png';
import engg from '../assets/engg.png';
import puc_sno from '../assets/engg_sno.png';
import engg_sno from '../assets/puc_sno.png';
const faqs = [
  {
    index: 1,
    file: puc,
    question: "In which format does the PUC excel file should be uploaded?",
  },
  {
    index: 2,
    file: engg,
    question: "In which format does the Engineering excel file should be uploaded?",
  },
  {
    index: 3,
    question: "How to upload the Remedial Records?",
    answer: "Upload the Regular attempt records at first. After then the Remedial attempt records can be uploaded at the same place where the regular records are uploaded. The format is same for both Regular records and records and also for both PUC and Engineering."
  },
  {
    index: 4,
    file: engg_sno,
    question: "What is the excel file format for uploading Serial Numbers for Engineering?",
  },
  {
    index: 5,
    file: puc_sno,
    question: "What is the excel file format for uploading Serial Numbers for PUC?",
  }
];

export default function Faq() {
  // State to track the index of the currently expanded accordion
  const [expanded, setExpanded] = useState(null);

  // Handle the expansion of an accordion
  const handleChange = (panel:any) => (event:any, isExpanded:any) => {
    setExpanded(isExpanded ? panel : false); // Toggle the expanded panel
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>

      {faqs.map((faq) => (
        <Accordion
          key={faq.index}
          expanded={expanded === faq.index} // Set expanded based on the state
          onChange={handleChange(faq.index)} // Change the expanded state
          sx={{ marginBottom: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id={`panel${faq.index}-header`}>
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          {faq.file && (
            <AccordionDetails>
                The uploaded file should be in the following format:
              <Box component="img" src={faq.file} alt="File format" sx={{ height: "auto", maxWidth: "100%" }} />
            </AccordionDetails>
          )}
          {faq.answer && (
            <AccordionDetails>
              <Typography variant="body1">{faq.answer}</Typography>
            </AccordionDetails>
          )}
        </Accordion>
      ))}
    </Box>
  );
}
