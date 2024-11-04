import RobotoRegular from "../fonts/RobotoCondensed-Regular.ttf";
import RobotoBold from "../fonts/RobotoCondensed-Bold.ttf";
import {
    Font,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";
import { format } from "date-fns";


interface GradeSheetProps {
    details: any;
    index: any;
}
const Grade_Sheet = ({ details, index }: GradeSheetProps) => {

    Font.register({
        family: "RobotoBold",
        src: RobotoBold,
      });
      Font.register({
        family: "RobotoRegular",
        src: RobotoRegular,
      });

    const styles = StyleSheet.create({
        details: {
            display: "flex",
            flexDirection: "column",
            marginTop: 87,
            width: "100%",
            fontFamily:"RobotoRegular",
        },
        detailsRow: {
            display: "flex",
            flexDirection: "row",
            height: 20,
            width: "100%",
            justifyContent: "space-between",
        },
        name: {
            fontSize: 12,
            marginLeft: 45,
        },
        dob: {
            fontSize: 12,
            marginTop:-1,
            marginRight: 45,
            alignContent: "center",
        },
        year: {
            fontSize: 12,
            marginLeft: 110,
        },
        rollNo: {
            fontSize: 12,
            marginRight: 35,
        },
        branch: {
            fontSize: 12,
            marginLeft: 160,
        },
        examYear: {
            fontSize: 12,
            marginLeft: 190,
        },
        tableData: {
            width: "100%",
            height: 460,
            marginTop: 53,
            flexDirection: "column",
            justifyContent: "flex-start",
            fontFamily:"RobotoRegular",
        },
        data:{
            width:"100%",
            height:330,
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
            width: "18%",
            height: 20,
            textAlign: "center",
            alignItems: "center",
        },
        subName: {
            width: "62%",
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
            height: 30,
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
            marginTop:-45,
            marginLeft: 30,
            fontFamily:"RobotoRegular",
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
                {details.RECORDS[index].SUBJECTS.map((sub: any) => {
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
                    <View style={styles.totalsgpa}><Text>{maxSgpaCredits.toFixed(1)}</Text></View>
                </View>
                <View style={styles.totalRow}>
                    <View style={styles.empty}></View>
                    <View style={styles.totalsgpa}><Text>{details.RECORDS[index].SGPA.toFixed(2)}</Text></View>
                </View>
                <View style={styles.totalRow}>
                    <View style={styles.empty}></View>
                    <View style={styles.totalsgpa}><Text>{details.RECORDS[index].CGPA.toFixed(2)}</Text></View>
                </View>
            </View>
            <View style={styles.conclusionText}>
                <Text>{todayDate}</Text>
            </View>
        </>
    );
}

export default Grade_Sheet;