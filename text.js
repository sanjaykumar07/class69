import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Touchable,
} from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class Transaction extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      scannedData: "",
      buttonStatus: "normal",
    };
  }
  onBarCodeScanned = async ({ type, data }) => {
    this.setState({
      buttonStatus: "normal",
      scanned: true,
      scannedData: data,
    });
  };
  getCemeraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: true,
      scanned: false,
      buttonStatus: "clicked",
    });
  };
  render() {
    const hasCameraPermission = this.state.hasCameraPermission;
    const scanned = this.state.scanned;
    const buttonStatus = this.state.buttonStatus;

    if (hasCameraPermission == true && buttonStatus == "clicked") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.barCodeScanner}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonStatus == "normal") {
      return (
        <View style={styles.container}>
          <Text>
            {hasCameraPermission == true
              ? this.state.scannedData
              : "No Permissions"}
          </Text>
          <TouchableOpacity onPress={this.getCemeraPermission}>
            <Text>Scan</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
