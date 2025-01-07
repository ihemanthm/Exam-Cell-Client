import React, { useState, useEffect } from "react";
import axios from "axios";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SimpleTreeView } from '@mui/x-tree-view';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import puc from '../assets/puc.png';
import engg from '../assets/engg.png';
import engg_sno from '../assets/engg_sno.png';
import puc_sno from '../assets/puc_sno.png';
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
  const [regulationCount, setRegulationCounts]: any = useState(null);
  const regulationCountURI: string = process.env.REACT_APP_GET_REGULATION_COUNT || '';
  useEffect(() => {
    async function fetchRegulationCount() {
      try {
        const response = await axios.get(regulationCountURI);
        console.log(response.data);
        if (response.data) {
          setRegulationCounts(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchRegulationCount();
  }, []);
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Box sx={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Frequently Asked Questions
        </Typography>

        {faqs.map((faq) => (
          <Accordion
            key={faq.index}
            expanded={expanded === faq.index}
            onChange={handleChange(faq.index)}
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
      {regulationCount &&
        (<SimpleTreeView sx={{marginTop:"10%", marginLeft: "82%", top: 20, position:"absolute" }}>
          <h4>Data Available</h4>
          {regulationCount && (
            <>
              <TreeItem itemId="1" label="Engineering Regulations">
                {Object.entries(regulationCount.engg).map(([regulation, count], index) => (
                  <TreeItem key={index} itemId={`engg-${index}`} label={`${regulation}: ${count}`} />
                ))}
              </TreeItem>
              <TreeItem itemId="2" label="PUC Regulations">
                {Object.entries(regulationCount.puc).map(([regulation, count], index) => (
                  <TreeItem key={index} itemId={`puc-${index}`} label={`${regulation}: ${count}`} />
                ))}
              </TreeItem>
            </>
          )}
        </SimpleTreeView>
        )}
    </>
  );
}
