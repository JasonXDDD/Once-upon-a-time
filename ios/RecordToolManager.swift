//
//  RecordToolManager.swift
//  ReactNativeAppDemo
//
//  Created by JasonXD on 2019/5/25.
//  Copyright © 2019 Facebook. All rights reserved.
//

@objc(RecordToolManager)
class RecordToolManager: RCTViewManager {
  
  override func view() -> UIView! {
    return RecordTool()
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc func startRecordFromManager(_ node: NSNumber) {
    
    DispatchQueue.main.async {
      let component = self.bridge.uiManager.view( forReactTag: node ) as! RecordTool
      component.startRecording()
    }
  }
  
  @objc func stopRecordFromManager(_ node: NSNumber) {
    
    DispatchQueue.main.async {
      let component = self.bridge.uiManager.view( forReactTag: node ) as! RecordTool
      component.stopRecording()
    }
  }
  
}
