import React from "react";
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  Image,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import rgukt_logo from './rgukt.jpg'

export default function Temporary_Grade({ details }: any) {
  
  const styles = StyleSheet.create({
    pageHeader:{
      display: "flex",
      flexDirection: "row",
      justifyContent:"center",
      alignItems:"center",
      marginBottom:10,
      fontWeight:"bold",
    },
    watermark:{
      fontSize:60,
      position:"absolute",
      top:"55%",
      color:"rgba(0,0,0,0.1)",
      transform:'rotate(-45deg)',
    },
    clg:{
      fontSize:14,
      marginBottom:7,
    },
    state:{
      fontSize:12,
      marginBottom:7,
    },
    tempTitle:{
      fontSize:12,
      marginBottom:7,
    },
    image: {
      height: 80,
      width: 110,
      position: "absolute",
      borderRadius:500,
      top:-15,
      left:15,
    },
    headerText:{
      display: "flex",
      flexDirection: "column",
      justifyContent:"center",
      alignItems:"center",
      textAlign:"center",
    },
    item:{
      display:"flex",
      flexDirection:"row",
      marginBottom:5,
      marginLeft:15,
      fontWeight:"bold",
      fontSize:10
},
    details: {
      display: "flex",
      flexDirection: "row",
    },
    leftDetails: {
      lineHeight: 1,
    },
    rightDetails: {
      lineHeight: 1,
      marginLeft:80,
    },
   
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
    
    footer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop:60,
      marginLeft:20,
      marginRight:20,
    },
    highlight:{
      fontSize:12,
      fontWeight:"bold",
    },
    sign:{
      fontSize:12,
      fontWeight:"bold",
      marginBottom:5,
      marginRight:30,
    },
    location:{
      fontSize:10,
      marginLeft:20
    },
    boldText:{
      fontFamily: "Times-Bold",
    },
    textSmall:{
      fontSize:12,
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
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = today.getFullYear();
  const todayDate = `${day}-${month}-${year}`;
  
  return (
    <>
      
      <View>
        <Text style={styles.watermark}>Temporary Certificate</Text>
        <View style={styles.pageHeader}>
          <Image style={styles.image} src={rgukt_logo} />
          <View style={styles.headerText}>
            <Text style={styles.clg}>Rajiv Gandhi University of Knowledge Technologies</Text>
            <Text style={styles.state}>Andhra Pradesh</Text>
            <Text style={styles.tempTitle}>Temporary Statement of Grades</Text>
          </View>
        </View>
        <View style={styles.details}>
          <View style={styles.leftDetails}>
            <View style={styles.item}>
              <Text>Name :  </Text>
              <Text>{details.SNAME}</Text>
            </View>
            <View style={styles.item}>
              <Text>Degree :  </Text>
              <Text>Bachelor of Technology</Text>
            </View>
            <View style={styles.item}>
              <Text>Major :  </Text>
              <Text>{details.GRP}</Text>
            </View> 
          </View>
          <View style={styles.rightDetails}>
            <View style={styles.item}>
              <Text>Roll No :  </Text>
              <Text>{details.ID}</Text>
            </View> 
            <View style={styles.item}>
              <Text>Month & Year of Admission :  </Text>
              <Text>December-2020</Text>
            </View> 
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
        <View style={{marginLeft:10}}>
        <Text style={styles.textSmall}><Text style={styles.boldText}>Date : </Text>{todayDate}</Text>
      </View>
        <View style={styles.footer}>
          <Text style={styles.highlight}>Verified by</Text>
          <View>
            <Text style={styles.sign}>Controller of Examinations</Text>
            <Text style={styles.location}>R. K. Valley, A.P - 516 330</Text>
          </View>
        </View>
      </View>
    </>
  );
}
