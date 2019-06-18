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
  let recorder = RPScreenRecorder.shared()
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    if #available(iOS 10.0, *) {
      self.addSubview(start)
    }
    self.addSubview(stop)
  }
  
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  
  lazy var start: UIButton = {
    let b = UIButton.init(type: UIButton.ButtonType.system)
    b.setTitle("Start", for: .normal)
    b.titleLabel?.font = UIFont.systemFont(ofSize: 20)
    b.frame = CGRect(x: 0, y: 0, width: 80, height: 30)
    b.addTarget(
      self,
      action: #selector(startRecording),
      for: .touchUpInside
    )
    return b
  }()
  
  
  lazy var stop: UIButton = {
    let b = UIButton.init(type: UIButton.ButtonType.system)
    b.setTitle("Stop", for: .normal)
    b.titleLabel?.font = UIFont.systemFont(ofSize: 20)
    b.frame = CGRect(x: 80, y: 0, width: 80, height: 30)
    b.addTarget(
      self,
      action:  #selector(stopRecording),
      for: .touchUpInside
    )
    return b
  }()
  
  
  @objc func startRecording() {
    
    guard recorder.isAvailable else {
      print("Recording is not available at this time.")
      return
    }
    
    recorder.isMicrophoneEnabled = true
    if #available(iOS 10.0, *) {
      recorder.startRecording{ [unowned self] (error) in
        guard error == nil else {
          print("There was an error starting the recording.", error)
          return
        }
        print("Started Recording Successfully")
      }
    } else {
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
      
      DispatchQueue.main.async{
        let alert = UIAlertController(title: "Recording Finished", message: "Would you like to edit or delete your recording?", preferredStyle: .alert)
        
        let deleteAction = UIAlertAction(title: "Delete", style: .destructive, handler: { (action: UIAlertAction) in
          self.recorder.discardRecording(handler: { () -> Void in
            print("Recording suffessfully deleted.")
          })
        })
        
        let editAction = UIAlertAction(title: "Edit", style: .default, handler: { (action: UIAlertAction) -> Void in
          
          if UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiom.pad {
            preview?.modalPresentationStyle = UIModalPresentationStyle.popover
            preview?.popoverPresentationController?.sourceRect = CGRect.zero
            preview?.popoverPresentationController?.sourceView = self
          }
          
          //          preview?.previewControllerDelegate = self
          self.findViewController()!.present(preview!, animated: true, completion: nil)
          
        })
        
        alert.addAction(editAction)
        alert.addAction(deleteAction)
        self.findViewController()!.present(alert, animated: true, completion: nil)
      }
    }
  }
  
}

