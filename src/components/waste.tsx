



import React from "react";
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
export default function PDFFile({details}:any) {
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
    },
    HsubName: {
      borderRight: 0.5,
      width: 270,
      height: "100%",
      justifyContent: "center",
    },
    Hcredit_grade: {
      borderRight: 0.5,
      width: 35,
      height: "100%",
      justifyContent: "center",
    },
    Hobtained: {
      height: "100%",
      width: 70,
      justifyContent: "center",
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
      justifyContent: "center",
      height: "100%",
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
      paddingRight: 35,
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
    view:
    {
      flexDirection:"column",

    }
  });
  
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <Image style={styles.image} src={image} />
          <Text >
            <Text style={styles.section1}>This is to certify that </Text>
            <Text style={styles.highlight}>KOKOLLU MANISH</Text>
            <Text style={styles.section1}> Son/Daughter of </Text>
            <Text style={styles.highlight}>KOKOLLU SUDHAKAR</Text>
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
            <Text style={styles.highlight}>R220878</Text>
            <Text style={styles.section1}> in </Text>
            <Text style={styles.highlight}>English</Text>
            <Text style={styles.section1}> Medium and with </Text>
            <Text style={styles.highlight}>M.P.C</Text>
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
            <View style={styles.card}>
              <View style={styles.greyRow}>
                <Text>Semester 1</Text>
              </View>
              <View style={styles.gradeCard}>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}></View>
                  <View style={styles.subName}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.obtained}></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}></View>
                  <View style={styles.subName}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.obtained}></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}></View>
                  <View style={styles.subName}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.obtained}></View>
                </View>
              </View>
              <View style={styles.gpa}>
                <View style={styles.tableRow}>
                  <View style={styles.sgpa}>
                    <Text>SGPA: 7.33</Text>
                  </View>
                  <View style={styles.cgpa}>
                    <Text>CGPA: 7.33</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>200</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.greyRow}>
                <Text>Semester 1</Text>
              </View>
              <View style={styles.gradeCard}>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}></View>
                  <View style={styles.subName}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.obtained}></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}></View>
                  <View style={styles.subName}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.obtained}></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}></View>
                  <View style={styles.subName}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.obtained}></View>
                </View>
              </View>
              <View style={styles.gpa}>
                <View style={styles.tableRow}>
                  <View style={styles.sgpa}>
                    <Text>SGPA: 7.33</Text>
                  </View>
                  <View style={styles.cgpa}>
                    <Text>CGPA: 7.33</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>200</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.greyRow}>
                <Text>Semester 1</Text>
              </View>
              <View style={styles.gradeCard}>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}></View>
                  <View style={styles.subName}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.obtained}></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}></View>
                  <View style={styles.subName}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.obtained}></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}></View>
                  <View style={styles.subName}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.obtained}></View>
                </View>
              </View>
              <View style={styles.gpa}>
                <View style={styles.tableRow}>
                  <View style={styles.sgpa}>
                    <Text>SGPA: 7.33</Text>
                  </View>
                  <View style={styles.cgpa}>
                    <Text>CGPA: 7.33</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>200</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.greyRow}>
                <Text>Semester 1</Text>
              </View>
              <View style={styles.gradeCard}>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}>
                    <Text> Subject Code</Text>
                  </View>
                  <View style={styles.subName}>
                    <Text> Subject Name</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Credits</Text>
                  </View>
                  <View style={styles.credit_grade}>
                    <Text>Grade</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>Obtained Credits</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}></View>
                  <View style={styles.subName}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.obtained}></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}></View>
                  <View style={styles.subName}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.obtained}></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.subCode}></View>
                  <View style={styles.subName}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.credit_grade}></View>
                  <View style={styles.obtained}></View>
                </View>
              </View>
              <View style={styles.gpa}>
                <View style={styles.tableRow}>
                  <View style={styles.sgpa}>
                    <Text>SGPA: 7.33</Text>
                  </View>
                  <View style={styles.cgpa}>
                    <Text>CGPA: 7.33</Text>
                  </View>
                  <View style={styles.obtained}>
                    <Text>200</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.totalCreditRow}>
              <View style={styles.totalCredit}>
                <Text>Total Credits Points Obtained : </Text>
              </View>
              <View style={styles.totalCreditsGained}>
                <Text>665</Text>
              </View>
            </View>
          </View>
          <View style={styles.conclusionText}>
            <Text>
              Passed with First Division and obtained the Cumulative Grade Point
              Average of : 6.73
            </Text>
          </View>
        </Page>
      </Document>
    </>
  );
}



// import React from "react";
// import AllbatchPDFFIle from "../certificateLayouts/AllbatchPDFFIle";
// import Button from "@mui/material/Button";
// import { PDFViewer, Document } from "@react-pdf/renderer";
// import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
// import "../styles/FileSelection.css";
// import { useFormik } from "formik";
// import axios from "axios";
// import { useState } from "react";
// import { setSnackBar } from "../store/features/snackbar/snackbar";
// import { useDispatch } from "react-redux";
// import CircularProgress from "@mui/material/CircularProgress";
// import { set } from "mongoose";

// export default function AllBatchCertificate() {
//   const [details, setDetails] = useState<any | null>(null);
//   const [loader, setLoader] = useState<boolean>(false);
//   const [pdfLoading,setPdfLoading]=useState<boolean>(false);
//   const [rangeCert, setRangeCert] = useState({
//     start: 0,
//     end: 0,
//   });
//   const dispatch = useDispatch();

//   const getBatchDetails=process.env.REACT_APP_GET_PUC_BATCH; 

//   interface FormValues {
//     REGULATION: string;
//     range: number;
//   }
//   const initialValues: FormValues = {
//     REGULATION: "",
//     range: 1,
//   };
//   const validate = (values: FormValues) => {
//     const errors: Partial<FormValues> = {};
//     const pattern = /^R\d{2}$/;
//     if (!pattern.test(values.REGULATION)) {
//       errors.REGULATION = "Invalid ID";
//     } else {
//       errors.REGULATION = "";
//     }
//     return errors;
//   };

//   const formik = useFormik<FormValues>({
//     initialValues,
//     validate,
//     onSubmit: (values) => {},
//   });
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setDetails(null);
//     setLoader(true);
//     setRangeCert({
//       start: formik.values.range * 100 - 99,
//       end: formik.values.range * 100,
//     });
//     try {
//       let response = await axios.get(
//         getBatchDetails+formik.values.REGULATION
//       );

//       setDetails(response.data);
//       dispatch(
//         setSnackBar({
//           message: `Please wait, ${formik.values.REGULATION} PDF is loading.`,
//           variant: "info",
//         })
//       );
//       setLoader(false);
//       setPdfLoading(true);
//     } catch (error) {
//       const err = error as any;
//       setLoader(false);
//       if (err.status === 404) {
//         dispatch(
//           setSnackBar({
//             message: `${formik.values.REGULATION} batch has no records`,
//             variant: "warning",
//           })
//         );
//       } else {
//         dispatch(
//           setSnackBar({
//             message: "Faied to search student",
//             variant: "error",
//           })
//         );
//       }
//       setDetails(null);
//     }
//   };
//   return (
//     <>
//       <div className="home-pdf-container">
//         <form onSubmit={handleSubmit} className="search-form">
//           <div className="input-box">
//             <input
//               type="text"
//               placeholder="Enter the Batch (RXX)"
//               name="REGULATION"
//               className="input-field field"
//               id="REGULATION"
//               onChange={formik.handleChange}
//               value={formik.values.REGULATION}
//               required
//               pattern="R\d{2}"
//               disabled={details}
//             />
//             <select
//               name="range"
//               className="range"
//               required
//               onChange={formik.handleChange}
//               value={formik.values.range}
//               disabled={details}
//             >
//               <option value={1}>1-100</option>
//               <option value={2}>101-200</option>
//               <option value={3}>201-300</option>
//               <option value={4}>301-400</option>
//               <option value={5}>401-500</option>
//               <option value={6}>501-600</option>
//               <option value={7}>601-700</option>
//               <option value={8}>701-800</option>
//               <option value={9}>801-900</option>
//               <option value={10}>901-1000</option>
//               <option value={11}>1001-1100</option>
//             </select>
//             <button type="submit" className="submit-btn" disabled={details}>
//               {loader ? (
//                 <CircularProgress size={27} sx={{ color: "white" }} />
//               ) : (
//                 "Search"
//               )}
//             </button>
//             {details && (
//               <button
//                 type="reset"
//                 onClick={() => {
//                   setDetails(null);
//                   formik.resetForm();
//                 }}
//                 className="submit-btn"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>

//         {details && (
//           <>
//             <PDFViewer
//               style={{
//                 width: "80%",
//                 height: "100vh",
//               }}
//             >
//               <Document>
//                 <AllbatchPDFFIle
//                   details={details && details}
//                   start={rangeCert.start}
//                   end={rangeCert.end}
//                 />
//               </Document>
//             </PDFViewer>
//           </>
//         )}


        
//       </div>
//     </>
//   );
// }
