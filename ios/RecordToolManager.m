//
//  RecordToolManager.m
//  ReactNativeAppDemo
//
//  Created by JasonXD on 2019/5/25.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RecordToolManager, RCTViewManager)

  RCT_EXTERN_METHOD(startRecordFromManager:(nonnull NSNumber *)node)
  RCT_EXTERN_METHOD(stopRecordFromManager:(nonnull NSNumber *)node)

@end


