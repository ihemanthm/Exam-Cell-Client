import React from "react";
import {
    PDFViewer,
    PDFDownloadLink,
    Document,
    Page,
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

interface GradeSheetProps {
    details: any;
    index: any;
}
const Grade_Sheet = ({ details, index }: GradeSheetProps) => {

    const styles = StyleSheet.create({
        details: {
            display: "flex",
            flexDirection: "column",
            marginTop: 60,
            width: "100%",
        },
        detailsRow: {
            display: "flex",
            flexDirection: "row",
            height: 30,
            width: "100%",
            justifyContent: "space-between",
        },
        name: {
            fontSize: 12,
            marginLeft: 30,
        },
        dob: {
            fontSize: 12,
            marginRight: 30,
            alignContent: "center",
        },
        year: {
            fontSize: 12,
            marginLeft: 60,
        },
        rollNo: {
            fontSize: 12,
            marginRight: 15,
        },
        branch: {
            fontSize: 12,
            marginLeft: 75,
        },
        examYear: {
            fontSize: 12,
            marginLeft: 90,
        },
        tableData: {
            width: "100%",
            height: 460,
            marginTop: 40,
            flexDirection: "column",
            justifyContent: "flex-start",
        },
        data:{
            width:"100%",
            height:400,
            flexDirection: "column",
            justifyContent: "flex-start",
        },
        eachRow: {
            width: "100%",
            height: 20,
            fontSize: 12,
            flexDirection: "row",
        },
        subCode: {
            width: "15%",
            height: 20,
            textAlign: "center",
            alignItems: "center",
        },
        subName: {
            width: "65%",
            height: 20,
            textAlign: "left",
            alignItems: "flex-start",
        },
        credits: {
            width: "10%",
            height: 20,
            textAlign: "center",
            alignItems: "center",
        },
        totalRow: {
            flexDirection: "row",
            width: "100%",
            height: 20,
            fontSize: 12,
        },
        empty: {
            width: "70%",
            height: 20,
        },
        totalCred: {
            width: "20%",
            height: 20,
            alignItems: "center",
            justifyContent: "center",
        },
        totalsgpa: {
            width: "30%",
            height: 20,
            alignItems: "center",
            justifyContent: "center",
        },
        conclusionText: {
            fontSize: 12,
            marginTop: 5,
            marginLeft: 50,
        },
    });
    function formatDate() {
        const date = new Date();
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

        return `${day} ${monthName} ${year}`;
    }

    const recentEXAMMY = details.RECORDS[index].SUBJECTS.reduce(
        (latest: Date | null, sub: any) => {
                const subjectDate = new Date(sub.EXAMMY);
                if (!latest || subjectDate > latest) {
                    latest = subjectDate;
                }
            return latest;
        },
        null
    );
    const formattedEXAMMY = recentEXAMMY ? format(recentEXAMMY, "MMM-yyyy") : "N/A";
    const dob = new Date(details.DOB);
    const formattedDate = `${String(dob.getDate()).padStart(2, '0')}-${format(dob, "MMM-yyyy")}`;
    const todayDate = formatDate();

    var maxSgpaCredits: number = 0;
    var romans = ['I', 'II', 'III', 'IV']
    var semno=details.RECORDS[index].SEM;
    var romanSemester: string = romans[(semno + 1) % 2];
    var romanYear: string = romans[Math.ceil(semno / 2)-1];
    return (
        <>
            <View style={styles.details}>
                <View style={styles.detailsRow}>
                    <View style={styles.name}>
                        <Text>{details.SNAME}</Text>
                    </View>
                    <View style={styles.dob}>
                        <Text>{formattedDate}</Text>
                    </View>

                </View>
                <View style={styles.detailsRow}>
                    <View style={styles.year}>
                        <Text>{romanYear} YEAR {romanSemester} SEMESTER</Text>
                    </View>
                    <View style={styles.rollNo}>
                        <Text>{details.ID}</Text>
                    </View>
                </View>
                <View style={styles.detailsRow}>
                    <View style={styles.branch}>
                        <Text>B.Tech - {details.GRP}</Text>
                    </View>
                </View>
                <View style={styles.detailsRow}>
                    <View style={styles.examYear}>
                        <Text>{formattedEXAMMY}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.tableData}>
                <View style={styles.data}>
                {details.RECORDS[index].SUBJECTS.map((sub: any, i: number) => {
                    maxSgpaCredits += sub.CR;
                    return (
                        <View style={styles.eachRow}>
                            <View style={styles.subCode}>
                                <Text>{sub.PCODE}</Text>
                            </View>
                            <View style={styles.subName}>
                                <Text>{sub.PNAME}</Text>
                            </View>
                            <View style={styles.credits}>
                                <Text>{sub.CR}</Text>
                            </View>
                            <View style={styles.credits}>
                                <Text>{sub.GR}</Text>
                            </View>
                        </View>
                    )
                })};
                </View>
                <View style={styles.totalRow}>
                    <View style={styles.empty}></View>
                    <View style={styles.totalCred}><Text>{maxSgpaCredits.toFixed(1)}</Text></View>
                    <View style={styles.credits}></View>
                </View>
                <View style={styles.totalRow}>
                    <View style={styles.empty}></View>
                    <View style={styles.totalsgpa}><Text>{details.RECORDS[index].SGPA}</Text></View>
                </View>
                <View style={styles.totalRow}>
                    <View style={styles.empty}></View>
                    <View style={styles.totalsgpa}><Text>{details.RECORDS[index].CGPA}</Text></View>
                </View>
            </View>
            <View style={styles.conclusionText}>
                <Text>{todayDate}</Text>
            </View>
        </>
    );
}

export default Grade_Sheet;