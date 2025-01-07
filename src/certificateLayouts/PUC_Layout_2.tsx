import { useState, useEffect } from "react";
import RobotoRegular from "../fonts/RobotoCondensed-Regular.ttf";
import RobotoBold from "../fonts/RobotoCondensed-Bold.ttf";
import QRCode from "qrcode";
import { format } from "date-fns";
import JsBarcode from "jsbarcode";
import {
  Image,
  Text,
  View,
  Font,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";


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
  const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [barcodeBase64, setBarcodeBase64] = useState("");
  
  Font.register({
    family: "RobotoBold",
    src: RobotoBold,
  });
  Font.register({
    family: "RobotoRegular",
    src: RobotoRegular,
  });

  const styles = StyleSheet.create({
    image: {
      marginRight: 50,
      marginLeft:675,
      position:"absolute",
      marginTop:13,
      height: 80,
      width: 70,
    },
    textCard: {
      marginTop:80,
      lineHeight:1.2,
      textAlign:"justify",
      marginBottom:2,
      fontSize:11,
      fontFamily:"RobotoRegular",
    },
    section1: {
      fontFamily:"RobotoRegular",
    },
    highlight: {
      fontFamily: "RobotoBold",
      lineHeight: 1.5,
    },
    table: {
      width: 772,
      display: "flex",
      flexDirection: "column",
      border: 2,
    },
    headingRow: {
      fontFamily:"RobotoBold",
      height: 60,
      width: 770,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      fontSize: 8,
      textAlign: "center",
    },
    subName: {
      width: 130,
      height: 60,
      backgroundColor: "#ffe23e",
      justifyContent: "center",
      borderRight: 1,
      borderBottom: 1,
    },
    semGroup: {
      display: "flex",
      flexDirection: "column",
      width: 140,
      height: 60,
      alignItems: "flex-start",
    },
    sem: {
      width: 140,
      height: 15,
      backgroundColor: "#a84702",
      color:"white",
      alignItems:"center",
      justifyContent:"center",
      borderRight: 1,
      borderBottom: 1,
    },
    semSubHeads: {
      width: 140,
      height: 45,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    subCode: {
      width: 35,
      height: 45,
      justifyContent: "center",
      backgroundColor: "#ffe23e",
      borderRight: 1,
      borderBottom: 1,
    },
    credits: {
      width: 30,
      height: 45,
      justifyContent: "center",
      backgroundColor: "#ffe23e",
      borderRight: 1,
      borderBottom: 1,
    },
    grades: {
      width: 40,
      height: 45,
      justifyContent: "center",
      backgroundColor: "#ffe23e",
      borderRight: 1,
      borderBottom: 1,
    },
    creditPoints: {
      width: 35,
      height: 45,
      justifyContent: "center",
      backgroundColor: "#ffe23e",
      borderRight: 1,
      borderBottom: 1,
    },
    totalMaxCredits:{
      width: 40,
      height: 60,
      justifyContent: "center",
      backgroundColor: "#ffe23e",
      borderBottom: 1,
      borderRight: 2,
    },
    maxCredits: {
      width: 40,
      height: 60,
      justifyContent: "center",
      backgroundColor: "#ffe23e",
      borderBottom: 1,
      borderRight: 1,
    },
    dataRow: {
      width: 770,
      height: 20,
      fontSize: 9,
      fontFamily:"RobotoRegular",
      display: "flex",
      flexDirection: "row",
    },
    subNameData: {
      fontFamily:"RobotoBold",
      width: 130,
      height: 20,
      textAlign:"left",
      justifyContent:"center",
      borderRight: 1,
      paddingLeft: 5,
    },
    subCodeData: {
      width: 35,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
      borderRight: 1,
    },
    creditsData: {
      width: 30,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
      borderRight: 1,
    },
    gradesData: {
      width: 40,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
      borderRight: 1,
    },
    maxCreditsData: {
      width: 40,
      height: 20,
      fontFamily:"RobotoBold",
      justifyContent: "center",
      alignItems: "center",
      borderRight: 1,
    },
    creditPointsData: {
      width: 35,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
      borderRight: 1,
    },
    tcpRow: {
      fontFamily:"RobotoBold",
      width: 770,
      height: 18,
      display: "flex",
      flexDirection: "row",
      fontSize: 8,
    },
    tcpName: {
      width: 130,
      height: 18,
      justifyContent: "center",
      alignItems: "center",
      borderTop: 1,
      borderRight: 1,
    },
    tcpEmpty: {
      width: 105,
      height: 18,
      justifyContent: "center",
      alignItems: "center",
      borderTop: 1,
      borderRight: 1,
    },
    tcpCrediPoints: {
      width: 35,
      height: 18,
      justifyContent: "center",
      alignItems: "center",
      borderTop: 1,
      borderRight: 1,
    },
    tcpTotalMax: {
      width: 40,
      height: 18,
      justifyContent: "center",
      alignItems: "center",
      borderTop: 1,
      borderRight: 1,
    },
    gpaData: {
      width: 140,
      height: 18,
      justifyContent: "center",
      alignItems: "center",
      borderTop: 1,
      borderRight: 1,
    },
    gpaTotal: {
      width: 80,
      height: 18,
      justifyContent: "center",
      alignItems: "center",
      borderTop: 1,
      borderRight: 1,
    },
    conclusionText: {
      fontFamily: "RobotoRegular",
      fontSize:10,
      marginTop: 2,
    },
    conclusionBold: {
      fontFamily: "RobotoBold",
    },
    footer: {
      display: "flex",
      flexDirection: "row",
      position: "absolute",
      alignItems: "center",
      justifyContent: "space-between",
      width: 125,
      height: 50,
      left: "32%",
      bottom: -25,
    },
    qrCode: {
      left: 50,
      width: 40,
      height: 40,
    },
    barCode: {
      left: 150,
      width: 150,
      height: 35,
    },
  });

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const todayDate = `${day}-${month}-${year}`;

  let cumulativeTGRP = 0;
  let cumulativeCR = 0;

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

  useEffect(() => {
    const generateQR = async () => {
      const qrText = `${student.ID} \n${student.SNAME} \n ${student.GRP} `;
      const qrBase64 = await generateQRCodeBase64(qrText);
      setQrCodeBase64(qrBase64);
      let date = new Date(recentCCMY);
      const qrMonth = (date.getMonth() + 1).toString().padStart(2, '0');
      const qrYear = date.getFullYear();
      const barcodeText = `${qrMonth}${student.ID.slice(1)}${qrYear}`;
      const barcodeImage = generateBarcodeBase64(barcodeText);
      setBarcodeBase64(barcodeImage);
    };
    generateQR();
  }, [recentCCMY,student]);


  return (
    <Document>
      <Image style={styles.image} src={`http://localhost:8000/uploads/images/${student.ID}.jpg`} />
      <Text style={styles.textCard}>
        <Text style={styles.section1}>This is to certify that </Text>
        <Text style={styles.highlight}> {student.SNAME} </Text>
        <Text style={styles.section1}> Son/Daughter of </Text>
        <Text style={styles.highlight}> {student.FNAME}</Text>
        <Text style={styles.section1}>
          {"\n"}successfully completed the 4 Semester course of study of 2 - year
          duration fulfilling the pass requirement of the{" "}
        </Text>
        <Text style={styles.highlight}> Pre University Course (PUC), </Text>
        <Text style={styles.section1}>
          as a part of the 6 - year Integrated B.Tech programme, at the
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
          (GPA) as shown below:
        </Text>
      </Text>
      <View style={styles.table}>
        <View style={styles.headingRow}>
          <View style={styles.subName}>
            <Text>Subject Name</Text>
          </View>
          {student.PUC_RECORDS.map((_:any, i:number) => {
            return (
              <View style={styles.semGroup}>
                <View style={styles.sem}>
                  <Text>Semester {i + 1}</Text>
                </View>
                <View style={styles.semSubHeads}>
                  <View style={styles.subCode}><Text>Subject{"\n"}Code</Text></View>
                  <View style={styles.credits}><Text>Credits</Text></View>
                  <View style={styles.grades}><Text>Grade{"\n"}Obtained</Text></View>
                  <View style={styles.creditPoints}><Text>Credit{"\n"}Points</Text></View>
                </View>
              </View>
            )
          })};
          <View style={styles.maxCredits}>
            <Text>Total{"\n"}Max.{"\n"}Credit{"\n"}Points</Text>
          </View>
          <View style={styles.totalMaxCredits}>
            <Text>Total{"\n"}Cerdit{"\n"}Points{"\n"}Obtained</Text>
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
                        <View style={styles.gradesData}>
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
        <View style={styles.tcpRow}>
          <View style={styles.tcpName}>
            <Text>SGPA/CGPA</Text>
          </View>
          {Array(4).fill(0).map((_, i) => {
            return (
              <>
                <View style={styles.gpaData}>
                  <Text>{`${sgpa[i]} / ${cgpa[i]}`}</Text>
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
            {parseFloat(cgpa[3]) >= 8.0
              ? "Distinction"
              : parseFloat(cgpa[3]) >= 7.0
                ? "First Class"
                : parseFloat(cgpa[3]) >= 6.0
                  ? "Second Class"
                    : parseFloat(cgpa[3]) >= 5.0
                    ? "Pass Class"
                      : "Fail"
            }
          </Text>{" "}
          and obtained the Cumulative Grade Point Average of :{" "}
          <Text style={styles.conclusionBold}>
            {cgpa[3]}
          </Text>
        </Text>
        <Text style={{fontFamily:"RobotoRegular",fontSize:10,marginTop:-10}}>{"\n"}{"\n"}<Text style={styles.conclusionBold}>Date: </Text>{todayDate}</Text>
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
