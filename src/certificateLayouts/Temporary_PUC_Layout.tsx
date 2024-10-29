import MerriweatherRegular from "../fonts/Merriweather-Regular.ttf";
import MerriweatherLight from "../fonts/Merriweather-Light.ttf";
import MerriweatherBold from "../fonts/Merriweather-Bold.ttf";
import MerriweatherBlack from "../fonts/Merriweather-Black.ttf";

import {
  Image,
  Text,
  View,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import rgukt_logo from "./rgukt.jpg";

export default function Temporary_PUC_Layout({ student }: any) {

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
    watermark:{
      fontSize:51,
      left:"15%",
      position:"absolute",
      top:"55%",
      color:"rgba(0,0,0,0.1)",
      transform:'rotate(-45deg)',
    },
    header: {
      width:"100%",
      height: 145,
      display:"flex",
      flexDirection:"column",
    },
    mainHeading:{
      height:80,
      width:"100%",
      // fontSize: 12,
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-around",
    },
    image:{
      width:120,
      height:80,
      alignContent:"center",
      justifyContent:"center",
      alignItems:"center",
      mixBlendMode:"color-burn",
    },
    title:{
      marginLeft:-50,
      marginTop:15,
      alignItems:"center",
      textAlign:"center",
      display:"flex",
      flexDirection:"column",
      justifyContent:'space-between',
      width:"100%",
      height:50,
    },
    textBold:{
      fontSize:14,
    },
    textSmall:{
      fontSize:12,
    },
    textExtraSmall:{
      fontSize:10,
    },
    mainData:{
      fontSize:10,
      height:45,
      width:"100%",
      textAlign:"left",
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-between",
      marginLeft:15,
      marginBottom:15,
    },
    table: {
      border: 1,
    },
    headerRow: {
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
      borderTop: 1,
      borderBottom: 1,
      fontWeight: "ultrabold",
      justifyContent: "center",
      fontSize: 8,
      alignItems: "center",
      height: 13,
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
    footer:{
      marginTop:50,
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
      width:"90%",
      height:40,
    },
    verified:{
      width:75,
      display:"flex",
      justifyContent:"flex-start",
      alignItems:"center",
      height:40,
      fontSize:14,
    },
    seal:{
      display:"flex",
      alignItems:"center",
      height:40,
      fontSize:14,
      textAlign:"center",
    },
    boldText:{
      fontFamily: "Times-Bold",
    },
  });

  let cumulativeTGRP = 0;
  let cumulativeCR = 0;
  let CGPA = 0;
  let sCount = 0;
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = today.getFullYear();
  const todayDate = `${day}-${month}-${year}`;
  return (
    <>
      <Text style={styles.watermark}>Temporary Certificate</Text>
      <View style={styles.header}>
        <View style={styles.mainHeading}>
          <Image style={styles.image} src={rgukt_logo} />
          <View style={styles.title}>
            <Text style={styles.textBold}>Rajiv Gandhi University Of Knowledge Technologies</Text>
            <Text style={styles.textSmall}>Andhra Pradesh</Text>
            <Text style={styles.textBold}> Temporary PUC Certificate</Text>
          </View>
        </View>
        <View style={styles.mainData}>
          <Text style={styles.textSmall}><Text style={styles.boldText}>Name </Text>: {student.SNAME}</Text>
          <Text style={styles.textSmall}><Text style={styles.boldText}>Roll No </Text>: {student.ID}</Text>
          <Text style={styles.textSmall}><Text style={styles.boldText}>Year </Text>: Pre University Course (PUC)</Text>
        </View>
      </View>
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
      <View>
        <Text style={styles.textSmall}><Text style={styles.boldText}>Date : </Text>{todayDate}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.verified}>
          <Text>Verified By :</Text>
        </View>
        <View style={styles.seal}>
          <Text>Controller of Examinations{"\n"}<Text style={styles.textExtraSmall}>R.K. Valley, A.P - 516 330</Text></Text>
        </View>
      </View>
    </>
  );
}
