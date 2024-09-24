import React from "react";
import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import PUC_Layout_1 from "./PUC_Layout_1";
import Engg_Layout_1 from "./Engg_Layout_1";
import PUC_Layout_2 from './PUC_Layout_2';

export default function AllbatchPDFFIle({ details, type,layout }: any) {
  const styles = StyleSheet.create({
    PUC_Layout_1_page: {
      marginTop: 60,
      paddingBottom: 30,
      paddingLeft: 50,
      paddingRight: 50,
      backgroundColor: "transparent",
    },
    engg_page: {
      marginTop: 80,
      textAlign: "justify",
      marginLeft: 20,
      marginRight: 40,
      backgroundColor: "transparent",
    },
    PUC_Layout_2_page: {
      marginTop: 130,
      paddingBottom: 30,
      paddingLeft: 50,
      paddingRight: 50,
      backgroundColor: "transparent",
    },
  });
  return (
    <>
      {details &&
        details.map((student: any) => {
          if (type === "puc"&& layout==='L1') {
            return (
              <Page style={styles.PUC_Layout_1_page}>
                <PUC_Layout_1 student={student} />
              </Page>
            );
          }
          else if (type === "puc"&& layout==='L2') {
            return (
              <Page  size='A4' orientation="landscape" style={styles.PUC_Layout_2_page}>
                <PUC_Layout_2 student={student} />
              </Page>
            );
          }
          else{
               return (
              <Page style={styles.engg_page}>
                <Engg_Layout_1 details={student} />
              </Page>
            );
          }
        })}
    </>
  );
}
