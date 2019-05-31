import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Switch,
  TextInput,
  Picker,
  Slider,
  WebView,
  ART
} from "react-native";
import SvgUri from "react-native-svg-uri";
import { captureRef, captureScreen } from "react-native-view-shot";
import Btn from "./btn";
import Simpson from '../../assets/images/simpson.svg'

const catsSource = {
  uri: "https://i.imgur.com/5EOyTDQ.jpg"
};




export default class Screen extends Component {
  state = {
    previewSource: catsSource,
    error: null,
    res: null,
    value: {
      format: "png",
      quality: 0.9,
      result: "tmpfile",
      snapshotContentContainer: false
    }
  };

  snapshot = refname => () =>
    (refname
      ? captureRef(this.refs[refname], this.state.value)
      : captureScreen(this.state.value)
    )
      .then(
        res =>
          this.state.value.result !== "tmpfile"
            ? res
            : new Promise((success, failure) =>
                // just a test to ensure res can be used in Image.getSize
                Image.getSize(
                  res,
                  (width, height) => (
                    console.log(res, width, height), success(res)
                  ),
                  failure
                )
              )
      )
      .then(res =>
        this.setState({
          error: null,
          res,
          previewSource: {
            uri:
              this.state.value.result === "base64"
                ? "data:image/" + this.state.value.format + ";base64," + res
                : res
          }
        })
      )
      .catch(
        error => (
          console.warn(error),
          this.setState({ error, res: null, previewSource: null })
        )
      );

  render() {
    const { value, previewSource, error, res } = this.state;
    const {
      format,
      quality,
      width,
      height,
      result,
      snapshotContentContainer
    } = value;
    return (
      <ScrollView
        ref="full"
        style={styles.root}
        contentContainerStyle={styles.container}
      >
        <View ref="header" style={styles.header}>
          <View style={styles.preview}>
              <Image
                fadeDuration={0}
                resizeMode="contain"
                style={styles.previewImage}
                source={previewSource}
              />
          </View>
          <Text numberOfLines={1} style={styles.previewUriText}>
            存取圖片路徑：{res ? res.slice(0, 200) : ""}
          </Text>
        </View>
        <View ref="form" style={styles.form}>
          <View style={styles.btns}>
            <Btn
              label="重置"
              onPress={() => this.setState({ previewSource: catsSource })}
            />
            <Btn label="圖片範圍截圖" onPress={this.snapshot("header")} />
            <Btn label="選項範圍截圖" onPress={this.snapshot("form")} />

            <Btn label="螢幕截圖(除navi)" onPress={this.snapshot("full")} />
            <Btn label="載入SVG圖片" onPress={this.snapshot("svg")} />
            <Btn label="全螢幕截圖" onPress={this.snapshot()} />
          </View>




        </View>


          <View ref="svg" collapsable={false}>
            <SvgUri
              width={400}
              height={400}
              source={Simpson}
            />
          </View>


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f6f6f6"
  },
  container: {
    paddingVertical: 20,
    backgroundColor: "#f6f6f6"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  experimental: {
    padding: 10,
    flexDirection: "column",
    alignItems: "center"
  },
  experimentalTitle: {
    fontSize: 16,
    margin: 10
  },
  experimentalTransform: {
    transform: [{ rotate: '180deg' }],
    backgroundColor: 'powderblue',
  },
  experimentalTransformV2: {
//    transform: [{ rotate: '180deg' }],
    backgroundColor: 'skyblue',
  },
  p1: {
    marginBottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#333"
  },
  code: {
    fontWeight: "bold",
    color: "#000"
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10
  },
  label: {
    minWidth: 80,
    fontStyle: "italic",
    color: "#888"
  },
  switch: {
    marginRight: 50
  },
  input: {
    flex: 1,
    marginHorizontal: 5
  },
  inputText: {
    flex: 1,
    marginHorizontal: 5,
    color: "red",
    textAlign: "center"
  },
  preview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  previewImage: {
    width: 375,
    height: 300
  },
  previewUriText: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
    padding: 10,
    paddingBottom: 0
  },
  previewError: {
    width: 375,
    height: 300,
    paddingTop: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#c00"
  },
  header: {
    backgroundColor: "#f6f6f6",
    borderColor: "#000",
    borderWidth: 1,
    paddingBottom: 20,
    width: 500,
    height: 500,
  },
  form: {
    backgroundColor: "#fff"
  },
  btns: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    margin: 4
  }
});