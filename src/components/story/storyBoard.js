import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native'
import { inject, observer } from 'mobx-react'
import StoryItem from './storyItem'
import CameraRoll from '@react-native-community/cameraroll'
import { ConfirmDialog } from 'react-native-simple-dialogs'

import Teaching_BG from '../../assets/images/EditStory/Teaching.png'
import ViewShot from 'react-native-view-shot'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const BOARD_WIDTH = screenWidth * 0.76
const BOARD_HEIGHT = screenHeight * 0.7
const BOARD_RIGHT = screenWidth / 2 - BOARD_WIDTH / 2
const BOARD_TOP = screenHeight / 2 - BOARD_HEIGHT / 2 - screenHeight * 0.04
const BOARD_POS_BASIC = 25
const TOOL_PANE_WIDTH = 135

@inject('rootStore')
@observer
export default class StoryBoard extends Component {
  state = {
    snapshotPhoto: {},
    dialogVisible: false
  }
  constructor(props) {
    super(props)
    this.storyStore = props.rootStore.storyStore
    this.toolStore = props.rootStore.toolStore
  }

  snapshot() {
    this.refs['viewShotStory'].capture().then(uri => {
      this.setState({snapshotPhoto: {
        uri: uri,
        width: BOARD_WIDTH,
        height: BOARD_HEIGHT
      }, dialogVisible: true})
      // console.log("Save " + uri)
    })
  }

  render() {
    return (
      <View>
        <View
          style={[styles.storyBoard, { right: BOARD_RIGHT, top: BOARD_TOP }]}
        >
          <ViewShot
            ref="viewShotStory"
            options={{ format: 'png', result: 'data-uri' }}
          >
            <Image source={Teaching_BG} style={[styles.background]} />

            {this.storyStore.storyScene[
              this.storyStore.selectSceneIndex
            ].story.map((ele, id) => {
              console.log(ele)
              return <StoryItem key={ele.key} select={ele} idofarray={id} />
            })}
          </ViewShot>
        </View>


        <TouchableOpacity
          style={styles.snapshotButton}
          onPress={() => {
            this.snapshot()
          }}
        >
          <Text>Snapshot</Text>
        </TouchableOpacity>

        <ConfirmDialog
          title="來拍一張照片"
          visible={this.state.dialogVisible}
          onTouchOutside={() => this.setState({dialogVisible: false})}
          dialogStyle={{width: BOARD_WIDTH * 0.9, alignSelf: 'center'}}
          negativeButton={{
            title: "取消",
            onPress: () => {
              this.setState({dialogVisible: false})
            }
          }}
          positiveButton={{
              title: "儲存",
              onPress: () => {
                CameraRoll.saveToCameraRoll(this.state.snapshotPhoto.uri, 'photo')                
              }
          }} >
          <View>
            <Image source={this.state.snapshotPhoto} style={styles.snapshotImage}></Image>
          </View>
        </ConfirmDialog>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  storyBoard: {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    position: 'absolute',
    backgroundColor: '#f6f6f6',
    borderColor: '#bebebe',
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 10,
  },

  background: {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    overflow: 'hidden',
  },

  snapshotImage: {
    width: BOARD_WIDTH * 0.8,
    height: BOARD_HEIGHT * 0.8,
    alignSelf: 'center'
  }, 

  snapshotButton: {
    position: 'absolute',
    top: 40,
    right: 1000,
  },
})
