import React, { useState, useEffect } from "react";
import MerriweatherRegular from "../fonts/Merriweather-Regular.ttf";
import MerriweatherLight from "../fonts/Merriweather-Light.ttf";
import MerriweatherBold from "../fonts/Merriweather-Bold.ttf";
import MerriweatherBlack from "../fonts/Merriweather-Black.ttf";

import RobotoRegular from "../fonts/RobotoCondensed-Regular.ttf";
import RobotoBold from "../fonts/RobotoCondensed-Bold.ttf";
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

interface Subject {
  PCODE: string;
  PNAME: string;
  CR: number;
  GR: number;
}

interface Record {
  SUBJECTS: Subject[];
  SGPA: number;
  CGPA: number;
}

interface Details {
  SNAME: string;
  GRP: string;
  ID: string;
  ENGG_RECORDS: Record[];
}

interface TranscriptLayoutProps {
  details: Details;
}

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

export default function Transcript_Layout({ details }: TranscriptLayoutProps) {
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

  Font.register({
    family: "RobotoBold",
    src: RobotoBold,
  });
  Font.register({
    family: "RobotoRegular",
    src: RobotoRegular,
  });

  const [barcodeBase64, setBarcodeBase64] = useState("");

  const recentEXAMMY = details.ENGG_RECORDS.reduce(
    (latest: Date | null, sem: any) => {
      sem.SUBJECTS.forEach((subject: any) => {
        const subjectDate = new Date(subject.EXAMMY);
        if (!latest || subjectDate > latest) {
          latest = subjectDate;
        }
      });
      return latest;
    },
    null
  );
  useEffect(() => {
    const generateBarcode = async () => {
      if (recentEXAMMY) {
        const date = new Date(recentEXAMMY);
        const qrMonth = (date.getMonth() + 1).toString().padStart(2, "0");
        const qrYear = date.getFullYear();
        const barcodeText = `${qrMonth}${details.ID.slice(1)}${qrYear}`;
        const barcodeImage = await generateBarcodeBase64(barcodeText);
        setBarcodeBase64(barcodeImage);
      }
    };
    generateBarcode();
  }, [details]);

  const styles = StyleSheet.create({
    details: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 50,
      fontFamily: "RobotoBold",
    },
    leftDetails: {
      marginLeft: 50,
    },
    rightDetails: {
      marginRight: 100,
    },
    item: {
      fontSize: 10,
      display: "flex",
      flexDirection: "row",
      height: 15,
    },
    headerTitle: {
      fontSize: 10,
      marginTop: 30,
    },
    reg: {
      marginLeft: 30,
    },
    name: { marginLeft: 10 },
    major: { marginLeft: 10 },
    ID: { marginLeft: 10 },
    admission: { marginLeft: 10 },
    table: {
      borderTop: "none",
      borderBottom: "none",
      marginRight: 40,
      marginTop: 20,
    },
    tableRow: {
      display: "flex",
      flexDirection: "row",
    },
    subTable: {
      width: "33%",
      margin: 2,
      borderTop: 1,
      borderBottom: 1,
      borderRight: 1,
      borderLeft: 1,
    },
    semName: {
      fontSize: 8,
      fontFamily: "RobotoBold",
      height: 12,
      justifyContent: "center",
      width: "100%",
      textAlign: "center",
      borderBottom: 1,
    },
    header: {
      height: 11,
      display: "flex",
      flexDirection: "row",
      borderBottom: 1,
    },
    Hcode: {
      fontSize: 8,
      fontFamily: "RobotoBold",
      width: "15%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: 1,
      height: 12,
    },
    Htitle: {
      fontSize: 8,
      height: 12,
      fontFamily: "RobotoBold",
      width: "75%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: 1,
      paddingBottom: 1,
    },
    HCr: {
      fontSize: 8,
      height: 12,
      fontFamily: "RobotoBold",
      width: "5%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: 1,
    },
    HGr: {
      fontSize: 8,
      height: 12,
      fontFamily: "RobotoBold",
      width: "5%",
      textAlign: "center",
      justifyContent: "center",
    },
    row: {
      height: 10,
      display: "flex",
      flexDirection: "row",
      fontFamily: "RobotoRegular",
      fontSize: 8,
    },
    code: {
      width: "15%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: 1,
    },
    title: {
      width: "75%",
      textAlign: "left",
      justifyContent: "center",
      borderRight: 1,
      paddingLeft: 4,
    },
    Cr: {
      width: "5%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: 1,
    },
    Gr: {
      width: "5%",
      textAlign: "center",
      justifyContent: "center",
    },
    gpa: {
      fontSize: 8,
      fontFamily: "RobotoBold",
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: 12,
      borderTop: 1,
    },
    sgpa: {
      width: "50%",
      justifyContent: "center",
      textAlign: "center",
      marginRight: 60,
    },
    cgpa: {
      width: "50%",
      justifyContent: "center",
      textAlign: "center",
      marginLeft: 60,
    },
    footer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 50,
      fontFamily: "RobotoBold",
      fontSize: 10,
    },
    majorCGPA: {
      fontSize: 10,
      fontFamily: "RobotoBold",
      marginLeft: 100,
      marginTop: 10,
    },
    highlight: {
      fontSize: 10,
    },
    barCode: {
      width: 150,
      height: 30,
      marginLeft:40
    },
  });

  return (
    <View>
      <View style={styles.details}>
        <View style={styles.leftDetails}>
          <View style={styles.item}>
            <Text>Name : </Text>
            <Text style={styles.name}>{details.SNAME}</Text>
          </View>
          <View style={styles.item}>
            <Text>Major :</Text>
            <Text style={styles.major}>{details.GRP}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.headerTitle}>B.Tech Transcript</Text>
        </View>
        <View style={styles.rightDetails}>
          <View style={styles.item}>
            <Text style={styles.reg}>Reg No : </Text>
            <Text style={styles.ID}>{details.ID}</Text>
          </View>
          <View style={styles.item}>
            <Text>Year of Admission : </Text>
            <Text style={styles.admission}>December-2020</Text>
          </View>
        </View>
      </View>
      <View style={styles.table}>
        {details.ENGG_RECORDS.map((_, index: number) => {
          if (index % 3 === 0) {
            const record = details.ENGG_RECORDS[index];
            const secondRecord = details.ENGG_RECORDS[index + 1];
            const thirdRecord = details.ENGG_RECORDS[index + 2];
            const maxLength = Math.max(
              record.SUBJECTS.length,
              secondRecord.SUBJECTS.length,
              thirdRecord?.SUBJECTS.length || 0
            );
            return (
              <View style={styles.tableRow} key={`semGroup-${index}`}>
                {[0, 1, 2].map((rowIndex) => {
                  const currentRecord = details.ENGG_RECORDS[index + rowIndex];
                  if (currentRecord) {
                    const year = Math.floor((index + rowIndex) / 2) + 1; //year calculation
                    const sem = (rowIndex + index) % 2 === 0 ? "I" : "II"; //semester calculation
                    return (
                      <View
                        style={styles.subTable}
                        key={`sem-${index + rowIndex}`}
                      >
                        <View style={styles.semName}>
                          <Text>
                            {year == 1
                              ? "I"
                              : year == 2
                              ? "II"
                              : year == 3
                              ? "III"
                              : "IV"}{" "}
                            YEAR {sem} SEMESTER
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
                          {Array(maxLength)
                            .fill(0)
                            .map((sub: any, index: number) => {
                              const subject = currentRecord.SUBJECTS[index];
                              if (subject) {
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
                                      <Text>{subject.GR}</Text>
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
                              <Text>
                                SGPA : {currentRecord.SGPA.toFixed(2)}
                              </Text>
                            </View>
                            <View style={styles.cgpa}>
                              <Text>
                                CGPA : {currentRecord.CGPA.toFixed(2)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  }
                  return (
                    <View>
                      <View style={styles.majorCGPA}>
                        <Text>
                          CGPA :{" "}
                          <Text style={styles.highlight}>
                            {details.ENGG_RECORDS &&
                            details.ENGG_RECORDS.length > 0
                              ? details.ENGG_RECORDS[
                                  details.ENGG_RECORDS.length - 1
                                ].CGPA
                              : ""}
                          </Text>
                        </Text>
                      </View>
                      <View>
                        {barcodeBase64 && (
                          <Image style={styles.barCode} src={barcodeBase64} />
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          }
          return null;
        })}
      </View>
      <View style={styles.footer}>
        <Text>Verified by:</Text>
        <Text>Controller of Examination</Text>
        <Text>DIRECTOR</Text>
      </View>
    </View>
  );
}
