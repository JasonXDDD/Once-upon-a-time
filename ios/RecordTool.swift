//
//  RecordTool.swift
//  ReactNativeAppDemo
//
//  Created by JasonXD on 2019/5/25.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit
import ReplayKit

extension UIView {
  func findViewController() -> UIViewController? {
    if let nextResponder = self.next as? UIViewController {
      return nextResponder
    } else if let nextResponder = self.next as? UIView {
      return nextResponder.findViewController()
    } else {
      return nil
    }
  }
}

class RecordTool: UIView, RPPreviewViewControllerDelegate {
  
  
  override init(frame: CGRect) {
    super.init(frame: frame)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  private var isRecording = false
  let recorder = RPScreenRecorder.shared()
  
  
  @objc func startRecording() {
    guard recorder.isAvailable else {
      print("Recording is not available at this time.")
      return
    }
    
    if #available(iOS 10.0, *) {
      recorder.isMicrophoneEnabled = true
      recorder.startRecording{ [unowned self] (error) in
        guard error == nil else {
          print("There was an error starting the recording.")
          print(error)
          return
        }
        print("Started Recording Successfully")
        print(self.recorder.isMicrophoneEnabled)
        self.isRecording = true
      }
    }
    
    else {
      // Fallback on earlier versions
    }
  }
  
  
  @objc func stopRecording() {
    recorder.stopRecording { [unowned self] (preview, error) in
      print("Stopped recording")
      
      guard preview != nil else {
        print("Preview controller is not available.")
        return
      }
      
      DispatchQueue.main.async {
        let alert = UIAlertController(title: "錄影成功", message: "你想要儲存還是刪除呢?", preferredStyle: .alert)
        
        let deleteAction = UIAlertAction(title: "刪除", style: .destructive, handler: { (action: UIAlertAction) in
          self.recorder.discardRecording(handler: { () -> Void in
            print("Recording suffessfully deleted.")
          })
        })
        
        let editAction = UIAlertAction(title: "儲存", style: .default, handler: { (action: UIAlertAction) -> Void in
          
          if UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiom.pad {
            preview?.modalPresentationStyle = UIModalPresentationStyle.popover
            preview?.popoverPresentationController?.sourceRect = CGRect.zero
            preview?.popoverPresentationController?.sourceView = self
          }
          
          preview?.previewControllerDelegate = self
          
          self.findViewController()!.present(preview!, animated: true, completion: nil)
          self.isRecording = false
          
        })
        
        alert.addAction(editAction)
        alert.addAction(deleteAction)
        self.findViewController()!.present(alert, animated: true, completion: nil)
        
      }
    }
    
  }
  
  @objc func previewControllerDidFinish(_ previewController: RPPreviewViewController) {
    self.findViewController()!.dismiss(animated: true)
  }
}

