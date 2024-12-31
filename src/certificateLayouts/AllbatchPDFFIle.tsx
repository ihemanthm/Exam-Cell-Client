import React from "react";
import { Page, StyleSheet } from "@react-pdf/renderer";
import PucLayout1 from "./PUC_Layout_1";
import EnggLayout1 from "./Engg_Layout_1";
import PucLayout2 from "./PUC_Layout_2";
import PucLayout3 from "../certificateLayouts/PUC_Layout_3";
import EnggLayout2 from "../certificateLayouts/Engg_Layout_2";

export default function AllbatchPDFFIle({ details, type, layout }: any) {
  const styles = StyleSheet.create({
    PUC_Layout_1_page: {
      marginTop: 77,
      paddingBottom: 30,
      paddingLeft: 50,
      paddingRight: 50,
      backgroundColor: "transparent",
    },
    PUC_Layout_3_page: {
      marginTop: 77,
      paddingBottom: 30,
      paddingLeft: 35,
      paddingRight: 40,
      backgroundColor: "transparent",
    },
    engg_page: {
      marginTop: 80,
      textAlign: "justify",
      marginLeft: 10,
      marginRight: 25,
      backgroundColor: "transparent",
    },
    PUC_Layout_2_page: {
      marginTop: 70,
      paddingBottom: 60,
      paddingLeft: 38,
      paddingRight: 35,
      backgroundColor: "transparent",
    },
    engg_page_2: {
      marginTop: 30,
      textAlign: "justify",
      marginLeft: 20,
      marginRight: 0,
      backgroundColor: "transparent",
    },
  });
  return (
    <>
      {details &&
        details.map((student: any) => {
          if (type === "puc" && layout === "L1") {
            return (
              <Page style={styles.PUC_Layout_1_page}>
                <PucLayout1 student={student} />
              </Page>
            );
          } else if (type === "puc" && layout === "L2") {
            return (
              <Page
                size="A4"
                orientation="landscape"
                style={styles.PUC_Layout_2_page}
              >
                <PucLayout2 student={student} />
              </Page>
            );
          } else if (type === "puc" && layout === "L3") {
            return (
              <Page size="A4" style={styles.PUC_Layout_3_page}>
                <PucLayout3 student={details} />
              </Page>
            );
          } else if (type === "engg" && layout === "L1") {
            return (
              <Page style={styles.engg_page}>
                <EnggLayout1 details={student} />
              </Page>
            );
          }
          else  {
            return (
              <Page style={styles.engg_page}>
                <EnggLayout2 details={student} />
              </Page>
            );
          }
        })}
    </>
  );
}
