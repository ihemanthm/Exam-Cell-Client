import React from "react";
import {  Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import BatchLayout from "./BatchLayout";

export default function AllbatchPDFFIle({ details,start,end}: any) {
  const styles = StyleSheet.create({
    page: {
      marginTop:60,
      paddingBottom: 30,
      paddingLeft: 50,
      paddingRight: 50,
      backgroundColor: "transparent",
    },
  });
  return (
    <>
        {details &&
          Array(100)
            .fill(0)
            .map((_, index: number) => {
              if (details[start+index-1]) {
                console.log(start+index-1);
                return (
                  <Page style={styles.page}>
                    <BatchLayout student={details[start+index-1]} />
                  </Page>
                );
              }
              return null;
            })}
    </>
  );
}
