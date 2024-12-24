import { Font, Text, Image, View, StyleSheet } from "@react-pdf/renderer";
import image from "./O170384.jpg";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import RobotoRegular from "../fonts/RobotoCondensed-Regular.ttf";
import RobotoBold from "../fonts/RobotoCondensed-Bold.ttf";

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

export default function Engg_Layout_1({ details }: any) {
  const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [barcodeBase64, setBarcodeBase64] = useState("");

  Font.register({
    family: "RobotoRegular",
    src: RobotoRegular,
  });
  Font.register({
    family: "RobotoBold",
    src: RobotoBold,
  });

  const styles = StyleSheet.create({
    image: {
      height: 60,
      width: 60,
      position: "absolute",
      top: -40,
      right: 45,
    },
    details: {
      display: "flex",
      flexDirection: "row",
      // position:"absolute",
      paddingBottom: 48,
    },
    leftDetails: {
      lineHeight: 1.5,
      width:"100%",
      marginBottom:60,
    },
    rightDetails: {
      lineHeight: 1.5,
      width:"100%",
      marginBottom:60,

    },

    name: {
      fontSize: 9,
      fontWeight: "bold",
      position: "absolute",
      top: -5,
      left: 62,
      margin:0,
      fontFamily: "RobotoBold",
    },
    DOB: {
      margin:0,
      fontSize: 9,
      fontWeight: "bold",
      position: "absolute",
      top:8,
      paddingLeft:1,
      left: 82,
      fontFamily: "RobotoBold",
    },
    degree: {
      margin:0,
      fontSize: 9,
      fontWeight: "bold",
      position: "absolute",
      top: 20,
      left: 64,
      paddingLeft:0,
      fontFamily: "RobotoBold",
    },
    major: {
      margin:0,
      fontSize: 9,
      fontWeight: "bold",
      position: "absolute",
      top: 33,
      left: 60,
      fontFamily: "RobotoBold",
    },
    ID: {
      margin:0,
      fontSize: 9,
      fontWeight: "bold",
      position: "absolute",
      top: -5,
      left: 38,
      fontFamily: "RobotoBold",
    },
    admission: {
      fontSize: 9,
      fontWeight: "bold",
      position: "absolute",
      top: 8,
      paddingLeft:0,
      left: 123,
      fontFamily: "RobotoBold",
    },
    completion: {
      margin:0,
      fontSize: 9,
      fontWeight: "bold",
      position: "absolute",
      top: 20,
      paddingLeft:4,
      left: 125,
      fontFamily: "RobotoBold",
    },
    grade: {
      margin:0,
      fontSize: 9,
      fontWeight: "bold",
      position: "absolute",
      top: 32,
      paddingLeft:1,
      left: 66,
      fontFamily: "RobotoBold",
    },
    table: {
      border: "0.8px solid black",
      borderTop: "none",
      borderBottom: "none",
      marginLeft: 5,
      marginRight: 35,
      marginTop: -30,
      rowGap: 7,
    },
    tableRow: {
      display: "flex",
      flexDirection: "row",
    },
    subTable: {
      width: "50%",
    },
    semName: {
      backgroundColor: "#AAB396",
      fontSize: 8,
      height: 11,
      justifyContent: "center",
      width: "100%",
      textAlign: "center",
      borderTop: "0.8px solid black",
      borderBottom: "0.8px solid black",
      borderRight: "0.8px solid black",
      fontFamily: "RobotoBold",
    },
    header: {
      height: 12,
      display: "flex",
      flexDirection: "row",
      borderBottom: "0.8px solid black",
      fontFamily: "RobotoBold",
    },
    Hcode: {
      fontSize: 9,
      fontWeight: "bold",
      width: "15%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: "0.5px solid black",
    },
    Htitle: {
      fontSize: 9,
      fontWeight: "bold",
      width: "75%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: "0.5px solid black",
      paddingBottom: 0.6,
    },
    HCr: {
      fontSize: 9,
      fontWeight: "bold",
      width: "5%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: "0.5px solid black",
    },
    HGr: {
      fontSize: 9,
      fontWeight: "bold",
      width: "5%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: "0.8px solid black",
    },
    row: {
      height: 11,
      display: "flex",
      flexDirection: "row",
    },
    code: {
      fontSize: 8,
      fontWeight: "bold",
      width: "15%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: "0.5px solid black",
      fontFamily: "RobotoRegular",
    },
    title: {
      fontSize: 8,
      fontWeight: "bold",
      width: "75%",
      textAlign: "left",
      justifyContent: "center",
      borderRight: "0.5px solid black",
      paddingLeft: 3 ,
      fontFamily: "RobotoRegular",
    },
    Cr: {
      fontSize: 8,
      fontWeight: "bold",
      width: "5%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: "0.5px solid black",
      fontFamily: "RobotoRegular",
    },
    Gr: {
      fontSize: 8,
      fontWeight: "bold",
      width: "5%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: "0.8px solid black",
      fontFamily: "RobotoRegular",
    },
    gpa: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: 11,
      borderTop: "0.8px solid black",
      borderBottom: "0.8px solid black",
      fontFamily: "RobotoRegular",
    },
    sgpa: {
      fontSize: 8,
      width: "50%",
      justifyContent: "center",
      textAlign: "center",
      borderRight: "0.8px solid black",
      fontWeight: "bold",
      fontFamily: "RobotoBold",
    },
    qrCode: {
      width: 45,
      height: 45,
      paddingBottom: 10,
      // position: "absolute",
      // bottom: -50,
      // left: 150,
    },
    barCode: {
      width: 100,
      height: 35,
      paddingBottom: 10,
    },
    footer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 25,
    },
    majorCGPA: {
      fontSize: 10,
      fontWeight: "bold",
      fontFamily: "RobotoBold",
    },
    highlight: {
      fontSize: 10,
      color: "red",
    },
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = monthNames[date.getMonth()];
    return `${day}-${monthName}-${date.getFullYear()}`;
  };

  const recentEXAMMY = () => {
    let latest: Date = new Date(0);

    // Iterate over ENGG_RECORDS
    for (const sem of details.ENGG_RECORDS) {
        const subjectDate = new Date(sem.EXAMMY);
        if (!isNaN(subjectDate.getTime()) && subjectDate > latest) {
          latest = subjectDate;
        }
    }

    for (const remedials of details.REMEDIAL_RECORDS) {
      for (const subjects of remedials.REMEDIAL_DATES) {
        const subjectDate = new Date(subjects.EXAMMY);
        if (!isNaN(subjectDate.getTime()) && subjectDate > latest) {
          latest = subjectDate;
        }
      }
    }

    return latest;
  };

  const recentExamDate = recentEXAMMY(); // Call the function to get the most recent date
  const formattedEXAMMY = recentExamDate ? format(recentExamDate, "MMM-yyyy") : "N/A"; 

  //callculate SGPA and CGPA
  const sgpa = Array(8).fill(0);
  const cgpa = Array(8).fill(0);
  let prevObtained = 0;
  let prevTotal = 0;

  for (let i = 0; i < 8; i++) {
    if (details.TOTAL_CREDITS[i] > 0) {
      prevObtained += details.OBTAINED_CREDITS[i];
      prevTotal += details.TOTAL_CREDITS[i];
      sgpa[i] = parseFloat(
        (details.OBTAINED_CREDITS[i] / details.TOTAL_CREDITS[i]).toFixed(2)
      );
      cgpa[i] = parseFloat((prevObtained / prevTotal).toFixed(2));
    } else {
      sgpa[i] = 0; // Handle division by zero
      cgpa[i] =
        prevTotal > 0 ? parseFloat((prevObtained / prevTotal).toFixed(2)) : 0;
    }
  }

  const subjectHandle = (sub: any) => {
    const grade = sub.GR.toLowerCase();

    if (grade === "r" || grade === "ab" || grade === "mp") {
      for (const remedials of details.REMEDIAL_RECORDS) {
        for (const subjects of remedials.REMEDIAL_DATES) {
          for (const subject of subjects.SUBJECTS) {
            const remGrade = subject.GR.toLowerCase();
            if (
              subject.PCODE === sub.PCODE &&
              remGrade !== "r" &&
              remGrade !== "ab" &&
              remGrade !== "mp"
            ) {
              return subject;
            }
          }
        }
      }
    } else {
      return sub;
    }
    return sub;
  };

  useEffect(() => {
    const generateQR = async () => {
      const qrText = `${details.ID} \n${details.SNAME} \n${details.GRP}`;
      const qrBase64 = await generateQRCodeBase64(qrText);
      setQrCodeBase64(qrBase64);
      let date = new Date(recentEXAMMY());
      const qrMonth = (date.getMonth() + 1).toString().padStart(2, "0");
      const qrYear = date.getFullYear();
      const barcodeText = `${qrMonth}${details.ID.slice(1)}${qrYear}`;
      const barcodeImage = generateBarcodeBase64(barcodeText);
      setBarcodeBase64(barcodeImage);
    };

    generateQR();
  }, [details, recentEXAMMY]);

  return (
    <>
      <Image style={styles.image} src={image} />
      <View>
        <View style={styles.details}>
          <View style={styles.leftDetails}>
            <Text style={styles.name}>{details.SNAME}</Text>
            <Text style={styles.DOB}>{formatDate(details.DOB)}</Text>
            <Text style={styles.degree}>Bachelor of Technology</Text>
            <Text style={styles.major}>{details.GRP}</Text>
          </View>
          <View style={styles.rightDetails}>
            <Text style={styles.ID}>{details.ID}</Text>
            <Text style={styles.admission}>
              {new Date(details.DOJ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </Text>
            <Text style={styles.completion}>{formattedEXAMMY}</Text>
            <Text style={styles.grade}>
              {" "}
              {details.TOTAL_REMS === 0 && parseFloat(cgpa[7].toFixed(2)) >= 7.5
                ? "First Class with Distinction"
                : (details.TOTAL_REMS > 0 &&
                    parseFloat(cgpa[7].toFixed(2)) >= 7.5) ||
                  parseFloat(cgpa[7].toFixed(2)) >= 6.5
                ? "First Division"
                : parseFloat(cgpa[7].toFixed(2)) >= 5.5
                ? "Second Division"
                : "Pass Division"}
            </Text>
          </View>
        </View>
        <View style={styles.table}>
          {details.ENGG_RECORDS.map((record: any, index: number) => {
            const nextRecord = details.ENGG_RECORDS[index + 1];
            if (index % 2 === 0 && details.ENGG_RECORDS[index + 1]) {
              const maxLength =
                record.SUBJECTS.length > nextRecord.SUBJECTS.length
                  ? record.SUBJECTS.length
                  : nextRecord.SUBJECTS.length;
              const year = index / 2 + 1;
              return (
                <View style={styles.tableRow} key={`semPair-${index}`}>
                  <View style={styles.subTable}>
                    <View style={styles.semName}>
                      <Text>
                        {year === 1
                          ? "I"
                          : year === 2
                          ? "II"
                          : year === 3
                          ? "III"
                          : "IV"}{" "}
                        YEAR I SEMESTER
                      </Text>
                    </View>
                    <View>
                      <View style={styles.header}>
                        <View style={styles.Hcode}>
                          <Text>Code</Text>
                        </View>
                        <View style={styles.Htitle}>
                          <Text>Subject Title</Text>
                        </View>
                        <View style={styles.HCr}>
                          <Text>Cr.</Text>
                        </View>
                        <View style={styles.HGr}>
                          <Text>Gr.</Text>
                        </View>
                      </View>
                      {Array(maxLength + 1)
                        .fill(0)
                        .map((sub: any, index: number) => {
                          let subject = record.SUBJECTS[index];
                          if (subject) {
                            subject = subjectHandle(subject);
                            return (
                              <View style={styles.row}>
                                <View style={styles.code}>
                                  <Text>{subject.PCODE}</Text>
                                </View>
                                <View style={styles.title}>
                                  <Text>{subject.PNAME}</Text>
                                </View>
                                <View style={styles.Cr}>
                                  <Text>{subject.CR.toFixed(1)}</Text>
                                </View>
                                <View style={styles.Gr}>
                                  <Text>
                                    {" "}
                                    {subject.GR === "EX"
                                      ? subject.GR.charAt(0).toUpperCase() +
                                        subject.GR.slice(1).toLowerCase()
                                      : subject.GR}
                                  </Text>
                                </View>
                              </View>
                            );
                          } else {
                            return (
                              <View style={styles.row}>
                                <View style={styles.code}>
                                  <Text></Text>
                                </View>
                                <View style={styles.title}>
                                  <Text></Text>
                                </View>
                                <View style={styles.Cr}>
                                  <Text></Text>
                                </View>
                                <View style={styles.Gr}>
                                  <Text></Text>
                                </View>
                              </View>
                            );
                          }
                        })}
                      <View style={styles.gpa}>
                        <View style={styles.sgpa}>
                          <Text>SGPA : {sgpa[index].toFixed(2)}</Text>
                        </View>
                        <View style={styles.sgpa}>
                          <Text>CGPA :{cgpa[index].toFixed(2)}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.subTable}>
                    <View
                      style={[styles.semName, { borderRightWidth: "none" }]}
                    >
                      <Text>
                        {year === 1
                          ? "I"
                          : year === 2
                          ? "II"
                          : year === 3
                          ? "III"
                          : "IV"}{" "}
                        YEAR II SEMESTER
                      </Text>
                    </View>
                    <View>
                      <View style={styles.header}>
                        <View style={styles.Hcode}>
                          <Text>Code</Text>
                        </View>
                        <View style={styles.Htitle}>
                          <Text>Subject Title</Text>
                        </View>
                        <View style={styles.HCr}>
                          <Text>Cr.</Text>
                        </View>
                        <View
                          style={[styles.HGr, { borderRightWidth: "none" }]}
                        >
                          <Text>Gr.</Text>
                        </View>
                      </View>
                      {Array(maxLength + 1)
                        .fill(0)
                        .map((sub: any, index: number) => {
                          let subject = nextRecord.SUBJECTS[index];
                          if (subject) {
                            subject = subjectHandle(subject);
                            return (
                              <View style={styles.row}>
                                <View style={styles.code}>
                                  <Text>{subject.PCODE}</Text>
                                </View>
                                <View style={styles.title}>
                                  <Text>{subject.PNAME}</Text>
                                </View>
                                <View style={styles.Cr}>
                                  <Text>{subject.CR.toFixed(1)}</Text>
                                </View>
                                <View
                                  style={[
                                    styles.Gr,
                                    { borderRightWidth: "none" },
                                  ]}
                                >
                                  <Text>
                                    {" "}
                                    {subject.GR === "EX"
                                      ? subject.GR.charAt(0).toUpperCase() +
                                        subject.GR.slice(1).toLowerCase()
                                      : subject.GR}
                                  </Text>
                                </View>
                              </View>
                            );
                          } else {
                            return (
                              <View style={styles.row}>
                                <View style={styles.code}>
                                  <Text></Text>
                                </View>
                                <View style={styles.title}>
                                  <Text></Text>
                                </View>
                                <View style={styles.Cr}>
                                  <Text></Text>
                                </View>
                                <View
                                  style={[
                                    styles.Gr,
                                    { borderRightWidth: "none" },
                                  ]}
                                >
                                  <Text></Text>
                                </View>
                              </View>
                            );
                          }
                        })}
                      <View style={styles.gpa}>
                        <View style={styles.sgpa}>
                          <Text>SGPA : {sgpa[index + 1].toFixed(2)}</Text>
                        </View>
                        <View
                          style={[styles.sgpa, { borderRightWidth: "none" }]}
                        >
                          <Text>CGPA : {cgpa[index + 1].toFixed(2)}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }
            return null;
          })}
        </View>
        <View style={styles.footer}>
          <View>
            {qrCodeBase64 && <Image style={styles.qrCode} src={qrCodeBase64} />}
          </View>
          <View style={styles.majorCGPA}>
            <Text>
              Major CGPA :{" "}
              <Text style={styles.highlight}>{cgpa[7].toFixed(2)}</Text>
            </Text>
          </View>
          <View>
            {barcodeBase64 && (
              <Image style={styles.barCode} src={barcodeBase64} />
            )}
          </View>
        </View>
      </View>
    </>
  );
}
