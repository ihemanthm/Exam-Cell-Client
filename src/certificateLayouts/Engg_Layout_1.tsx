import {
  Text,
  Image,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import image from "./O170422.jpg";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import { useState, useEffect } from "react";
import { format } from "date-fns";

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

  const styles = StyleSheet.create({
    image: {
      height: 50,
      width: 50,
      position: "absolute",
      top: -40,
      right: 50,
    },
    details: {
      display: "flex",
      flexDirection: "row",
    },
    leftDetails: {
      lineHeight: 1.5,
    },
    rightDetails: {
      lineHeight: 1.5,
    },
    name: { fontSize: 8, fontWeight: "bold", marginLeft: 80 },
    DOB: { fontSize: 8, fontWeight: "bold", marginLeft: 95 },
    degree: { fontSize: 8, fontWeight: "bold", marginLeft: 85 },
    major: { fontSize: 8, fontWeight: "bold", marginLeft: 85 },
    ID: { fontSize: 8, fontWeight: "bold", marginLeft: 120 },
    admission: { fontSize: 8, fontWeight: "bold", marginLeft: 170 },
    completion: { fontSize: 8, fontWeight: "bold", marginLeft: 170 },
    grade: { fontSize: 8, fontWeight: "bold", marginLeft: 140 },
    table: {
      border: "0.8px solid black",
      borderTop: "none",
      borderBottom: "none",
      marginLeft:10,
      marginRight: 50,
      marginTop:20,
      rowGap:3,
    },
    tableRow: {
      display: "flex",
      flexDirection: "row",
    },
    subTable: {
      width: "50%",
      // marginBottom: 2,
    },
    semName: {
      backgroundColor:"#AAB396",
      fontSize: 8,
      fontWeight: "bold",
      height: 11,
      justifyContent: "center",
      width: "100%",
      textAlign: "center",
      borderTop: "0.8px solid black",
      borderBottom: "0.8px solid black",
      borderRight: "0.8px solid black",
    },
    header: {
      height: 11,
      display: "flex",
      flexDirection: "row",
      borderBottom: "0.8px solid black",
    },
    Hcode: {
      fontSize: 8,
      fontWeight: "bold",
      width: "15%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: "0.5px solid black",
    },
    Htitle: {
      fontSize: 8,
      fontWeight: "bold",
      width: "75%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: "0.5px solid black",
      paddingBottom: 1,
    },
    HCr: {
      fontSize: 8,
      fontWeight: "bold",
      width: "5%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: "0.5px solid black",
    },
    HGr: {
      fontSize: 8,
      fontWeight: "bold",
      width: "5%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: "0.8px solid black",
    },
    row: {
      height: 10,
      display: "flex",
      flexDirection: "row",
    },
    code: {
      fontSize: 7,
      fontWeight: "bold",
      width: "15%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: "0.5px solid black",
    },
    title: {
      fontSize: 7,
      fontWeight: "bold",
      width: "75%",
      textAlign: "left",
      justifyContent: "center",
      borderRight: "0.5px solid black",
      paddingLeft: 4,
    },
    Cr: {
      fontSize: 7,
      fontWeight: "bold",
      width: "5%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: "0.5px solid black",
    },
    Gr: {
      fontSize: 7,
      fontWeight: "bold",
      width: "5%",
      textAlign: "center",
      justifyContent: "center",
      borderRight: "0.8px solid black",
    },
    gpa: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: 10,
      borderTop: "0.8px solid black",
      borderBottom: "0.8px solid black",
    },
    sgpa: {
      fontSize: 7,
      width: "50%",
      justifyContent: "center",
      textAlign: "center",
      borderRight: "0.8px solid black",
      fontWeight: "bold",
    },
    qrCode: {
      width: 30,
      height: 30,
      // position: "absolute",
      // bottom: -50,
      // left: 150,
    },
    barCode: {
      width: 80,
      height: 25,
      // position: "absolute",
      // bottom: -50,
      // left: 350,
    },
    footer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop:25,
    },
    majorCGPA: {
      fontSize: 10,
      fontWeight: "bold",
    },
    highlight: {
      fontSize: 10,
      color: "red",
    },
  });
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

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

    return `${day}-${monthName}-${year}`;
  }

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
  const formattedEXAMMY = recentEXAMMY ? format(recentEXAMMY, "MMM-yyyy") : "N/A"; 

  useEffect(() => {
    const generateQR = async () => {
      const qrText = `${details.ID} \n${details.SNAME} \n ${details.GRP} `;
      const qrBase64 = await generateQRCodeBase64(qrText);
      setQrCodeBase64(qrBase64);
      let date=new Date(recentEXAMMY);
      const qrMonth= (date.getMonth() + 1).toString().padStart(2, '0');
      const qrYear=date.getFullYear();
      const barcodeText = `${qrMonth}${details.ID.slice(1)}${qrYear}`;
      const barcodeImage = generateBarcodeBase64(barcodeText);
      setBarcodeBase64(barcodeImage);
    };
    generateQR();
  }, [details]);

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
            <Text style={styles.admission}>December-2020</Text>
            <Text style={styles.completion}>{formattedEXAMMY}</Text>
            <Text style={styles.grade}>First Class with Distinction</Text>
          </View>
        </View>
        <View style={styles.table}>
          {details.ENGG_RECORDS.map((record: any, index: number) => {
            const nextRecord = details.ENGG_RECORDS[index + 1];
            if (index % 2 == 0 && details.ENGG_RECORDS[index + 1]) {
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
                        {year == 1
                          ? "I"
                          : year == 2
                          ? "II"
                          : year == 3
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
                      {Array(maxLength)
                        .fill(0)
                        .map((sub: any, index: number) => {
                          const subject = record.SUBJECTS[index];
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
                          <Text>SGPA : {record.SGPA}</Text>
                        </View>
                        <View style={styles.sgpa}>
                          <Text>CGPA : {record.CGPA}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.subTable}>
                    <View
                      style={[styles.semName, { borderRightWidth: "none" }]}
                    >
                      <Text>
                        {year == 1
                          ? "I"
                          : year == 2
                          ? "II"
                          : year == 3
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
                      {Array(maxLength)
                        .fill(0)
                        .map((sub: any, index: number) => {
                          const subject = nextRecord.SUBJECTS[index];
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
                                <View
                                  style={[
                                    styles.Gr,
                                    { borderRightWidth: "none" },
                                  ]}
                                >
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
                          <Text>SGPA : {nextRecord.SGPA}</Text>
                        </View>
                        <View
                          style={[styles.sgpa, { borderRightWidth: "none" }]}
                        >
                          <Text>CGPA : {nextRecord.CGPA}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              );
            } else {
              return null;
            }
          })}
        </View>
        <View style={styles.footer}>
          <View>
            {qrCodeBase64 && <Image style={styles.qrCode} src={qrCodeBase64} />}
          </View>
          <View style={styles.majorCGPA}>
            <Text>
              Major CGPA : <Text style={styles.highlight}>{details.ENGG_RECORDS && details.ENGG_RECORDS.length>0?  details.ENGG_RECORDS[details.ENGG_RECORDS.length - 1].CGPA:""}</Text>
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
