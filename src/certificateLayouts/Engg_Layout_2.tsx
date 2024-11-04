//Engg layout
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
  Image,
  Text,
  View,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";

interface Subject {
  PCODE: string;
  PNAME: string;
  CR: number;
  GR: string;
  EXAMMY:Date,
}

interface Record {
  SUBJECTS: Subject[];
  SGPA: number;
  CGPA: number;
  TOTAL_CREDITS:[],
  OBTAINED_CREDITS:[]
}
interface RemeidalSubjects{
  SUBJECTS:Subject[],
}
interface RemedialRecord{
  REMEDIAL_DATES:RemeidalSubjects[],
}

interface Details {
  SNAME: string;
  GRP: string;
  ID: string;
  DOJ:Date,
  ENGG_RECORDS: Record[];
  REMEDIAL_RECORDS:RemedialRecord[],
  TOTAL_CREDITS: [],
  OBTAINED_CREDITS:[]
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

export default function Transcript_Layout({ details }: any) {
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

  //callculate SGPA and CGPA
  const sgpa = Array(8).fill(0);
  const cgpa = Array(8).fill(0);
  let prevObtained = 0;
  let prevTotal = 0;

  
  for (let i = 0; i < 8; i++) {
    if (details.TOTAL_CREDITS[i] > 0) {
      prevObtained += details.OBTAINED_CREDITS[i];
      prevTotal += details.TOTAL_CREDITS[i];
      sgpa[i] = parseFloat((details.OBTAINED_CREDITS[i] / details.TOTAL_CREDITS[i]).toFixed(2));
      cgpa[i] = parseFloat((prevObtained / prevTotal).toFixed(2));
    } else {
      sgpa[i] = 0; // Handle division by zero
      cgpa[i] = prevTotal > 0 ? parseFloat((prevObtained / prevTotal).toFixed(2)) : 0;
    }
  }

  const [barcodeBase64, setBarcodeBase64] = useState("");

  const recentEXAMMY = () => {
    let latest: Date = new Date(0); 
    
    for (const sem of details.ENGG_RECORDS) {
      sem.SUBJECTS.forEach((subject: any) => {
        const subjectDate = new Date(subject.EXAMMY);
        if (!isNaN(subjectDate.getTime()) && subjectDate > latest) {
          latest = subjectDate;
        }
      });
    }
    
    
    for (const remedials of details.REMEDIAL_RECORDS) {
      for (const subjects of remedials.REMEDIAL_DATES) {
        for(const subject of subjects.SUBJECTS)
        {
          const subjectDate = new Date(subject.EXAMMY);
          if (!isNaN(subjectDate.getTime()) && subjectDate > latest) {
            latest = subjectDate;
          }
        }
      }
    }
    return latest;
  };
  
  useEffect(() => {
    const generateBarcode = async () => {
      if (recentEXAMMY) {
        const date = new Date(recentEXAMMY());
        const qrMonth = (date.getMonth() + 1).toString().padStart(2, "0");
        const qrYear = date.getFullYear();
        const barcodeText = `${qrMonth}${details.ID.slice(1)}${qrYear}`;
        const barcodeImage = await generateBarcodeBase64(barcodeText);
        setBarcodeBase64(barcodeImage);
      }
    };
    generateBarcode();
  }, [details]);


  for (let i = 0; i < 8; i++) {
    if (details.TOTAL_CREDITS[i] > 0) {
      console.log(details.TOTAL_CREDITS[i])
      prevObtained += details.OBTAINED_CREDITS[i];
      prevTotal += details.TOTAL_CREDITS[i];
      sgpa[i] = parseFloat((details.OBTAINED_CREDITS[i] / details.TOTAL_CREDITS[i]).toFixed(2));
      cgpa[i] = parseFloat((prevObtained / prevTotal).toFixed(2));
    } else {
      sgpa[i] = 0; // Handle division by zero
      cgpa[i] = prevTotal > 0 ? parseFloat((prevObtained / prevTotal).toFixed(2)) : 0;
    }
  }

  
  const subjectHandle = (sub: Subject) => {
    const grade = sub.GR.toLowerCase();

    if (grade === "r" || grade === "ab" || grade === "mp") {
      for (const remedials of details.REMEDIAL_RECORDS) {
        for (const remedialSubjects of remedials.REMEDIAL_DATES) {
          for(const remedialSubject of remedialSubjects.SUBJECTS)
          {
            const remGrade=remedialSubject.GR.toLowerCase();

            if(remedialSubject.PCODE===sub.PCODE && (remGrade!=="r"&& remGrade!=="ab"&&remGrade!=="mp")) 
              {
                return remedialSubject;
              }
          }
        }
      }
    } 
    return sub;
  };
  
  const styles = StyleSheet.create({
    headDetails: {
      display: "flex",
      flexDirection: "column",
      marginTop: 50,
      fontFamily: "RobotoBold",
    },
    Details:{
      display: "flex",
      flexDirection: "row", 
      justifyContent:"space-around",
      marginTop: 10,
      fontFamily: "RobotoBold",
    },
    leftDetails: {
      marginLeft: 35,
    },
    rightDetails: {
      marginRight: 45,
    },
    item: {
      fontSize: 10,
      display: "flex",
      flexDirection: "row",
      height: 15,
    },
    headerTitle: {
      fontSize: 12,
      position: "relative",
      textAlign: "center", // Add this line to center the text
     
    },
    reg: {
      marginLeft: 0,
    },
    name: { marginLeft: 8 },
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
      width: "34%",
      margin: 1,
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
      borderRight: 1,
      height: 12,
    },
    Htitle: {
      fontSize: 8,
      height: 12,
      fontFamily: "RobotoBold",
      width: "77%",
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
      textAlign: "left",
      borderRight: 1,
      paddingLeft:1.5
    },
    title: {
      width: "77%",
      textAlign: "left",
      justifyContent: "center",
      borderRight: 1,
      paddingLeft: 1.5,
      paddingRight:2
      
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
      marginTop: 50,
      fontFamily: "RobotoBold",
      fontSize: 10,
    },
    majorCGPA: {
      fontSize: 10,
      fontFamily: "RobotoBold",
      marginLeft: 80,
      marginTop: 10,
    },
    highlight: {
      fontSize: 10,
    },
    barCode: {
      width: 150,
      height: 30,
      marginLeft:30
    },
    verified:{
      marginLeft:60
    },
    footHead:{
      marginLeft:250
    },
    director:{
      marginLeft:200,
      fontSize: 11,
    }
    
  });


  return (
    <View>
      <View style={styles.headDetails}>
        <View style={styles.Details}>
          <View style={styles.leftDetails}>
            <View style={styles.item}>
              <Text>Name  : </Text>
              <Text style={styles.name}>{details.SNAME}</Text>
            </View>
            <View style={styles.item}>
              <Text>Major  :</Text>
              <Text style={styles.major}>{details.GRP}</Text>
            </View>
          </View>
          <View style={styles.rightDetails}>
            <View style={styles.item}>
              <Text style={styles.reg}>Reg No                    : </Text>
              <Text style={styles.ID}>{details.ID}</Text>
            </View>
            <View style={styles.item}>
              <Text>Year of Admission : </Text>
              <Text style={styles.admission}>{new Date(details.DOJ).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.headerTitle}>B.Tech Transcript</Text>
        </View>
      </View>
      <View style={styles.table}>
        {details.ENGG_RECORDS.map((_:any, index: number) => {
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
                      style={[
                        styles.subTable,
                        year === 4 && (sem==="I" || sem === "II") 
                          ? { width: '37%' } // Increase width for 7th and 8th semester
                          : { width: '33%' } // Default width
                      ]}
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
                              let subject = currentRecord.SUBJECTS[index];
                              if (subject) {
                                subject=subjectHandle(subject);
                                const formattedGrade = subject.GR === "EX" 
                                  ? subject.GR.charAt(0).toUpperCase() + subject.GR.slice(1).toLowerCase()
                                  : subject.GR;
                                  

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
                                      <Text>{formattedGrade}</Text>
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
                                SGPA : {sgpa[currentRecord.SEM-1].toFixed(2)}
                              </Text>
                            </View>
                            <View style={styles.cgpa}>
                              <Text>
                                CGPA : {cgpa[currentRecord.SEM-1].toFixed(2)}
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
                            {cgpa[7]}
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
        <Text style={styles.verified}>Verified by:</Text>
        <Text style={styles.footHead}>Controller of Examination</Text>
        <Text style={styles.director}>Director</Text>
      </View>
    </View>
  );
}