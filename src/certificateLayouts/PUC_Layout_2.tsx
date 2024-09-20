import React, { useState, useEffect } from "react";
import MerriweatherRegular from "../fonts/Merriweather-Regular.ttf";
import MerriweatherLight from "../fonts/Merriweather-Light.ttf";
import MerriweatherBold from "../fonts/Merriweather-Bold.ttf";
import MerriweatherBlack from "../fonts/Merriweather-Black.ttf";
import QRCode from "qrcode";
import { format } from "date-fns";
import JsBarcode from "jsbarcode";

import {
  Page,
  Image,
  Text,
  View,
  Font,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import image from "./O170422.jpg";
// import "../styles/ENGGpdfFile.css";


const generateQRCodeBase64 = async (text: string): Promise<string> => {
  try {
    const dataUrl = await QRCode.toDataURL(text, { width: 200 });
    return dataUrl;
  } catch (err) {
    console.error(err);
    return "";
  }
};

const generateBarcodeBase64 = (text: string): string => {
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, text, {
    format: "CODE128",
    width: 1,
    height: 50,
    displayValue: false,
  });
  return canvas.toDataURL("image/png");
};

export default function PUC_Layout_2({ student }: any) {
  const [ind, setInd] = useState<any>(0);

  const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [barcodeBase64, setBarcodeBase64] = useState("");
  useEffect(() => {
    const generateQR = async () => {
      const qrText = `${student.ID} \n${student.SNAME} \n ${student.GRP} `;
      const qrBase64 = await generateQRCodeBase64(qrText);
      setQrCodeBase64(qrBase64);
      const barcodeText = `${student.ID} `;
      const barcodeImage = generateBarcodeBase64(barcodeText);
      setBarcodeBase64(barcodeImage);
    };
    generateQR();
  }, [student]);

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
      marginTop: 130,
      paddingBottom: 30,
      paddingLeft: 50,
      paddingRight: 50,
      backgroundColor: "transparent",
    },
    image: {
      marginRight: 40,
      height: 60,
      width: 60,
      alignSelf: "flex-end",
    },
    textCard: {
      margin: 5,
    },
    section1: {
      fontSize: 8,
      fontFamily: "MerriweatherLight",
    },
    highlight: {
      fontSize: 8,
      fontFamily: "MerriweatherBold",
      lineHeight: 1.5,
    },
    table: {
      border: 1,
      flexDirection: "column",
    },
    headingRow: {
      flexDirection: "row",
      height: 50,
      fontWeight: "bold",
      textAlign: "center",
    },
    subName: {
      fontFamily: "MerriweatherBold",
      backgroundColor: "#ffe23e",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 8,
      height: 50,
      width: 125,
      borderBottomWidth: 1,
    },
    semesters: {
      flexDirection: "column",
      width: 130,
      height: 50,
    },
    sem: {
      fontSize: 7,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#a84702",
      width: 130,
      height: 10,
      color: "white",
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
    },
    semHead: {
      flexDirection: "row",
      height: 40,
      width: 130,
    },
    subCode: {
      fontFamily: "MerriweatherBold",
      width: 35,
      height: 40,
      fontSize: 7,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffe23e",
      borderBottomWidth: 1,
      borderLeftWidth: 1,
    },
    credits: {
      fontFamily: "MerriweatherBold",
      width: 30,
      height: 40,
      fontSize: 7,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffe23e",
      borderLeft: 1,
      borderBottomWidth: 1,
    },
    grade: {
      fontFamily: "MerriweatherBold",
      width: 35,
      height: 40,
      fontSize: 7,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffe23e",
      borderLeft: 1,
      borderBottomWidth: 1,
    },
    creditPoints: {
      fontFamily: "MerriweatherBold",
      width: 30,
      height: 40,
      fontSize: 7,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffe23e",
      borderLeft: 1,
      borderBottomWidth: 1,
    },
    maxCredits: {
      fontFamily: "MerriweatherBold",
      width: 50,
      fontSize: 7,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffe23e",
      borderBottomWidth: 1,
      borderLeftWidth: 1,
    },
    dataRow: {
      flexDirection: "row",
      height: 15,
    },
    subNameData: {
      fontFamily: "MerriweatherBold",
      justifyContent: "center",
      textAlign: "left",
      fontSize: 7,
      fontWeight: "extrabold",
      width: 125,
      paddingLeft: 5,
      height: 15,
    },
    subCodeData: {
      justifyContent: "center",
      alignItems: "center",
      fontSize: 7,
      borderLeft: 1,
      height: 15,
      width: 35,
    },
    creditsData: {
      justifyContent: "center",
      alignItems: "center",
      fontSize: 7,
      width: 30,
      borderLeft: 1,
      height: 15,
    },
    gradeData: {
      justifyContent: "center",
      alignItems: "center",
      fontSize: 7,
      width: 35,
      borderLeft: 1,
      height: 15,
    },
    creditPointsData: {
      justifyContent: "center",
      alignItems: "center",
      fontSize: 7,
      width: 30,
      borderLeft: 1,
      height: 15,
    },
    maxCreditsData: {
      justifyContent: "center",
      alignItems: "center",
      fontSize: 7,
      width: 50,
      borderLeft: 1,
      height: 15,
    },
    tcpRow: {
      fontFamily: "MerriweatherBold",
      flexDirection: "row",
      alignItems: "flex-start",
      fontSize: 7,
      height: 10,
    },
    tcpName: {
      width: 125,
      height: 10,
      fontWeight: "extrabold",
      borderTop: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    tcpEmpty: {
      borderLeft: 1,
      borderTop: 1,
      width: 100,
      height: 10,

    },
    tcpCrediPoints: {
      width: 30,
      alignItems: "center",
      justifyContent: "center",
      height: 10,
      fontWeight: "extrabold",
      borderLeft: 1,
      borderTop: 1,
    },
    tcpTotalMax: {
      width: 50,
      height: 10,
      fontSize: 7,
      alignItems: "center",
      justifyContent: "center",
      borderLeft: 1,
      borderTop: 1,
    },

    gpaRow: {
      fontFamily: "MerriweatherBold",
      flexDirection: "row",
      alignItems: "flex-start",
      fontSize: 7,
      height: 10,
    },
    gpaName: {
      width: 125,
      height: 10,
      fontSize: 7,
      fontWeight: "extrabold",
      borderTop: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    gpaData: {
      width: 130,
      alignItems: "center",
      justifyContent: "center",
      height: 10,
      fontWeight: "extrabold",
      borderLeft: 1,
      borderTop: 1,
    },
    gpaTotal: {
      width: 100,
      height: 10,
      fontSize: 7,
      fontWeight: "extrabold",
      alignItems: "center",
      justifyContent: "center",
      borderLeft: 1,
      borderTop: 1,
    },

    conclusionText: {
      fontSize: 8,
      marginTop: 2,
    },
    conclusionBold: {
      fontWeight: "bold",
      fontFamily: "MerriweatherBold",
    },
    footer: {
      display:"flex",
      flexDirection:"row",
      position: "absolute",
      alignItems:"center",
      justifyContent: "space-between",
      width: 100,
      height: 50,
      left:"35%",
      bottom:-50,
    },
    qrCode: {
      left: 50,
      width: 30,
      height: 30,
    },
    barCode: {
      left: 150,
      width: 80,
      height: 25,
    },
  });

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = today.getFullYear();
  const todayDate = `${day}-${month}-${year}`;

  let cumulativeTGRP = 0;
  let cumulativeCR = 0;
  let CGPA = 0;
  let sCount = 0;

  const recentCCMY = student.PUC_RECORDS.reduce((latest: Date | null, sem: any) => {
    sem.SUBJECTS.forEach((subject: any) => {
      const subjectDate = new Date(subject.CCMY);
      if (!latest || subjectDate > latest) {
        latest = subjectDate;
      }
    });
    return latest;
  }, null);
  const formattedCCMY = recentCCMY ? format(recentCCMY, "MMM, yyyy") : "N/A";
  var tcp: number[] = Array(4).fill(0);
  var tcpMax: number[] = Array(4).fill(0);
  var tcpTotalMax: number = 0;
  var tcpTotalCredits: number = 0;

  var sgpa: string[] = Array(4).fill(0);
  var cgpa: string[] = Array(4).fill(0);
  var creditsObtainedSoFar = 0;
  var maxCreditsSoFar = 0;
  return (
    <Document>
        <Image style={styles.image} src={image} />
        <Text style={styles.textCard}>
          <Text style={styles.section1}>This is to certify that </Text>
          <Text style={styles.highlight}> {student.SNAME} </Text>
          <Text style={styles.section1}> Son/Daughter of </Text>
          <Text style={styles.highlight}> {student.FNAME}</Text>
          <Text style={styles.section1}>
            {"\n"}successfully completed the 4 Semester course of study of 2-year
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

          <View style={styles.headingRow}>
            <View style={styles.subName}>
              <Text>Subject Name</Text>
            </View>

            {/*Semester 1*/}
            <View style={styles.semesters}>
              <View style={styles.sem}>
                <Text>Semester 1</Text>
              </View>
              <View style={styles.semHead}>
                <View style={styles.subCode}>
                  <Text>Subject {"\n"}Code</Text>
                </View>
                <View style={styles.credits}>
                  <Text>Credits</Text>
                </View>
                <View style={styles.grade}>
                  <Text>Grade{"\n"}Obtained</Text>
                </View>
                <View style={styles.creditPoints}>
                  <Text>Credit{"\n"}Points</Text>
                </View>
              </View>
            </View>

            {/*Semester 2*/}
            <View style={styles.semesters}>
              <View style={styles.sem}>
                <Text>Semester 1</Text>
              </View>
              <View style={styles.semHead}>
                <View style={styles.subCode}>
                  <Text>Subject {"\n"}Code</Text>
                </View>
                <View style={styles.credits}>
                  <Text>Credits</Text>
                </View>
                <View style={styles.grade}>
                  <Text>Grade{"\n"}Obtained</Text>
                </View>
                <View style={styles.creditPoints}>
                  <Text>Credit{"\n"}Points</Text>
                </View>
              </View>
            </View>

            {/*Semester 3*/}
            <View style={styles.semesters}>
              <View style={styles.sem}>
                <Text>Semester 1</Text>
              </View>
              <View style={styles.semHead}>
                <View style={styles.subCode}>
                  <Text>Subject {"\n"}Code</Text>
                </View>
                <View style={styles.credits}>
                  <Text>Credits</Text>
                </View>
                <View style={styles.grade}>
                  <Text>Grade{"\n"}Obtained</Text>
                </View>
                <View style={styles.creditPoints}>
                  <Text>Credit{"\n"}Points</Text>
                </View>
              </View>
            </View>

            {/*Semester 4*/}
            <View style={styles.semesters}>
              <View style={styles.sem}>
                <Text>Semester 1</Text>
              </View>
              <View style={styles.semHead}>
                <View style={styles.subCode}>
                  <Text>Subject {"\n"}Code</Text>
                </View>
                <View style={styles.credits}>
                  <Text>Credits</Text>
                </View>
                <View style={styles.grade}>
                  <Text>Grade{"\n"}Obtained</Text>
                </View>
                <View style={styles.creditPoints}>
                  <Text>Credit{"\n"}Points</Text>
                </View>
              </View>
            </View>

            <View style={styles.maxCredits} wrap={false}>
              <Text>Total Max. Credit Points</Text>
            </View>
            <View style={styles.maxCredits} wrap={false}>
              <Text>Total Credit Points Obtained</Text>
            </View>

          </View>
          {student.PUC_RECORDS &&
            student.PUC_RECORDS[0].SUBJECTS.map((sub: any, index: number) => {
              var totalMaxCredits = 0;
              var totalCreditPoints = 0;
              return (
                <>
                  <View style={styles.dataRow}>
                    <View style={styles.subNameData}>
                      <Text key={index}>{sub.PNAME}</Text>
                    </View>
                    {student.PUC_RECORDS.map((sem: any, i: number) => {
                      totalMaxCredits += sem.SUBJECTS[index].CR * 10;
                      totalCreditPoints += sem.SUBJECTS[index].TGRP;
                      tcp[i] += sem.SUBJECTS[index].TGRP;
                      tcpMax[i] += sem.SUBJECTS[index].CR * 10;
                      return (
                        <>
                          <View style={styles.subCodeData}>
                            <Text>{sem.SUBJECTS[index].PCODE}</Text>
                          </View>
                          <View style={styles.creditsData}>
                            <Text>{sem.SUBJECTS[index].CR}</Text>
                          </View>
                          <View style={styles.gradeData}>
                            <Text>{sem.SUBJECTS[index].GR}</Text>
                          </View>
                          <View style={styles.creditPointsData}>
                            <Text>{sem.SUBJECTS[index].TGRP}</Text>
                          </View>
                        </>
                      )
                    })
                    }
                    <View style={styles.maxCreditsData}>
                      <Text>{totalMaxCredits}</Text>
                    </View>
                    <View style={styles.maxCreditsData}>
                      <Text>{totalCreditPoints}</Text>
                    </View>
                  </View>
                  {tcpTotalMax += totalMaxCredits}
                  {tcpTotalCredits += totalCreditPoints}
                </>
              );
            })
          }
          <View style={styles.tcpRow}>
            <View style={styles.tcpName}>
              <Text>Total Credit Points</Text>
            </View>

            {Array(4).fill(0).map((_, i) => {
              creditsObtainedSoFar += tcp[i];
              maxCreditsSoFar += tcpMax[i];
              sgpa[i] = ((tcp[i] / tcpMax[i]) * 10).toFixed(2);
              cgpa[i] = ((creditsObtainedSoFar / maxCreditsSoFar) * 10).toFixed(2);
              return (
                <>
                  <View style={styles.tcpEmpty}>
                    <Text></Text>
                  </View>
                  <View style={styles.tcpCrediPoints}>
                    <Text>{tcp[i]}</Text>
                  </View>
                </>
              )
            })}
            <View style={styles.tcpTotalMax}>
              <Text>{tcpTotalMax}</Text>
            </View>
            <View style={styles.tcpTotalMax}>
              <Text>{tcpTotalCredits}</Text>
            </View>
          </View>
          <View style={styles.gpaRow}>
            <View style={styles.gpaName}>
              <Text>SGPA/CGPA</Text>
            </View>
            {Array(4).fill(0).map((_, i) => {
              return (
                <>
                  <View style={styles.gpaData}>
                    <Text>{sgpa[i]}/{cgpa[i]}</Text>
                  </View>
                </>
              )
            })}
            <View style={styles.gpaTotal}>
              <Text>{cgpa[3]}</Text>
            </View>
          </View>
        </View>
        <View style={styles.conclusionText}>
          <Text>
            Passed with{" "}
            <Text style={styles.conclusionBold}>
              {parseFloat((cumulativeTGRP / cumulativeCR).toFixed(2)) >= 7.5
                ? "First Class with Distinction"
                : parseFloat((cumulativeTGRP / cumulativeCR).toFixed(2)) >= 6.5
                  ? "First Division"
                  : parseFloat((cumulativeTGRP / cumulativeCR).toFixed(2)) >= 5.5
                    ? "Second Division"
                    : "Pass Division"}
            </Text>{" "}
            and obtained the Cumulative Grade Point Average of :{" "}
            <Text style={styles.conclusionBold}>
              {cgpa[3]}
            </Text>
          </Text>
          <Text>{"\n"}{"\n"}<Text style={styles.conclusionBold}>Date: </Text>{todayDate}</Text>
        </View>
        <View style={styles.footer}>
          <View>
            {qrCodeBase64 && <Image style={styles.qrCode} src={qrCodeBase64} />}
          </View>
          <View>
            {barcodeBase64 && (
              <Image style={styles.barCode} src={barcodeBase64} />
            )}
          </View>
        </View>
    </Document>
  );
}
