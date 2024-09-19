import React from "react";
import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
// import BatchLayout from "./BatchLayout";
import PUC_Layout_1 from "./PUC_Layout_1";
import Engg_Layout_1 from "./Engg_Layout_1";

export default function AllbatchPDFFIle({ details, type }: any) {
  const styles = StyleSheet.create({
    page: {
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
  });
  return (
    <>
      {details &&
        details.map((student: any) => {
          if (type === "puc") {
            return (
              <Page style={styles.page}>
                <PUC_Layout_1 student={student} />
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
