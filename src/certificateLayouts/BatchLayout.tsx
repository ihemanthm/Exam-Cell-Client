import React, { useState } from "react";
import MerriweatherRegular from "../fonts/Merriweather-Regular.ttf";
import MerriweatherLight from "../fonts/Merriweather-Light.ttf";
import MerriweatherBold from "../fonts/Merriweather-Bold.ttf";
import MerriweatherBlack from "../fonts/Merriweather-Black.ttf";

import {
  Page,
  Image,
  Text,
  View,
  Font,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import image from "./O170422.jpg";
import "../styles/PDFFile.css";

export default function BatchLayout({ student }: any) {
  const [ind, setInd] = useState<any>(0);
  Font.register({
    family: "Merriweather",
    src: MerriweatherRegular,
  });
  Font.register({
    family: "MerriweatherLight",
    src: MerriweatherLight,
  });
  Font.register({
    family: "MerriweatherBold",
    src: MerriweatherBold,
  });
  Font.register({
    family: "MerriweatherBlack",
    src: MerriweatherBlack,
  });
  const styles = StyleSheet.create({
    page: {
      paddingBottom: 30,
      paddingLeft: 50,
      paddingRight: 50,
      backgroundColor: "transparent",
    },
    image: {
      margin: 20,
      marginRight: 40,
      height: 50,
      width: 50,
      alignSelf: "flex-end",
    },
    section1: {
      fontSize: 8,
      fontFamily: "MerriweatherLight",
    },
    highlight: {
      fontSize: 8,
      fontFamily: "MerriweatherBold",
    },

    table: {
      border: 0.5,
    },
    headerRow: {
      backgroundColor: "#FFFF99",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 8,
      flexDirection: "row",
      alignItems: "center",
      height: 15,
    },
    HsubCode: {
      justifyContent: "center",
      borderRight: 0.5,
      width: 80,
      height: "100%",
      fontFamily: "MerriweatherBold",
      fontWeight: "bold",
    },
    HsubName: {
      borderRight: 0.5,
      width: 270,
      height: "100%",
      justifyContent: "center",
      fontFamily: "MerriweatherBold",
      fontWeight: "bold",
    },
    Hcredit_grade: {
      borderRight: 0.5,
      width: 35,
      height: "100%",
      justifyContent: "center",
      fontFamily: "MerriweatherBold",
      fontWeight: "bold",
    },
    Hobtained: {
      height: "100%",
      width: 70,
      justifyContent: "center",
      fontFamily: "MerriweatherBold",
      fontWeight: "bold",
    },
    card: {},
    greyRow: {
      backgroundColor: "#D3D3D3",
      borderTop: 0.2,
      borderBottom: 0.2,
      fontWeight: "ultrabold",
      justifyContent: "center",
      fontSize: 8,
      alignItems: "center",
      height: 15,
      color: "white",
      fontFamily: "MerriweatherBold",
    },
    gradeCard: {
      height: 110,
    },
    tableRow: {
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 8,
      flexDirection: "row",
      alignItems: "center",
      height: 15,
    },
    lastRow: {
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 8,
      flexDirection: "row",
      alignItems: "center",
      height: "100%",
    },
    subCode: {
      justifyContent: "center",
      borderRight: 0.5,
      width: 80,
      height: "100%",
    },
    subName: {
      borderRight: 0.5,
      width: 270,
      justifyContent: "flex-start",
      height: "100%",
      textAlign: "left",
      paddingLeft: 5,
    },
    credit_grade: {
      borderRight: 0.5,
      width: 35,
      justifyContent: "center",
      height: "100%",
    },
    obtained: {
      width: 70,
      justifyContent: "center",
      height: "100%",
    },
    gpa: {
      borderTop: 0.5,
    },
    sgpa: {
      justifyContent: "center",
      width: 80,
      height: "100%",
    },
    cgpa: {
      width: 340,
      textAlign: "right",
      paddingRight: 30,
      borderRight: 0.5,
      height: "100%",
      justifyContent: "center",
    },
    totalCreditRow: {
      fontWeight: "bold",
      fontSize: 8,
      flexDirection: "row",
      alignItems: "center",
      height: 15,
      borderTop: 0.5,
    },
    totalCredit: {
      width: 420,
      textAlign: "right",
      borderRight: 0.5,
      justifyContent: "center",
      height: "100%",
      paddingRight: 3,
    },
    totalCreditsGained: {
      width: 70,
      textAlign: "center",
      justifyContent: "center",
      height: "100%",
    },
    conclusionText: {
      fontSize: 8,
      marginTop: 2,
    },
    conclusionBold: {
      fontWeight: "bold",
      fontFamily: "MerriweatherBold",
    },
  });
  let cumulativeTGRP = 0; // cumulative total grade points for CGPA
  let CGPA = 0;
  let sCount = 0;
  return (
    <>
      <Image style={styles.image} src={image} />
      <Text>
        <Text style={styles.section1}>This is to certify that </Text>
        <Text style={styles.highlight}>{student.SNAME}</Text>
        <Text style={styles.section1}> Son/Daughter of </Text>
        <Text style={styles.highlight}>{student.FNAME}</Text>
        <Text style={styles.section1}>
          successfully completed the 4 Semester course of study of 2-year
          duration fulfilling the pass requirement of the{" "}
        </Text>
        <Text style={styles.highlight}>Pre University Course (PUC)</Text>
        <Text style={styles.section1}>
          , as a part of the 6-year Integrated B.Tech programme, at the
          Examination held in{" "}
        </Text>
        <Text style={styles.highlight}>Jul, 2024</Text>
        <Text style={styles.section1}> with ID No: </Text>
        <Text style={styles.highlight}>{student.ID}</Text>
        <Text style={styles.section1}> in </Text>
        <Text style={styles.highlight}>English</Text>
        <Text style={styles.section1}> Medium and with </Text>
        <Text style={styles.highlight}>{student.GRP}</Text>
        <Text style={styles.section1}>
          {" "}
          group. He / She secured the overall grades and Grade Point Average
          (GPA) as shown below.
        </Text>
      </Text>
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <View style={styles.HsubCode}>
            <Text> Subject Code</Text>
          </View>
          <View style={styles.HsubName}>
            <Text> Subject Name</Text>
          </View>
          <View style={styles.Hcredit_grade}>
            <Text>Credits</Text>
          </View>
          <View style={styles.Hcredit_grade}>
            <Text>Grade</Text>
          </View>
          <View style={styles.Hobtained}>
            <Text>Obtained Credits</Text>
          </View>
        </View>
        {student.PUC_RECORDS &&
          student.PUC_RECORDS.map((sem: any, index: number) => {
            let semTGRP = 0;
            let semCR = 0;

            sem.SUBJECTS.forEach((subject: any) => {
              semTGRP += subject.TGRP;
              semCR += subject.CR;
            });

            // Calculate SGPA
            const SGPA = semCR > 0 ? (semTGRP / semCR).toFixed(2) : "N/A";

            cumulativeTGRP += semTGRP;
            CGPA = CGPA + parseFloat(SGPA);
            sCount = parseFloat(sem.SEM_NO);
            return (
              <View style={styles.card}>
                <View style={styles.greyRow}>
                  <Text>Semester {sem.SEM_NO}</Text>
                </View>
                <View style={styles.gradeCard}>
                  {Array(11)
                    .fill(0)
                    .map((_, i) => {
                      const subject = sem.SUBJECTS?.[i];

                      if (subject) {
                        return (
                          <View style={styles.tableRow}>
                            <View style={styles.subCode}>
                              <Text>{subject.PCODE}</Text>
                            </View>
                            <View style={styles.subName}>
                              <Text>{subject.PNAME.toUpperCase()}</Text>
                            </View>
                            <View style={styles.credit_grade}>
                              <Text>{subject.CR}</Text>
                            </View>
                            <View style={styles.credit_grade}>
                              <Text>{subject.GR}</Text>
                            </View>
                            <View style={styles.obtained}>
                              <Text>{subject.TGRP}</Text>
                            </View>
                          </View>
                        );
                      } else {
                        return (
                          <View style={styles.tableRow}>
                            <View style={styles.subCode}></View>
                            <View style={styles.subName}></View>
                            <View style={styles.credit_grade}></View>
                            <View style={styles.credit_grade}></View>
                            <View style={styles.obtained}></View>
                          </View>
                        );
                      }
                    })}
                </View>
                <View style={styles.gpa}>
                  <View style={styles.tableRow}>
                    <View style={styles.sgpa}>
                      <Text>SGPA: {SGPA}</Text>
                    </View>
                    <View style={styles.cgpa}>
                      <Text>CGPA: {(CGPA / sCount).toFixed(2)}</Text>
                    </View>
                    <View style={styles.obtained}>
                      <Text>{semTGRP}</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        <View style={styles.totalCreditRow}>
          <View style={styles.totalCredit}>
            <Text>Total Credits Points Obtained : </Text>
          </View>
          <View style={styles.totalCreditsGained}>
            <Text>{cumulativeTGRP}</Text>
          </View>
        </View>
      </View>
      <View style={styles.conclusionText}>
        <Text>
          Passed with{" "}
          <Text style={styles.conclusionBold}>
            {parseFloat((CGPA / sCount).toFixed(2)) >= 7.5
              ? "First Class with Distinction"
              : parseFloat((CGPA / sCount).toFixed(2)) >= 6.5
              ? "First Division"
              : parseFloat((CGPA / sCount).toFixed(2)) >= 5.5
              ? "Second Division"
              : "Pass Division"}
          </Text>{" "}
          and obtained the Cumulative Grade Point Average of :{" "}
          <Text style={styles.conclusionBold}>
            {(CGPA / sCount).toFixed(2)}
          </Text>
        </Text>
      </View>
    </>
  );
}
