import React, { Component } from 'react'
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
import NaviBar from '../../components/navi-bar'
import ToolBar from '../../components/tool-bar'
import { captureRef, captureScreen } from "react-native-view-shot";
import { inject, observer } from 'mobx-react'
import Btn from "./Btn";

const catsSource = {
  uri: "https://i.imgur.com/5EOyTDQ.jpg"
 };

@inject('rootStore')
@observer
export default class Screen extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.appStore
    this.state = {
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
} 
 



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
   alert(previewSource.uri);
    return (
      <View style={{flex: 1,backgroundColor:'#f3f3f3'}}>
        <NaviBar title={'編輯故事'}/>
          
          <View style={styles.screen}>

          <ScrollView
       ref="full"
       style={styles.root}
       contentContainerStyle={styles.container}
     >
       <View ref="header" style={styles.header}>

         <View style={styles.preview}>
           {error ? (
             <Text style={styles.previewError}>
               {"" + (error.message || error)}
             </Text>
           ) : (
             <Image
               fadeDuration={0}
               resizeMode="contain"
               style={styles.previewImage}
               source={previewSource}
             />
           )}
         </View>

         <Text numberOfLines={1} style={styles.previewUriText}>
           {res ? res.slice(0, 200) : ""}
         </Text>
         
       </View>
     </ScrollView>


              {/* {this.store.copy} */}

          </View>
          <ToolBar />
          <View ref="form" style={styles.form}>
         <View style={styles.btns}>
           <Btn label="📷 Head Section" onPress={this.snapshot("header")} />          
         </View>
       </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#b5b5b5',
    position: 'absolute',
    width: '85%',
    height: '85%',
    bottom: 30,
    right: 30,
  },
  root: {
    flex: 1,
    backgroundColor: "#f6f6f6"
  },
  container: {
    paddingVertical: 20,
    backgroundColor: "#f6f6f6"
  },
  preview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  previewImage: {
    width: 500,
    height: 500
  },
  previewUriText: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
    padding: 10,
    paddingBottom: 0,
    opacity: 0,
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