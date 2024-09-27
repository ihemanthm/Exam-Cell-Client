import React, { useState, useEffect } from "react";
import MerriweatherRegular from "../fonts/Merriweather-Regular.ttf";
import MerriweatherLight from "../fonts/Merriweather-Light.ttf";
import MerriweatherBold from "../fonts/Merriweather-Bold.ttf";
import MerriweatherBlack from "../fonts/Merriweather-Black.ttf";
import { format } from "date-fns";
import QRCode from "qrcode";

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
const generateQRCodeBase64 = async (text: string): Promise<string> => {
  try {
    const dataUrl = await QRCode.toDataURL(text, { width: 200 });
    return dataUrl;
  } catch (err) {
    console.error(err);
    return "";
  }
};
export default function PDFFile({ student }: any) {
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
    image: {
      // marginTop:5,
      marginRight: 40,
      height: 35,
      width: 35,
      alignSelf: "flex-end",
    },
    textCard: {
      marginBottom: 5,
    },
    section1: {
      letterSpacing: 0.7,
      fontSize: 7,
      fontFamily: "MerriweatherLight",
    },
    highlight: {
      fontSize: 7,
      fontFamily: "MerriweatherBold",
      lineHeight: 1.5,
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
      height: 12,
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
      height: 12,
      color: "black",
      fontFamily: "MerriweatherBold",
    },
    gradeCard: {
      height: 110,
    },
    tableRow: {
      textAlign: "center",
      fontSize: 7,
      flexDirection: "row",
      alignItems: "center",
      height: 10,
      padding: 0,
      margin: 0,
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
      fontWeight: "thin",
      fontFamily: "Times-Bold",
      margin: 0,
      borderRight: 0.5,
      width: 80,
      height: "100%",
    },
    subName: {
      borderRight: 0.5,
      width: 270,
      justifyContent: "center",
      height: "100%",
      textAlign: "left",
      paddingLeft: 5,
      fontWeight: "bold",
      fontFamily: "Times-Bold",
    },
    credit_grade: {
      borderRight: 0.5,
      width: 35,
      justifyContent: "center",
      height: "100%",
      fontWeight: "bold",
      fontFamily: "Times-Bold",
    },
    obtained: {
      width: 70,
      justifyContent: "center",
      height: "100%",
      fontWeight: "bold",
      fontFamily: "Times-Bold",
    },
    gpa: {
      borderTop: 0.5,
    },
    sgpa: {
      justifyContent: "center",
      width: 80,
      fontWeight: "bold",
      fontFamily: "Times-Bold",
      height: "100%",
    },
    cgpa: {
      width: 340,
      textAlign: "right",
      paddingRight: 30,
      borderRight: 0.5,
      height: "100%",
      fontWeight: "bold",
      fontFamily: "Times-Bold",
      justifyContent: "center",
    },
    totalCreditRow: {
      fontWeight: "bold",
      fontSize: 8,
      flexDirection: "row",
      alignItems: "center",
      height: 13,
      borderTop: 0.5,
    },
    totalCredit: {
      width: 420,
      textAlign: "right",
      borderRight: 0.5,
      justifyContent: "center",
      height: "100%",
      fontWeight: "bold",
      fontFamily: "Times-Bold",
      paddingRight: 3,
    },
    totalCreditsGained: {
      width: 70,
      fontWeight: "bold",
      fontFamily: "Times-Bold",
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
    qrCode: {
      width: 30,
      height: 30,
      position: "absolute",
      bottom: -50,
      left: 150,
    },
  });
  let cumulativeTGRP = 0; // cumulative total grade points for CGPA
  let cumulativeCR = 0;
  let CGPA = 0;
  let sCount = 0;
  const recentCCMY = student.PUC_RECORDS.reduce(
    (latest: Date | null, sem: any) => {
      sem.SUBJECTS.forEach((subject: any) => {
        const subjectDate = new Date(subject.CCMY);
        if (!latest || subjectDate > latest) {
          latest = subjectDate;
        }
      });
      return latest;
    },
    null
  );
  const formattedCCMY = recentCCMY ? format(recentCCMY, "MMM, yyyy") : "N/A"; // e.g., "Nov, 2018"

  const [qrCodeBase64, setQrCodeBase64] = useState("");
  useEffect(() => {
    const generateQR = async () => {
      const qrText = `${student.ID} \n${student.SNAME} \n ${student.GRP} \n${parseFloat((cumulativeTGRP / cumulativeCR).toFixed(2)) >= 7.5
                  ? "First Class with Distinction"
                  : parseFloat((cumulativeTGRP / cumulativeCR).toFixed(2)) >=
                    6.5
                  ? "First Division"
                  : parseFloat((cumulativeTGRP / cumulativeCR).toFixed(2)) >=
                    5.5
                  ? "Second Division"
                  : "Pass Division"}`;
      const qrBase64 = await generateQRCodeBase64(qrText);
      setQrCodeBase64(qrBase64);
    };
    generateQR();
  }, [student, cumulativeTGRP, cumulativeCR]);

  return (
    <>
      {/* <Document> */}
        {/* <Page size="A4" style={styles.page}> */}
          <Image style={styles.image} src={image} />
          <Text style={styles.textCard}>
            <Text style={styles.section1}>This is to certify that </Text>
            <Text style={styles.highlight}> {student.SNAME} </Text>
            <Text style={styles.section1}> Son/Daughter of </Text>
            <Text style={styles.highlight}> {student.FNAME} </Text>
            <Text style={styles.section1}>
              successfully completed the 4 Semester course of study of 2-year
              duration fulfilling the pass requirement of the{" "}
            </Text>
            <Text style={styles.highlight}> Pre University Course (PUC) </Text>
            <Text style={styles.section1}>
              , as a part of the 6-year Integrated B.Tech programme, at the
              Examination held in{" "}
            </Text>
            <Text style={styles.highlight}> {formattedCCMY} </Text>
            <Text style={styles.section1}> with ID No: </Text>
            <Text style={styles.highlight}> {student.ID} </Text>
            <Text style={styles.section1}> in </Text>
            <Text style={styles.highlight}> English </Text>
            <Text style={styles.section1}> Medium and with </Text>
            <Text style={styles.highlight}> {student.GRP} </Text>
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
                cumulativeCR += semCR;
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
                                <View>
                                  <Text style={styles.subCode}>
                                    {subject.PCODE}
                                  </Text>
                                </View>
                                <View>
                                  <Text style={styles.subName}>
                                    {subject.PNAME.toUpperCase()}
                                  </Text>
                                </View>
                                <View>
                                  <Text style={styles.credit_grade}>
                                    {subject.CR}
                                  </Text>
                                </View>
                                <View>
                                  <Text style={styles.credit_grade}>
                                    {subject.GR}
                                  </Text>
                                </View>
                                <View>
                                  <Text style={styles.obtained}>
                                    {subject.TGRP}
                                  </Text>
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
                          <Text>
                            CGPA: {(cumulativeTGRP / cumulativeCR).toFixed(2)}
                          </Text>
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
                {parseFloat((cumulativeTGRP / cumulativeCR).toFixed(2)) >= 7.5
                  ? "First Class with Distinction"
                  : parseFloat((cumulativeTGRP / cumulativeCR).toFixed(2)) >=
                    6.5
                  ? "First Division"
                  : parseFloat((cumulativeTGRP / cumulativeCR).toFixed(2)) >=
                    5.5
                  ? "Second Division"
                  : "Pass Division"}
              </Text>{" "}
              and obtained the Cumulative Grade Point Average of :{" "}
              <Text style={styles.conclusionBold}>
                {(cumulativeTGRP / cumulativeCR).toFixed(2)}
              </Text>
            </Text>
            {qrCodeBase64 && <Image style={styles.qrCode} src={qrCodeBase64} />}
          </View>
        {/* </Page> */}
       {/* </Document> */}
    </>
  );
}
